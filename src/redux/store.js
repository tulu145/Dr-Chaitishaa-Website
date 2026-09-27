import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice.js';
import bookingDraftReducer from './slices/bookingDraftSlice.js';
import authReducer from './slices/authSlice.js';
import uiReducer from './slices/uiSlice.js';
import { api } from './api/api.js';

// Ensure endpoint injection files are evaluated so their endpoints are registered
import './api/endpoints/catalog.js';
import './api/endpoints/leads.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    bookingDraft: bookingDraftReducer,
    auth: authReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
