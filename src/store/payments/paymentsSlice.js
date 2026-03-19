import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const createCheckoutSession = createAsyncThunk(
  "payments/createCheckoutSession",
  async ({ planId, successUrl, cancelUrl, billId, hipaaEmailConsent }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/payments/create-checkout-session",
        {
          planId,
          successUrl,
          cancelUrl,
          ...(billId ? { billId } : {}),
          ...(hipaaEmailConsent ? { hipaaEmailConsent } : {}),
        }
      );

      if (response.data?.success && response.data?.data?.url) {
        return response.data.data.url;
      }

      return rejectWithValue(
        response.data?.message || "Failed to create checkout session"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to create checkout session"
      );
    }
  }
);

export const syncStripeSession = createAsyncThunk(
  "payments/syncStripeSession",
  async ({ sessionId }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/payments/sync-session", {
        sessionId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to sync membership"
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

export const createDonationSession = createAsyncThunk(
  "payments/createDonationSession",
  async ({ amountInCents, successUrl, cancelUrl }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/payments/create-donation-session",
        { amountInCents, successUrl, cancelUrl }
      );
      if (response.data?.success && response.data?.data?.url) {
        return response.data.data.url;
      }
      return rejectWithValue(
        response.data?.message || "Failed to start donation"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to start donation"
      );
    }
  }
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    checkoutLoading: false,
    checkoutError: "",
    checkoutUrl: "",
    syncLoading: false,
    syncError: "",
    cancelLoading: false,
    cancelError: "",
    donationLoading: false,
    donationError: "",
  },
  reducers: {
    clearCheckoutError: (state) => {
      state.checkoutError = "";
    },
    clearDonationError: (state) => {
      state.donationError = "";
    },
    clearSyncError: (state) => {
      state.syncError = "";
    },
    clearCancelError: (state) => {
      state.cancelError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.checkoutLoading = true;
        state.checkoutError = "";
        state.checkoutUrl = "";
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutUrl = action.payload;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.checkoutError = action.payload || "Failed to start membership.";
      })
      .addCase(syncStripeSession.pending, (state) => {
        state.syncLoading = true;
        state.syncError = "";
      })
      .addCase(syncStripeSession.fulfilled, (state) => {
        state.syncLoading = false;
      })
      .addCase(syncStripeSession.rejected, (state, action) => {
        state.syncLoading = false;
        state.syncError = action.payload || "Failed to sync membership.";
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
      .addCase(createDonationSession.pending, (state) => {
        state.donationLoading = true;
        state.donationError = "";
      })
      .addCase(createDonationSession.fulfilled, (state, action) => {
        state.donationLoading = false;
      })
      .addCase(createDonationSession.rejected, (state, action) => {
        state.donationLoading = false;
        state.donationError = action.payload || "Failed to start donation.";
      });
  },
});

export const { clearCheckoutError, clearSyncError, clearCancelError, clearDonationError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
