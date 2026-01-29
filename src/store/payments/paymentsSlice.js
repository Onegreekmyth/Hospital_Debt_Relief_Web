import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const createCheckoutSession = createAsyncThunk(
  "payments/createCheckoutSession",
  async ({ planId, successUrl, cancelUrl }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        "/payments/create-checkout-session",
        {
          planId,
          successUrl,
          cancelUrl,
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
          "Failed to sync subscription"
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
  },
  reducers: {
    clearCheckoutError: (state) => {
      state.checkoutError = "";
    },
    clearSyncError: (state) => {
      state.syncError = "";
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
        state.checkoutError = action.payload || "Failed to start subscription.";
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
        state.syncError = action.payload || "Failed to sync subscription.";
      });
  },
});

export const { clearCheckoutError, clearSyncError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
