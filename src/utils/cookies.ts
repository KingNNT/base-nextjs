"use client";

import Cookies from "js-cookie";

export const CookiesUtil = {
  /**
   * Get a cookie (Client-side only)
   * @param name - Cookie name
   * @returns The cookie value or null
   */
  get: (name: string): string | null => {
    if (typeof window !== "undefined") {
      return Cookies.get(name) || null;
    }
    return null;
  },

  /**
   * Set a cookie (Client-side only)
   * @param name - Cookie name
   * @param value - Cookie value
   * @param options - Optional settings
   */
  set: (
    name: string,
    value: string,
    options?: Cookies.CookieAttributes,
  ): void => {
    if (typeof window !== "undefined") {
      Cookies.set(name, value, { expires: 365, path: "/", ...options });
    }
  },

  /**
   * Remove a cookie (Client-side only)
   * @param name - Cookie name
   */
  remove: (name: string): void => {
    if (typeof window !== "undefined") {
      Cookies.remove(name);
    }
  },
};
