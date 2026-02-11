import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

const initialProfileState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  mailingAddress: '',
  annualHouseholdIncome: '',
  hospitalInfo: null,
  withActiveSubscription: true,
};

// Register (signup) - POST /auth/register
export const register = createAsyncThunk(
  'user/register',
  async (
    { firstName, lastName, email, phone, eligibilityRequestId },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        firstName: (firstName || '').trim(),
        lastName: (lastName || '').trim(),
        email: (email || '').trim(),
        phone: (phone || '').trim(),
        ...(eligibilityRequestId && { eligibilityRequestId }),
      };
      const response = await axiosClient.post('/auth/register', payload);
      if (!response.data.success) {
        return rejectWithValue(response.data?.message || 'Failed to create account');
      }
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to create account. Please try again.';
      return rejectWithValue(message);
    }
  }
);

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/auth/profile');
      if (!response.data.success) {
        return rejectWithValue(response.data?.message || 'Failed to load profile');
      }
      const userData = response.data.data;

      // Use firstName/lastName from API, or fall back to splitting name
      const nameParts = (userData.name || '').trim().split(' ');
      const firstName =
        userData.firstName != null && String(userData.firstName).trim() !== ''
          ? String(userData.firstName).trim()
          : (nameParts[0] || '');
      const lastName =
        userData.lastName != null && String(userData.lastName).trim() !== ''
          ? String(userData.lastName).trim()
          : (nameParts.slice(1).join(' ') || '');

      const annualHouseholdIncome = userData.eligibilityData?.householdIncome;
      const hospitalInfo = userData.eligibilityData?.hospitalInfo || null;

      const profile = {
        firstName,
        lastName,
        mailingAddress: userData.mailingAddress || '',
        email: userData.email || '',
        phone: userData.phone || '',
        annualHouseholdIncome: annualHouseholdIncome
          ? annualHouseholdIncome.toLocaleString('en-US')
          : '',
        hospitalInfo,
        withActiveSubscription: userData.withActiveSubscription !== false,
      };

      return { profile, userData };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to load profile';
      return rejectWithValue({ message, status: error.response?.status });
    }
  }
);

// Update account holder subscription inclusion (remove from / add to plan)
export const updateAccountHolderSubscription = createAsyncThunk(
  'user/updateAccountHolderSubscription',
  async ({ withActiveSubscription }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch('/auth/profile/subscription-inclusion', {
        withActiveSubscription,
      });
      if (!response.data?.success) {
        return rejectWithValue(response.data?.message || 'Failed to update');
      }
      return { withActiveSubscription: response.data.data?.withActiveSubscription };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to update subscription preference';
      return rejectWithValue(message);
    }
  }
);

// Update user profile (firstName, lastName, phone, mailing_address)
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    { firstName, lastName, phone, mailing_address },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put('/auth/profile', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        mailing_address: (mailing_address || '').trim(),
      });
      if (!response.data?.success) {
        return rejectWithValue(response.data?.message || 'Failed to update profile');
      }
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to update profile. Please try again.';
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: initialProfileState,
    status: 'idle', // 'idle' | 'loading'
    error: null,
    updateStatus: 'idle', // 'idle' | 'loading'
    updateError: null,
    updateSuccess: false,
  },
  reducers: {
    setProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state.profile) {
        state.profile[field] = value;
      }
    },
    setProfileFields: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.profile = action.payload.profile;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'idle';
        const p = action.payload;
        state.error = typeof p === 'string' ? p : p?.message || 'Failed to load profile';
      })
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = 'idle';
        state.updateError = null;
        state.updateSuccess = true;
        if (action.payload) {
          const p = action.payload;
          if (p.firstName != null) state.profile.firstName = p.firstName;
          if (p.lastName != null) state.profile.lastName = p.lastName;
          if (p.phone != null) state.profile.phone = p.phone;
          if (p.mailingAddress != null) state.profile.mailingAddress = p.mailingAddress;
          if (p.mailing_address != null) state.profile.mailingAddress = p.mailing_address;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = 'idle';
        const p = action.payload;
        state.updateError = typeof p === 'string' ? p : p?.message || 'Failed to update profile';
      })
      .addCase(updateAccountHolderSubscription.fulfilled, (state, action) => {
        if (action.payload?.withActiveSubscription !== undefined) {
          state.profile.withActiveSubscription = action.payload.withActiveSubscription;
        }
      });
  },
});

export const { setProfileField, setProfileFields, clearUpdateSuccess, clearError } =
  userSlice.actions;
export default userSlice.reducer;
