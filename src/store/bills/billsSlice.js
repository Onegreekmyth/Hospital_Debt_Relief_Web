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

export const uploadElectronicConsentForm = createAsyncThunk(
  "bills/uploadElectronicConsentForm",
  async ({ billId, pdfBlob, hipaaEmailConsent }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "electronic-consent-form.pdf");
      formData.append("hipaaEmailConsent", hipaaEmailConsent);

      const response = await axiosClient.post(
        `/bills/${billId}/electronic-consent-form`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to upload electronic consent form."
        );
      }
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to upload electronic consent form. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const deleteElectronicConsentForm = createAsyncThunk(
  "bills/deleteElectronicConsentForm",
  async (billId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(
        `/bills/${billId}/electronic-consent-form`
      );
      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to remove electronic consent form."
        );
      }
      return { billId, ...response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to remove electronic consent form. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const uploadSupportingDocument = createAsyncThunk(
  "bills/uploadSupportingDocument",
  async ({ billId, file, documentType }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      if (documentType) formData.append("documentType", documentType);

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

export const completeBillApplication = createAsyncThunk(
  "bills/completeBillApplication",
  async (payload, { rejectWithValue }) => {
    try {
      const billId = typeof payload === "string" ? payload : payload?.billId;
      const hipaaEmailConsent =
        typeof payload === "object" ? payload?.hipaaEmailConsent : undefined;

      const url = `/bills/${billId}/complete-application`;

      const response =
        hipaaEmailConsent !== undefined
          ? await axiosClient.patch(url, { hipaaEmailConsent })
          : await axiosClient.patch(url);

      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to complete application."
        );
      }
      return { billId, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to complete application. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export const requestRefund = createAsyncThunk(
  "bills/requestRefund",
  async (payload, { rejectWithValue }) => {
    try {
      const billId = typeof payload === "string" ? payload : payload.billId;
      const revisedAmount = typeof payload === "object" ? payload.revisedAmount : undefined;
      
      const data = revisedAmount ? { revisedAmount } : {};
      
      const response = await axiosClient.post(`/bills/${billId}/request-refund`, data);
      if (response.data?.success === false) {
        return rejectWithValue(
          response.data?.message || "Failed to submit refund request."
        );
      }
      return { billId, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to submit refund request. Please try again.";
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
    electronicConsentUploadLoading: false,
    electronicConsentUploadError: "",
    electronicConsentDeleteLoading: false,
    electronicConsentDeleteError: "",
    supportingDocUploadLoading: false,
    supportingDocUploadError: "",
    supportingDocDeleteLoading: false,
    supportingDocDeleteError: "",
    billDeleteLoading: false,
    billDeleteError: "",
    completeApplicationLoading: false,
    completeApplicationError: "",
    refundRequestLoading: false,
    refundRequestError: "",
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
    clearElectronicConsentUploadError: (state) => {
      state.electronicConsentUploadError = "";
    },
    clearElectronicConsentDeleteError: (state) => {
      state.electronicConsentDeleteError = "";
    },
    clearSupportingDocUploadError: (state) => {
      state.supportingDocUploadError = "";
    },
    clearSupportingDocDeleteError: (state) => {
      state.supportingDocDeleteError = "";
    },
    clearRefundRequestError: (state) => {
      state.refundRequestError = "";
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
      .addCase(uploadElectronicConsentForm.pending, (state) => {
        state.electronicConsentUploadLoading = true;
        state.electronicConsentUploadError = "";
      })
      .addCase(uploadElectronicConsentForm.fulfilled, (state) => {
        state.electronicConsentUploadLoading = false;
      })
      .addCase(uploadElectronicConsentForm.rejected, (state, action) => {
        state.electronicConsentUploadLoading = false;
        state.electronicConsentUploadError =
          action.payload ||
          "Failed to upload electronic consent form. Please try again.";
      })
      .addCase(deleteElectronicConsentForm.pending, (state) => {
        state.electronicConsentDeleteLoading = true;
        state.electronicConsentDeleteError = "";
      })
      .addCase(deleteElectronicConsentForm.fulfilled, (state) => {
        state.electronicConsentDeleteLoading = false;
      })
      .addCase(deleteElectronicConsentForm.rejected, (state, action) => {
        state.electronicConsentDeleteLoading = false;
        state.electronicConsentDeleteError =
          action.payload ||
          "Failed to remove electronic consent form. Please try again.";
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
      })
      .addCase(completeBillApplication.pending, (state) => {
        state.completeApplicationLoading = true;
        state.completeApplicationError = "";
      })
      .addCase(completeBillApplication.fulfilled, (state) => {
        state.completeApplicationLoading = false;
      })
      .addCase(completeBillApplication.rejected, (state, action) => {
        state.completeApplicationLoading = false;
        state.completeApplicationError =
          action.payload || "Failed to complete application. Please try again.";
      })
      .addCase(requestRefund.pending, (state) => {
        state.refundRequestLoading = true;
        state.refundRequestError = "";
      })
      .addCase(requestRefund.fulfilled, (state) => {
        state.refundRequestLoading = false;
      })
      .addCase(requestRefund.rejected, (state, action) => {
        state.refundRequestLoading = false;
        state.refundRequestError =
          action.payload || "Failed to submit refund request. Please try again.";
      });
  },
});

export const {
  clearUploadError,
  clearHipaaUploadError,
  clearHipaaDeleteError,
  clearElectronicConsentUploadError,
  clearElectronicConsentDeleteError,
  clearSupportingDocUploadError,
  clearSupportingDocDeleteError,
  clearRefundRequestError,
} = billsSlice.actions;
export default billsSlice.reducer;
