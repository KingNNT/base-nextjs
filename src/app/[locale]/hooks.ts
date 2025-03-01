"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/libraries/redux/hooks";
import { setIsBooted } from "@/libraries/redux/features/app/appSlice";

export const useApp = () => {
  const dispatch = useAppDispatch();

  const init = () => {
    dispatch(setIsBooted(true));
  };

  useEffect(() => {
    init();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
};
