import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const uploadBill = createAsyncThunk(
  "bills/uploadBill",
  async (
    { patientName, serviceDate, billAmount, documentType, file },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("patientName", patientName);
      formData.append(
        "serviceDate",
        serviceDate || new Date().toISOString().split("T")[0]
      );
      formData.append("billAmount", parseFloat(billAmount));
      if (documentType) formData.append("documentType", documentType);
      formData.append("pdf", file);

      const response = await axiosClient.post("/bills", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });

      if (response.data?.success) {
        return response.data;
      }
      return rejectWithValue(
        response.data?.message || "Failed to upload bill."
      );
    } catch (error) {
      const isTimeout =
        error.code === "ECONNABORTED" ||
        error.message?.toLowerCase().includes("timeout");
      const isNetworkError =
        error.message === "Network Error" || !error.response;
      const message = isTimeout || isNetworkError
        ? "Upload failed. Try Wi‑Fi, a smaller image, or try again in a moment."
        : error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to upload bill. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const uploadHipaaForm = createAsyncThunk(
  "bills/uploadHipaaForm",
  async ({ billId, pdfBlob }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "hipaa-form.pdf");

      const response = await axiosClient.post(
        `/bills/${billId}/hipaa-form`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to upload HIPAA form."
        );
      }
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to upload HIPAA form. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const deleteHipaaForm = createAsyncThunk(
  "bills/deleteHipaaForm",
  async (billId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/bills/${billId}/hipaa-form`);
      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to remove HIPAA form."
        );
      }
      return { billId, ...response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to remove HIPAA form. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const uploadSupportingDocument = createAsyncThunk(
  "bills/uploadSupportingDocument",
  async ({ billId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await axiosClient.post(
        `/bills/${billId}/supporting-documents`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to upload supporting document."
        );
      }
      return { billId, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to upload supporting document. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const deleteSupportingDocument = createAsyncThunk(
  "bills/deleteSupportingDocument",
  async ({ billId, docId }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(
        `/bills/${billId}/supporting-documents/${docId}`
      );
      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to remove supporting document."
        );
      }
      return { billId, docId, ...response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to remove supporting document. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const deleteBill = createAsyncThunk(
  "bills/deleteBill",
  async (billId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/bills/${billId}`);
      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to delete bill."
        );
      }
      return { billId, ...response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to delete bill. Please try again.";
      return rejectWithValue(message);
    }
  }
);

const billsSlice = createSlice({
  name: "bills",
  initialState: {
    uploadLoading: false,
    uploadError: "",
    hipaaUploadLoading: false,
    hipaaUploadError: "",
    hipaaDeleteLoading: false,
    hipaaDeleteError: "",
    supportingDocUploadLoading: false,
    supportingDocUploadError: "",
    supportingDocDeleteLoading: false,
    supportingDocDeleteError: "",
    billDeleteLoading: false,
    billDeleteError: "",
  },
  reducers: {
    clearUploadError: (state) => {
      state.uploadError = "";
    },
    clearHipaaUploadError: (state) => {
      state.hipaaUploadError = "";
    },
    clearHipaaDeleteError: (state) => {
      state.hipaaDeleteError = "";
    },
    clearSupportingDocUploadError: (state) => {
      state.supportingDocUploadError = "";
    },
    clearSupportingDocDeleteError: (state) => {
      state.supportingDocDeleteError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBill.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = "";
      })
      .addCase(uploadBill.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadBill.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload || "Failed to upload bill.";
      })
      .addCase(uploadHipaaForm.pending, (state) => {
        state.hipaaUploadLoading = true;
        state.hipaaUploadError = "";
      })
      .addCase(uploadHipaaForm.fulfilled, (state) => {
        state.hipaaUploadLoading = false;
      })
      .addCase(uploadHipaaForm.rejected, (state, action) => {
        state.hipaaUploadLoading = false;
        state.hipaaUploadError =
          action.payload || "Failed to upload HIPAA form. Please try again.";
      })
      .addCase(deleteHipaaForm.pending, (state) => {
        state.hipaaDeleteLoading = true;
        state.hipaaDeleteError = "";
      })
      .addCase(deleteHipaaForm.fulfilled, (state) => {
        state.hipaaDeleteLoading = false;
      })
      .addCase(deleteHipaaForm.rejected, (state, action) => {
        state.hipaaDeleteLoading = false;
        state.hipaaDeleteError =
          action.payload || "Failed to remove HIPAA form. Please try again.";
      })
      .addCase(deleteBill.pending, (state) => {
        state.billDeleteLoading = true;
        state.billDeleteError = "";
      })
      .addCase(deleteBill.fulfilled, (state) => {
        state.billDeleteLoading = false;
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.billDeleteLoading = false;
        state.billDeleteError =
          action.payload || "Failed to delete bill. Please try again.";
      });
  },
});

export const {
  clearUploadError,
  clearHipaaUploadError,
  clearHipaaDeleteError,
  clearSupportingDocUploadError,
  clearSupportingDocDeleteError,
} = billsSlice.actions;
export default billsSlice.reducer;
