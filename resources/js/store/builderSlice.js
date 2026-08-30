import { createSlice } from '@reduxjs/toolkit';

/*
 * Slice ini sengaja minimal dan BELUM dikonsumsi komponen mana pun.
 * EventBuilder.jsx masih jadi sumber kebenaran untuk seluruh state builder
 * (elements, eventPages, undo/redo, dsb). Store ini disiapkan sebagai tempat
 * pindahnya state tersebut nanti — memindahkannya sekarang akan menduplikasi
 * state dan bikin dua sumber kebenaran.
 */
const initialState = {
  pageTitle: 'Event Baru',
  saveStatus: 'idle', // idle | saving | saved | error
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setPageTitle(state, action) {
      state.pageTitle = action.payload;
    },
    setSaveStatus(state, action) {
      state.saveStatus = action.payload;
    },
  },
});

export const { setPageTitle, setSaveStatus } = builderSlice.actions;

export const selectPageTitle = (state) => state.builder.pageTitle;
export const selectSaveStatus = (state) => state.builder.saveStatus;

export default builderSlice.reducer;
