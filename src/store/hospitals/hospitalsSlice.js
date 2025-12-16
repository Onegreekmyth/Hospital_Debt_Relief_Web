import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

const DEFAULT_PAGE_SIZE = 100;
const FILTERED_PAGE_SIZE = 20;

export const fetchHospitals = createAsyncThunk(
  'hospitals/fetchHospitals',
  // arg: { page, state?, city? }
  async (arg, { rejectWithValue }) => {
    const {
      page = 1,
      state,
      city,
    } = arg || {};

    try {
      const hasFilter = !!state || !!city;
      const limit = hasFilter ? FILTERED_PAGE_SIZE : DEFAULT_PAGE_SIZE;

      const response = await axiosClient.get('/hospitals', {
        params: {
          page,
          limit,
          ...(state ? { state } : {}),
          ...(city ? { city } : {}),
        },
      });

      const { data, pagination } = response.data || {};

      return {
        hospitals: data || [],
        page,
        totalPages: pagination?.totalPages ?? page,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to load hospitals';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  page: 0,
  totalPages: 1,
  status: 'idle',
  error: null,
};

const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    resetHospitals: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        const { hospitals, page, totalPages } = action.payload;

        state.status = 'succeeded';
        state.page = page;
        state.totalPages = totalPages;

        // append unique hospitals by _id
        const existingIds = new Set(state.items.map((h) => h._id));
        const newOnes = hospitals.filter((h) => !existingIds.has(h._id));
        state.items = [...state.items, ...newOnes];
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load hospitals';
      });
  },
});

export const { resetHospitals } = hospitalsSlice.actions;

export default hospitalsSlice.reducer;

