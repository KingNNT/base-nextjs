import { createIntl, createIntlCache } from "react-intl";
import En from "@lang/en.json";
import Vi from "@lang/vi.json";
import { LocaleSupport } from "@/enums";
import { flatten } from "flat";

const intlCache = createIntlCache();

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const messages: Record<LocaleSupport, any> = {
  en: flatten(En),
  vi: flatten(Vi),
};

export const createIntlInstance = (locale: LocaleSupport) =>
  createIntl(
    {
      locale: locale,
      messages: messages[locale],
    },
    intlCache,
  );
