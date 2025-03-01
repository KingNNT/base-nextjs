import { theme, ThemeConfig } from "antd";
import { UIBreakPoint } from "./ui-breakpoint.config";

const CommonThemeToken: ThemeConfig = {
  token: {
    screenXS: UIBreakPoint.xs,
    screenSM: UIBreakPoint.sm,
    screenMD: UIBreakPoint.md,
    screenLG: UIBreakPoint.lg,
    screenXL: UIBreakPoint.xl,
    screenXXL: UIBreakPoint.xxl,
  },
  components: {
    Layout: {
      triggerHeight: 60,
    },
  },
};

export const DefaultThemeToken: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  ...CommonThemeToken,
};

export const LightThemeToken: ThemeConfig = {
  algorithm: theme.compactAlgorithm,
  ...CommonThemeToken,
};

export const DarkThemeToken: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  ...CommonThemeToken,
};
