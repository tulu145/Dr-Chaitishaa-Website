import { createSlice } from '@reduxjs/toolkit';

const EMPTY_VALUES = {
  consultationType: '',
  name: '',
  countryCode: '+91',
  phone: '',
  email: '',
  preferredDate: '',
  preferredTime: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
  birthDate: '',
  birthTime: '',
  birthPlace: '',
  propertyNotes: '',
  notes: '',
  consent: false,
  website: '', // honeypot
};

const initialState = {
  step: 1,
  values: EMPTY_VALUES,
  // File metadata only — File objects cannot be serialized
  file: null, // { name, size, mimeType } | null
  savedAt: null,
  expiresAt: null,
  status: 'idle', // 'idle' | 'reviewing' | 'submitting' | 'awaitingUndo' | 'committing' | 'success' | 'error'
  leadId: null,
  undoDeadline: null, // epoch ms
  channelResults: { sheet: 'pending', email: 'pending', whatsapp: 'pending' },
  errorMessage: null,
};

const bookingDraftSlice = createSlice({
  name: 'bookingDraft',
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    updateValues(state, action) {
      state.values = { ...state.values, ...action.payload };
    },
    setFileMetadata(state, action) {
      // payload: { name, size, mimeType } | null
      state.file = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setLeadId(state, action) {
      state.leadId = action.payload;
    },
    setUndoDeadline(state, action) {
      state.undoDeadline = action.payload; // epoch ms
    },
    setChannelResult(state, action) {
      // payload: { channel: 'sheet'|'email'|'whatsapp', result: 'ok'|'failed'|'skipped' }
      const { channel, result } = action.payload;
      state.channelResults[channel] = result;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    // Restore a saved draft (from localStorage on page load)
    restoreDraft(state, action) {
      const { values, step, savedAt, expiresAt } = action.payload;
      // Never restore consent or honeypot from storage
      // eslint-disable-next-line no-unused-vars
      const { consent: _c, website: _w, ...safeValues } = values || {};
      state.values = { ...EMPTY_VALUES, ...safeValues };
      state.step = step ?? 1;
      state.savedAt = savedAt ?? null;
      state.expiresAt = expiresAt ?? null;
      state.status = 'idle';
    },
    discardDraft() {
      return { ...initialState };
    },
    resetAfterSuccess() {
      return { ...initialState };
    },
  },
});

export const {
  setStep,
  updateValues,
  setFileMetadata,
  setStatus,
  setLeadId,
  setUndoDeadline,
  setChannelResult,
  setErrorMessage,
  restoreDraft,
  discardDraft,
  resetAfterSuccess,
} = bookingDraftSlice.actions;

// Selectors
export const selectDraftValues = (state) => state.bookingDraft.values;
export const selectDraftStep = (state) => state.bookingDraft.step;
export const selectDraftStatus = (state) => state.bookingDraft.status;
export const selectLeadId = (state) => state.bookingDraft.leadId;
export const selectUndoDeadline = (state) => state.bookingDraft.undoDeadline;
export const selectChannelResults = (state) => state.bookingDraft.channelResults;
export const selectFileMetadata = (state) => state.bookingDraft.file;
export const selectDraftErrorMessage = (state) => state.bookingDraft.errorMessage;

export default bookingDraftSlice.reducer;
