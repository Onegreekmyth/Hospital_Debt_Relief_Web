import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const uploadBill = createAsyncThunk(
  "bills/uploadBill",
  async (
    { patientName, serviceDate, billAmount, file },
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

const billsSlice = createSlice({
  name: "bills",
  initialState: {
    uploadLoading: false,
    uploadError: "",
  },
  reducers: {
    clearUploadError: (state) => {
      state.uploadError = "";
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
      });
  },
});

export const { clearUploadError } = billsSlice.actions;
export default billsSlice.reducer;
