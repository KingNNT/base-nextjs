"use client";

import { motion } from "framer-motion";
import { LocaleSupport } from "@/enums";
import { setLocale } from "@/libraries/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/libraries/redux/hooks";
import { Select, SelectProps } from "antd";
import { useIntl } from "react-intl";
import { CookiesUtil } from "@/utils";
import { CACHE_KEYS } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export const SelectLocale = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);
  const pathname = usePathname();
  const router = useRouter();

  const options = [
    {
      value: LocaleSupport.EN,
      label: (
        <span className="label">{intl.formatMessage({ id: "english" })}</span>
      ),
    },
    {
      value: LocaleSupport.VI,
      label: (
        <span className="label">
          {intl.formatMessage({ id: "vietnamese" })}
        </span>
      ),
    },
  ];

  const handleOnChange: SelectProps["onChange"] = (value: LocaleSupport) => {
    dispatch(setLocale(value));
    CookiesUtil.set(CACHE_KEYS.NEXT_LOCALE, value);
    const pathSegments = pathname.split("/");
    pathSegments[1] = value; // Change the language segment
    const newPath = pathSegments.join("/");
    router.push(newPath);
  };
  return (
    <>
      <motion.div className="select-locale">
        <Select
          defaultValue={appState.locale}
          className="select"
          onChange={handleOnChange}
          options={options}
        />
      </motion.div>
    </>
  );
};
