import { ValueOf } from "@/types";
import {
  DarkThemeToken,
  DefaultThemeToken,
  LightThemeToken,
  ThemeSupport,
} from "@configs";

export const getAntdTheme = (
  theme: ValueOf<typeof ThemeSupport> = ThemeSupport.Light,
) => {
  if (theme === ThemeSupport.Light) {
    return LightThemeToken;
  }
  if (theme === ThemeSupport.Dark) {
    return DarkThemeToken;
  }
  return DefaultThemeToken;
};
