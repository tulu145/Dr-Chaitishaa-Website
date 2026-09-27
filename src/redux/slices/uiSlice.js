import { createSlice } from '@reduxjs/toolkit';
import { getStorage, setStorage } from '@/utils/storage.js';
import { STORAGE_KEYS } from '@/utils/constants.js';

// ---------------------------------------------------------------------------
// Persisted: cookieConsent (+consentVersion) from localStorage
// ---------------------------------------------------------------------------
function loadConsent() {
  const stored = getStorage(STORAGE_KEYS.CONSENT);
  if (stored && stored.version === 1) return stored.value;
  return 'unset';
}

const initialState = {
  // Command palette / search
  search: {
    open: false,
    query: '',
    activeId: null,
  },
  // Mobile nav drawer
  drawerOpen: false,
  // Global booking modal (deep-linkable via ?book=<type>)
  bookingModalOpen: false,
  bookingModalType: null, // pre-selected consultation type
  // Cookie consent — 'unset' | 'accepted' | 'declined'
  cookieConsent: loadConsent(),
  consentVersion: 1,
  // Network
  online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  // UTM attribution (captured by useUtmCapture hook; kept here for lead submission)
  attribution: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Search / command palette
    openSearch(state) {
      state.search.open = true;
    },
    closeSearch(state) {
      state.search.open = false;
      state.search.query = '';
      state.search.activeId = null;
    },
    setSearchQuery(state, action) {
      state.search.query = action.payload;
    },
    setSearchActiveId(state, action) {
      state.search.activeId = action.payload;
    },
    // Mobile drawer
    openDrawer(state) {
      state.drawerOpen = true;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
    },
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen;
    },
    // Booking modal
    openBookingModal(state, action) {
      state.bookingModalOpen = true;
      state.bookingModalType = action.payload ?? null;
    },
    closeBookingModal(state) {
      state.bookingModalOpen = false;
      state.bookingModalType = null;
    },
    // Cookie consent
    acceptCookies(state) {
      state.cookieConsent = 'accepted';
      setStorage(STORAGE_KEYS.CONSENT, { value: 'accepted', version: 1 });
    },
    declineCookies(state) {
      state.cookieConsent = 'declined';
      setStorage(STORAGE_KEYS.CONSENT, { value: 'declined', version: 1 });
    },
    // Online status (dispatched by useOnlineStatus listener in AppShell)
    setOnline(state, action) {
      state.online = action.payload;
    },
    // UTM attribution (dispatched by useUtmCapture)
    setAttribution(state, action) {
      state.attribution = action.payload;
    },
  },
});

export const {
  openSearch,
  closeSearch,
  setSearchQuery,
  setSearchActiveId,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openBookingModal,
  closeBookingModal,
  acceptCookies,
  declineCookies,
  setOnline,
  setAttribution,
} = uiSlice.actions;

// Selectors
export const selectSearchOpen = (state) => state.ui.search.open;
export const selectSearchQuery = (state) => state.ui.search.query;
export const selectSearchActiveId = (state) => state.ui.search.activeId;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectBookingModalOpen = (state) => state.ui.bookingModalOpen;
export const selectBookingModalType = (state) => state.ui.bookingModalType;
export const selectCookieConsent = (state) => state.ui.cookieConsent;
export const selectOnline = (state) => state.ui.online;
export const selectAttribution = (state) => state.ui.attribution;

export default uiSlice.reducer;
