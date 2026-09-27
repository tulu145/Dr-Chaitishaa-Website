import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setStorage, getStorage, removeStorage } from '@/utils/storage.js';
import { STORAGE_KEYS } from '@/utils/constants.js';

// ---------------------------------------------------------------------------
// Mock auth thunk — resolves after 600 ms for any well-formed input.
// Swap-in point: replace the body with an RTK Query mutation call.
// ---------------------------------------------------------------------------
export const signIn = createAsyncThunk('auth/signIn', async ({ email, name }, { rejectWithValue }) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Minimal server-side-style validation on the mock
  if (!email || !email.includes('@')) {
    return rejectWithValue('Enter a valid email address.');
  }

  const user = {
    id: crypto.randomUUID(),
    name: name || email.split('@')[0],
    email,
  };

  // Store session marker (no token, no password)
  setStorage(STORAGE_KEYS.SESSION, user, 'session');
  return user;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeStorage(STORAGE_KEYS.SESSION, 'session');
});

// ---------------------------------------------------------------------------
// Load initial session from sessionStorage (survives page reload but not
// a new tab — intentional for a prototype with no real tokens).
// ---------------------------------------------------------------------------
function loadSession() {
  return getStorage(STORAGE_KEYS.SESSION, 'session') ?? null;
}

const storedUser = loadSession();

const initialState = {
  status: storedUser ? 'authenticated' : 'anonymous',
  user: storedUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'authenticating';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'anonymous';
        state.user = null;
        state.error = action.payload ?? 'Sign-in failed. Please try again.';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = 'anonymous';
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

// Selectors
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.status === 'authenticated';

export default authSlice.reducer;
