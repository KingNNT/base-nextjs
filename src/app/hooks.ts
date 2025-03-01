import { UIBreakPoint } from "@configs";
import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: UIBreakPoint.md });

  return { isMobile };
};
