import React, { useRef, useState, useEffect, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import * as fabric from "fabric";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// Suppress harmless TrueType font hinting warnings (TT: undefined function)
pdfjsLib.GlobalWorkerOptions.verbosity = pdfjsLib.VerbosityLevel?.ERRORS ?? 0;

const FONTS = [
  "Arial", "Helvetica", "Times New Roman", "Courier New", "Georgia",
  "Verdana", "Trebuchet MS", "Palatino Linotype",
];
const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48];
const COLORS = [
  "#000000", "#333333", "#666666", "#999999",
  "#FF0000", "#FF4444", "#CC0000",
  "#0000FF", "#2196F3", "#1565C0",
  "#008000", "#4CAF50", "#1B5E20",
  "#FF8C00", "#FFC107", "#FF5722",
  "#800080", "#9C27B0", "#E91E63",
  "#FFFFFF",
];

const TOOLS = {
  SELECT: "select",
  TEXT: "text",
  DRAW: "draw",
  HIGHLIGHT: "highlight",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  LINE: "line",
  ERASER: "eraser",
};

const PdfEditor = ({
  pdfUrl,
  annotations: initialAnnotations,
  onSave,
  onSubmit,
  readOnly = false,
  autoSaveInterval = 15000,
  status,
  adminNote,
  showSubmitButton = true,
}) => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const fabricCanvasesRef = useRef([]);
  const pdfDocRef = useRef(null);
  const hasChangesRef = useRef(false);
  // Store current annotations so zoom changes don't lose work
  const currentAnnotationsRef = useRef(null);

  // Use refs for tool state so mouse:down handlers always read fresh values
  const activeToolRef = useRef(TOOLS.SELECT);
  const fontFamilyRef = useRef("Arial");
  const fontSizeRef = useRef(16);
  const fontColorRef = useRef("#000000");
  const strokeWidthRef = useRef(2);
  const isBoldRef = useRef(false);
  const isItalicRef = useRef(false);
  const isUnderlineRef = useRef(false);

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTool, _setActiveTool] = useState(TOOLS.SELECT);
  const [fontFamily, _setFontFamily] = useState("Arial");
  const [fontSize, _setFontSize] = useState(16);
  const [fontColor, _setFontColor] = useState("#000000");
  const [strokeWidth, _setStrokeWidth] = useState(2);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [submitting, setSubmitting] = useState(false);
  const [isBold, _setIsBold] = useState(false);
  const [isItalic, _setIsItalic] = useState(false);
  const [isUnderline, _setIsUnderline] = useState(false);
  const [pdfRendered, setPdfRendered] = useState(false);

  // Sync state + refs together
  const setActiveTool = (v) => { activeToolRef.current = v; _setActiveTool(v); };
  const setFontFamily = (v) => { fontFamilyRef.current = v; _setFontFamily(v); };
  const setFontSize = (v) => { fontSizeRef.current = v; _setFontSize(v); };
  const setFontColor = (v) => { fontColorRef.current = v; _setFontColor(v); };
  const setStrokeWidth = (v) => { strokeWidthRef.current = v; _setStrokeWidth(v); };
  const setIsBold = (v) => { isBoldRef.current = v; _setIsBold(v); };
  const setIsItalic = (v) => { isItalicRef.current = v; _setIsItalic(v); };
  const setIsUnderline = (v) => { isUnderlineRef.current = v; _setIsUnderline(v); };

  // ─── Collect annotations from all canvases ───────────────────────────
  const getAnnotationsJson = useCallback(() => {
    const annotations = {};
    fabricCanvasesRef.current.forEach((canvas, idx) => {
      const json = canvas.toJSON();
      if (json.objects && json.objects.length > 0) {
        annotations[idx] = json;
      }
    });
    return JSON.stringify(annotations);
  }, []);

  // ─── Snapshot annotations before zoom destroys canvases ──────────────
  const snapshotAnnotations = useCallback(() => {
    if (fabricCanvasesRef.current.length === 0) return;
    const snap = {};
    fabricCanvasesRef.current.forEach((canvas, idx) => {
      const json = canvas.toJSON();
      if (json.objects && json.objects.length > 0) {
        snap[idx] = json;
      }
    });
    if (Object.keys(snap).length > 0) {
      currentAnnotationsRef.current = snap;
    }
  }, []);

  // ─── Load PDF document ───────────────────────────────────────────────
  useEffect(() => {
    if (!pdfUrl) return;
    setLoading(true);
    setError("");
    setPdfRendered(false);
    currentAnnotationsRef.current = null;

    pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    }).promise.then((pdf) => {
      pdfDocRef.current = pdf;
      setNumPages(pdf.numPages);
      setLoading(false);
    }).catch((err) => {
      console.error("Error loading PDF:", err);
      setError("Failed to load PDF. Please try again.");
      setLoading(false);
    });
  }, [pdfUrl]);

  // ─── Render PDF pages + create fabric overlays ───────────────────────
  useEffect(() => {
    if (!pdfDocRef.current || numPages === 0 || !canvasContainerRef.current) return undefined;

    // Cancellation flag — prevents a stale async render (e.g. React StrictMode
    // double-mount) from writing into a container that has already been cleared.
    let cancelled = false;

    // Save current work before re-rendering (e.g. on zoom change)
    snapshotAnnotations();

    // Dispose previous canvases
    fabricCanvasesRef.current.forEach((c) => {
      try { c.dispose(); } catch (ex) { /* ok */ }
    });
    fabricCanvasesRef.current = [];

    const container = canvasContainerRef.current;
    container.innerHTML = "";

    const renderAll = async () => {
      const scale = 1.5 * zoom;
      const newCanvases = [];

      for (let i = 1; i <= numPages; i++) {
        if (cancelled) return;

        const page = await pdfDocRef.current.getPage(i);
        if (cancelled) return;

        const viewport = page.getViewport({ scale });

        // Page wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "pdf-page-wrapper";
        wrapper.style.cssText = `position:relative;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.15);border-radius:4px;overflow:hidden;background:white;width:${viewport.width}px;height:${viewport.height}px;`;

        // PDF background canvas
        const pdfCanvas = document.createElement("canvas");
        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height;
        pdfCanvas.style.cssText = `display:block;width:${viewport.width}px;height:${viewport.height}px;`;
        await page.render({ canvasContext: pdfCanvas.getContext("2d"), viewport }).promise;

        if (cancelled) return;

        // Fabric overlay canvas
        const fabricEl = document.createElement("canvas");
        fabricEl.id = `fabric-page-${i}`;

        const overlayDiv = document.createElement("div");
        overlayDiv.style.cssText = `position:absolute;top:0;left:0;width:${viewport.width}px;height:${viewport.height}px;`;
        overlayDiv.appendChild(fabricEl);

        wrapper.appendChild(pdfCanvas);
        wrapper.appendChild(overlayDiv);
        container.appendChild(wrapper);

        // Create fabric canvas
        const fc = new fabric.Canvas(fabricEl, {
          width: viewport.width,
          height: viewport.height,
          selection: !readOnly,
          isDrawingMode: false,
          preserveObjectStacking: true,
        });

        fc.on("object:modified", () => { hasChangesRef.current = true; });
        fc.on("object:added", () => { hasChangesRef.current = true; });
        fc.on("object:removed", () => { hasChangesRef.current = true; });

        // ─── Mouse:down handler — uses refs so it always reads fresh state ─
        fc.on("mouse:down", (opt) => {
          if (readOnly) return;
          const tool = activeToolRef.current;

          // ERASER: remove whatever was clicked
          if (tool === TOOLS.ERASER && opt.target) {
            fc.remove(opt.target);
            fc.renderAll();
            return;
          }

          // If an existing object was clicked, let fabric handle it naturally
          // (select it, or double-click to edit text)
          if (opt.target) return;

          // Get click position — fabric v7 provides scenePoint on the event
          const pointer = opt.scenePoint || fc.getPointer(opt.e);

          if (tool === TOOLS.TEXT) {
            const textObj = new fabric.IText("Type here", {
              left: pointer.x,
              top: pointer.y,
              originX: "left",
              originY: "top",
              fontFamily: fontFamilyRef.current,
              fontSize: fontSizeRef.current,
              fill: fontColorRef.current,
              fontWeight: isBoldRef.current ? "bold" : "normal",
              fontStyle: isItalicRef.current ? "italic" : "normal",
              underline: isUnderlineRef.current,
              editable: true,
              padding: 5,
              borderColor: "#5225cd",
              cornerColor: "#5225cd",
              cornerSize: 8,
              transparentCorners: false,
            });
            fc.add(textObj);
            fc.setActiveObject(textObj);
            fc.renderAll();
            // Enter editing after fabric finishes its mousedown processing
            setTimeout(() => {
              textObj.enterEditing();
              textObj.selectAll();
              fc.renderAll();
            }, 100);
          }

          if (tool === TOOLS.RECTANGLE) {
            const rect = new fabric.Rect({
              left: pointer.x, top: pointer.y,
              width: 150, height: 80,
              fill: "transparent",
              stroke: fontColorRef.current,
              strokeWidth: strokeWidthRef.current,
              borderColor: "#5225cd", cornerColor: "#5225cd", cornerSize: 8,
              transparentCorners: false,
            });
            fc.add(rect);
            fc.setActiveObject(rect);
            fc.renderAll();
          }

          if (tool === TOOLS.CIRCLE) {
            const circle = new fabric.Circle({
              left: pointer.x, top: pointer.y,
              radius: 50, fill: "transparent",
              stroke: fontColorRef.current,
              strokeWidth: strokeWidthRef.current,
              borderColor: "#5225cd", cornerColor: "#5225cd", cornerSize: 8,
              transparentCorners: false,
            });
            fc.add(circle);
            fc.setActiveObject(circle);
            fc.renderAll();
          }

          if (tool === TOOLS.LINE) {
            const line = new fabric.Line(
              [pointer.x, pointer.y, pointer.x + 150, pointer.y],
              {
                stroke: fontColorRef.current,
                strokeWidth: strokeWidthRef.current,
                borderColor: "#5225cd", cornerColor: "#5225cd", cornerSize: 8,
                transparentCorners: false,
              }
            );
            fc.add(line);
            fc.setActiveObject(line);
            fc.renderAll();
          }
        });

        newCanvases.push(fc);
      }

      if (cancelled) {
        newCanvases.forEach((c) => { try { c.dispose(); } catch (ex) { /* ok */ } });
        return;
      }

      // Commit canvases to ref only if still active
      fabricCanvasesRef.current = newCanvases;

      // Restore annotations — prefer in-memory snapshot (zoom change),
      // fall back to initial prop (first load)
      const annotationsToLoad = currentAnnotationsRef.current || (() => {
        if (!initialAnnotations) return null;
        try {
          return typeof initialAnnotations === "string"
            ? JSON.parse(initialAnnotations)
            : initialAnnotations;
        } catch { return null; }
      })();

      if (annotationsToLoad && typeof annotationsToLoad === "object") {
        const loadPromises = Object.keys(annotationsToLoad).map(async (pageIdx) => {
          const canvas = fabricCanvasesRef.current[parseInt(pageIdx, 10)];
          if (canvas && annotationsToLoad[pageIdx]) {
            try {
              await canvas.loadFromJSON(annotationsToLoad[pageIdx]);
              canvas.renderAll();
            } catch (e) {
              console.error(`Error loading annotations for page ${pageIdx}:`, e);
            }
          }
        });
        await Promise.all(loadPromises);
      }

      if (!cancelled) {
        setPdfRendered(true);
      }
    };

    renderAll();

    return () => {
      cancelled = true;
      fabricCanvasesRef.current.forEach((c) => {
        try { c.dispose(); } catch (ex) { /* ok */ }
      });
      fabricCanvasesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages, zoom, readOnly]);

  // ─── Apply tool mode to all canvases ────────────────────────────────
  useEffect(() => {
    fabricCanvasesRef.current.forEach((canvas) => {
      if (readOnly) {
        canvas.isDrawingMode = false;
        canvas.selection = false;
        canvas.forEachObject((obj) => { obj.selectable = false; obj.evented = false; });
        return;
      }

      // Reset cursors and modes
      canvas.isDrawingMode = false;
      canvas.defaultCursor = "default";
      canvas.hoverCursor = "move";

      switch (activeTool) {
        case TOOLS.DRAW:
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.color = fontColor;
          canvas.freeDrawingBrush.width = strokeWidth;
          canvas.selection = false;
          break;
        case TOOLS.HIGHLIGHT:
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.color = "#FFFF0066";
          canvas.freeDrawingBrush.width = 20;
          canvas.selection = false;
          break;
        case TOOLS.ERASER:
          canvas.isDrawingMode = false;
          canvas.selection = false;
          canvas.defaultCursor = "crosshair";
          canvas.hoverCursor = "crosshair";
          break;
        case TOOLS.SELECT:
          canvas.isDrawingMode = false;
          canvas.selection = true;
          canvas.forEachObject((obj) => { obj.selectable = true; obj.evented = true; });
          break;
        case TOOLS.TEXT:
          // Keep objects selectable so users can click existing text to edit it
          canvas.isDrawingMode = false;
          canvas.selection = true;
          canvas.defaultCursor = "text";
          canvas.hoverCursor = "pointer";
          canvas.forEachObject((obj) => { obj.selectable = true; obj.evented = true; });
          break;
        default:
          // Shape tools
          canvas.isDrawingMode = false;
          canvas.selection = false;
          canvas.defaultCursor = "crosshair";
          canvas.hoverCursor = "crosshair";
          break;
      }
    });
  }, [activeTool, fontColor, strokeWidth, readOnly, pdfRendered]);

  // ─── Save handler ────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!onSave || saving) return;
    setSaving(true);
    try {
      await onSave(getAnnotationsJson());
      hasChangesRef.current = false;
      setLastSaved(new Date());
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }, [onSave, saving, getAnnotationsJson]);

  // ─── Auto-save timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (readOnly || !onSave) return undefined;
    const timer = setInterval(() => {
      if (hasChangesRef.current) {
        const json = getAnnotationsJson();
        onSave(json).then(() => {
          hasChangesRef.current = false;
          setLastSaved(new Date());
        }).catch(() => {});
      }
    }, autoSaveInterval);
    return () => clearInterval(timer);
  }, [readOnly, onSave, autoSaveInterval, getAnnotationsJson]);

  // ─── Submit handler ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!onSubmit || submitting) return;
    setSubmitting(true);
    try {
      await onSave?.(getAnnotationsJson());
      hasChangesRef.current = false;
      await onSubmit();
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Delete selected object ──────────────────────────────────────────
  const handleDeleteSelected = () => {
    fabricCanvasesRef.current.forEach((canvas) => {
      const active = canvas.getActiveObject();
      if (active) {
        canvas.remove(active);
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    });
  };

  // ─── Update property on selected text object ─────────────────────────
  const updateSelectedText = useCallback((property, value) => {
    fabricCanvasesRef.current.forEach((canvas) => {
      const active = canvas.getActiveObject();
      if (active && (active.type === "i-text" || active.type === "textbox")) {
        active.set(property, value);
        canvas.renderAll();
        hasChangesRef.current = true;
      }
    });
  }, []);

  // ─── Keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (readOnly) return;

      // Check if user is typing inside a fabric text — don't intercept
      const isEditingText = fabricCanvasesRef.current.some((c) => {
        const obj = c.getActiveObject();
        return obj && obj.isEditing;
      });

      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
        return;
      }
      if (e.key === "Delete" && !isEditingText) {
        handleDeleteSelected();
      }
      if (e.key === "Escape") {
        fabricCanvasesRef.current.forEach((canvas) => {
          const active = canvas.getActiveObject();
          if (active && active.isEditing) {
            active.exitEditing();
            canvas.discardActiveObject();
            canvas.renderAll();
          }
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [readOnly, handleSave]);

  // ─── Scroll to page ──────────────────────────────────────────────────
  const scrollToPage = (page) => {
    const container = canvasContainerRef.current;
    if (!container) return;
    const wrappers = container.querySelectorAll(".pdf-page-wrapper");
    if (wrappers[page - 1]) {
      wrappers[page - 1].scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentPage(page);
    }
  };

  // ─── Handle zoom with annotation preservation ───────────────────────
  const handleZoomChange = (direction) => {
    // Snapshot current work before zoom triggers re-render
    snapshotAnnotations();
    setZoom((z) => {
      if (direction === "in") return Math.min(3, z + 0.25);
      if (direction === "out") return Math.max(0.5, z - 0.25);
      return z;
    });
  };

  // ─── RENDER ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading PDF Editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-2xl p-6">
        <div className="text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
      {/* Admin Note Banner */}
      {adminNote && status === "application_info_requested" && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800">Changes Requested</p>
            <p className="text-sm text-amber-700 mt-1">{adminNote}</p>
          </div>
        </div>
      )}

      {/* Toolbar */}
      {!readOnly && (
        <div className="bg-white border-b border-gray-200 px-3 py-2">
          {/* Row 1: Tools */}
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-1">
              <ToolBtn icon="cursor" label="Select" active={activeTool === TOOLS.SELECT} onClick={() => setActiveTool(TOOLS.SELECT)} />
              <ToolBtn icon="text" label="Text" active={activeTool === TOOLS.TEXT} onClick={() => setActiveTool(TOOLS.TEXT)} />
            </div>
            <Sep />
            <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-1">
              <ToolBtn icon="pencil" label="Draw" active={activeTool === TOOLS.DRAW} onClick={() => setActiveTool(TOOLS.DRAW)} />
              <ToolBtn icon="highlight" label="Highlight" active={activeTool === TOOLS.HIGHLIGHT} onClick={() => setActiveTool(TOOLS.HIGHLIGHT)} />
              <ToolBtn icon="eraser" label="Eraser" active={activeTool === TOOLS.ERASER} onClick={() => setActiveTool(TOOLS.ERASER)} />
            </div>
            <Sep />
            <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-1">
              <ToolBtn icon="rect" label="Rectangle" active={activeTool === TOOLS.RECTANGLE} onClick={() => setActiveTool(TOOLS.RECTANGLE)} />
              <ToolBtn icon="circle" label="Circle" active={activeTool === TOOLS.CIRCLE} onClick={() => setActiveTool(TOOLS.CIRCLE)} />
              <ToolBtn icon="line" label="Line" active={activeTool === TOOLS.LINE} onClick={() => setActiveTool(TOOLS.LINE)} />
            </div>
            <Sep />
            <div className="flex items-center gap-0.5 bg-gray-50 rounded-lg p-1">
              <ToolBtn icon="delete" label="Delete" onClick={handleDeleteSelected} />
            </div>
            <div className="flex-1" />
            {/* Zoom */}
            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
              <button className="px-2 py-1 text-xs rounded hover:bg-gray-200 transition disabled:opacity-40" onClick={() => handleZoomChange("out")} disabled={zoom <= 0.5}>-</button>
              <span className="text-xs font-medium text-gray-600 min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
              <button className="px-2 py-1 text-xs rounded hover:bg-gray-200 transition disabled:opacity-40" onClick={() => handleZoomChange("in")} disabled={zoom >= 3}>+</button>
            </div>
          </div>

          {/* Row 2: Font controls */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <select value={fontFamily} onChange={(e) => { setFontFamily(e.target.value); updateSelectedText("fontFamily", e.target.value); }} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-purple-300 outline-none">
              {FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
            </select>
            <select value={fontSize} onChange={(e) => { const s = parseInt(e.target.value, 10); setFontSize(s); updateSelectedText("fontSize", s); }} className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-purple-300 outline-none w-16">
              {FONT_SIZES.map((s) => <option key={s} value={s}>{s}px</option>)}
            </select>
            <Sep />
            <button className={`px-2 py-1 text-xs font-bold rounded transition ${isBold ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} onClick={() => { const v = !isBold; setIsBold(v); updateSelectedText("fontWeight", v ? "bold" : "normal"); }}>B</button>
            <button className={`px-2 py-1 text-xs italic rounded transition ${isItalic ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} onClick={() => { const v = !isItalic; setIsItalic(v); updateSelectedText("fontStyle", v ? "italic" : "normal"); }}>I</button>
            <button className={`px-2 py-1 text-xs underline rounded transition ${isUnderline ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} onClick={() => { const v = !isUnderline; setIsUnderline(v); updateSelectedText("underline", v); }}>U</button>
            <Sep />
            {/* Color */}
            <div className="relative">
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg hover:bg-gray-100 transition border border-gray-200" onClick={() => setShowColorPicker(!showColorPicker)}>
                <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: fontColor }} />
                <span className="text-gray-600">Color</span>
              </button>
              {showColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 w-[200px]">
                  <div className="grid grid-cols-5 gap-1.5">
                    {COLORS.map((c) => (
                      <button key={c} className={`w-7 h-7 rounded-full border-2 transition hover:scale-110 ${fontColor === c ? "border-purple-500 ring-2 ring-purple-200" : "border-gray-200"}`} style={{ backgroundColor: c }} onClick={() => { setFontColor(c); updateSelectedText("fill", c); setShowColorPicker(false); }} />
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <label className="text-xs text-gray-500 block mb-1">Custom</label>
                    <input type="color" value={fontColor} onChange={(e) => { setFontColor(e.target.value); updateSelectedText("fill", e.target.value); }} className="w-full h-7 cursor-pointer rounded" />
                  </div>
                </div>
              )}
            </div>
            {/* Stroke Width */}
            {(activeTool === TOOLS.DRAW || activeTool === TOOLS.RECTANGLE || activeTool === TOOLS.CIRCLE || activeTool === TOOLS.LINE) && (
              <>
                <Sep />
                <label className="text-xs text-gray-500">Stroke:</label>
                <input type="range" min="1" max="10" value={strokeWidth} onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))} className="w-20 accent-purple-600" />
                <span className="text-xs text-gray-500">{strokeWidth}px</span>
              </>
            )}
            <div className="flex-1" />
            {/* Save status */}
            <div className="flex items-center gap-2">
              {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><div className="w-3 h-3 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin" />Saving...</span>}
              {!saving && lastSaved && <span className="text-xs text-green-600">Saved</span>}
              <button onClick={handleSave} disabled={saving} className="px-3 py-1.5 text-xs font-medium bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Page navigation */}
      {numPages > 1 && (
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-center gap-2">
          <button className="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 transition disabled:opacity-40" onClick={() => scrollToPage(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>Prev</button>
          <div className="flex items-center gap-1">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pg) => (
              <button key={pg} className={`w-8 h-8 text-xs rounded-lg transition ${currentPage === pg ? "bg-purple-600 text-white font-semibold" : "border border-gray-200 hover:bg-gray-50"}`} onClick={() => scrollToPage(pg)}>{pg}</button>
            ))}
          </div>
          <button className="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 transition disabled:opacity-40" onClick={() => scrollToPage(Math.min(numPages, currentPage + 1))} disabled={currentPage >= numPages}>Next</button>
        </div>
      )}

      {/* PDF canvas area */}
      <div ref={canvasContainerRef} className="flex-1 overflow-auto p-4 flex flex-col items-center bg-gray-200" style={{ minHeight: "500px" }} />

      {/* Bottom bar */}
      {showSubmitButton && !readOnly && (status === "application_added" || status === "application_info_requested") && (
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Your progress is saved automatically. Submit when ready.</span>
          </div>
          <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#7a3cff] to-[#15103b] text-white rounded-full shadow-md hover:from-[#6a34e3] hover:to-[#120d33] transition disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      )}

      {readOnly && (
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-center">
          <span className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            This application has been submitted and is read-only.
          </span>
        </div>
      )}
    </div>
  );
};

// ─── Small UI helpers ─────────────────────────────────────────────────────────

const Sep = () => <div className="w-px h-7 bg-gray-200 mx-1" />;

const ICON_MAP = {
  cursor: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />,
  text: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  pencil: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
  highlight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  eraser: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h10" />,
  rect: <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />,
  circle: <circle cx="12" cy="12" r="9" strokeWidth={2} />,
  line: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20L20 4" />,
  delete: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h10" />,
};

const ToolBtn = ({ icon, label, active, onClick, disabled }) => (
  <button
    className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg transition ${active ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-600 hover:bg-gray-100"} ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    onClick={onClick}
    disabled={disabled}
    title={label}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{ICON_MAP[icon]}</svg>
    <span className="hidden md:inline">{label}</span>
  </button>
);

export default PdfEditor;
