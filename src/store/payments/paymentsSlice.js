import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const donate = createAsyncThunk(
  "payments/donate",
  async ({ amountInCents, dataDescriptor, dataValue }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/payments/donate", {
        amountInCents,
        dataDescriptor,
        dataValue,
      });
      if (response.data?.success) return response.data.data;
      return rejectWithValue(
        response.data?.message || "Failed to process donation"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to process donation"
      );
    }
  }
);

export const fetchBillingStatus = createAsyncThunk(
  "payments/fetchBillingStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/payments/billing-status");
      if (response.data?.success) return response.data.data;
      return rejectWithValue(
        response.data?.message || "Failed to load billing status"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load billing status"
      );
    }
  }
);

export const chargeFlatFee = createAsyncThunk(
  "payments/chargeFlatFee",
  async (
    { billId, hipaaEmailConsent, dataDescriptor, dataValue },
    { rejectWithValue }
  ) => {
    try {
      const payload = { billId, hipaaEmailConsent };
      if (dataDescriptor && dataValue) {
        payload.dataDescriptor = dataDescriptor;
        payload.dataValue = dataValue;
      }
      const response = await axiosClient.post("/payments/charge-flat-fee", payload);
      if (response.data?.success) return response.data.data;
      return rejectWithValue(
        response.data?.message || "Failed to process payment"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to process payment"
      );
    }
  }
);

export const subscribe = createAsyncThunk(
  "payments/subscribe",
  async ({ planId, dataDescriptor, dataValue }, { rejectWithValue }) => {
    try {
      const payload = { planId };
      if (dataDescriptor && dataValue) {
        payload.dataDescriptor = dataDescriptor;
        payload.dataValue = dataValue;
      }
      const response = await axiosClient.post("/payments/subscribe", payload);
      if (response.data?.success) return response.data.data;
      return rejectWithValue(
        response.data?.message || "Failed to start membership"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to start membership"
      );
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "payments/cancelSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/payments/cancel-subscription");
      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Failed to cancel membership"
        );
      }
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to cancel membership"
      );
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    paymentLoading: false,
    paymentError: "",
    cancelLoading: false,
    cancelError: "",
    donationLoading: false,
    donationError: "",
    billingStatus: null,
    billingStatusLoading: false,
  },
  reducers: {
    clearPaymentError: (state) => {
      state.paymentError = "";
    },
    clearDonationError: (state) => {
      state.donationError = "";
    },
    clearCancelError: (state) => {
      state.cancelError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(donate.pending, (state) => {
        state.donationLoading = true;
        state.donationError = "";
      })
      .addCase(donate.fulfilled, (state) => {
        state.donationLoading = false;
      })
      .addCase(donate.rejected, (state, action) => {
        state.donationLoading = false;
        state.donationError = action.payload || "Donation failed.";
      })
      .addCase(chargeFlatFee.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = "";
      })
      .addCase(chargeFlatFee.fulfilled, (state) => {
        state.paymentLoading = false;
      })
      .addCase(chargeFlatFee.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload || "Payment failed.";
      })
      .addCase(subscribe.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = "";
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.paymentLoading = false;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload || "Membership failed.";
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.cancelError = "";
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.cancelLoading = false;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelError = action.payload || "Failed to cancel membership.";
      })
      .addCase(fetchBillingStatus.pending, (state) => {
        state.billingStatusLoading = true;
      })
      .addCase(fetchBillingStatus.fulfilled, (state, action) => {
        state.billingStatusLoading = false;
        state.billingStatus = action.payload;
      })
      .addCase(fetchBillingStatus.rejected, (state) => {
        state.billingStatusLoading = false;
        state.billingStatus = null;
      });
  },
});

export const { clearPaymentError, clearDonationError, clearCancelError } =
  paymentsSlice.actions;
export default paymentsSlice.reducer;
