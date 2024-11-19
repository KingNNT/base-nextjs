import { createIntl, createIntlCache } from "react-intl";
import EnUS from "@lang/en.json";
import { LocaleSupport } from "@/enums";
import { flatten } from "flat";

const intlCache = createIntlCache();

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const messages: Record<LocaleSupport, any> = {
  en: flatten(EnUS),
};

export const createIntlInstance = (locale: LocaleSupport) =>
  createIntl(
    {
      locale: locale,
      messages: messages[locale],
    },
    intlCache,
  );
