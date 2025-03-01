import { LocaleSupport } from "@/enums";
import { ValueOf } from "@/types";
import { ThemeSupport } from "@configs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  isBooted: boolean;
  locale: LocaleSupport;
  theme: ValueOf<typeof ThemeSupport>;
}

const initialState: IState = {
  isBooted: false,
  locale: LocaleSupport.EN,
  theme: ThemeSupport.Light,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsBooted: (state, action: PayloadAction<boolean>) => {
      state.isBooted = action.payload;
    },
    setLocale: (state, action: PayloadAction<LocaleSupport>) => {
      state.locale = action.payload;
    },
  },
});

export const { setIsBooted, setLocale } = appSlice.actions;

export default appSlice.reducer;
