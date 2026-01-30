import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

// Fetch all family members
export const fetchFamilyMembers = createAsyncThunk(
  'familyMembers/fetchFamilyMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/family-members');
      if (response.data?.success) {
        return response.data.data || [];
      }
      return rejectWithValue('Failed to fetch family members');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch family members';
      return rejectWithValue(message);
    }
  }
);

// Create a new family member
export const createFamilyMember = createAsyncThunk(
  'familyMembers/createFamilyMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/family-members', {
        firstName: memberData.firstName.trim(),
        lastName: memberData.lastName.trim(),
        dateOfBirth: memberData.dateOfBirth,
        relationship: memberData.relationship,
      });
      if (response.data?.success) {
        return response.data.data;
      }
      return rejectWithValue('Failed to create family member');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to create family member';
      return rejectWithValue(message);
    }
  }
);

// Update an existing family member
export const updateFamilyMember = createAsyncThunk(
  'familyMembers/updateFamilyMember',
  async ({ id, memberData }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/family-members/${id}`, {
        firstName: memberData.firstName.trim(),
        lastName: memberData.lastName.trim(),
        dateOfBirth: memberData.dateOfBirth,
        relationship: memberData.relationship,
      });
      if (response.data?.success) {
        return response.data.data;
      }
      return rejectWithValue('Failed to update family member');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to update family member';
      return rejectWithValue(message);
    }
  }
);

// Delete a family member
export const deleteFamilyMember = createAsyncThunk(
  'familyMembers/deleteFamilyMember',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/family-members/${id}`);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to delete family member';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  operationStatus: 'idle', // For create/update/delete operations
  operationError: null,
};

const familyMembersSlice = createSlice({
  name: 'familyMembers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.operationError = null;
    },
    resetFamilyMembers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch family members
      .addCase(fetchFamilyMembers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFamilyMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch family members';
      })
      // Create family member
      .addCase(createFamilyMember.pending, (state) => {
        state.operationStatus = 'loading';
        state.operationError = null;
      })
      .addCase(createFamilyMember.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        state.items.push(action.payload);
        state.operationError = null;
      })
      .addCase(createFamilyMember.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.operationError = action.payload || 'Failed to create family member';
      })
      // Update family member
      .addCase(updateFamilyMember.pending, (state) => {
        state.operationStatus = 'loading';
        state.operationError = null;
      })
      .addCase(updateFamilyMember.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.operationError = null;
      })
      .addCase(updateFamilyMember.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.operationError = action.payload || 'Failed to update family member';
      })
      // Delete family member
      .addCase(deleteFamilyMember.pending, (state) => {
        state.operationStatus = 'loading';
        state.operationError = null;
      })
      .addCase(deleteFamilyMember.fulfilled, (state, action) => {
        state.operationStatus = 'succeeded';
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.operationError = null;
      })
      .addCase(deleteFamilyMember.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.operationError = action.payload || 'Failed to delete family member';
      });
  },
});

export const { clearError, resetFamilyMembers } = familyMembersSlice.actions;

export default familyMembersSlice.reducer;
