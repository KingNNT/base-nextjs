import { LocaleSupport } from "@/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isBooted: false,
    locale: LocaleSupport.EN,
  },
  reducers: {
    setIsBooted: (state, action: PayloadAction<boolean>) => {
      state.isBooted = action.payload;
    },
  },
});

export const { setIsBooted } = appSlice.actions;

export default appSlice.reducer;
