"use client";

import { useAppSelector } from "@/libraries/redux/hooks";
import localFont from "next/font/local";
import { IRootLayoutProps } from "../layout";

const geistSans = localFont({
  src: "../../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export interface IHTMLDomProps extends IRootLayoutProps {}

export const HTMLDom: React.FC<IHTMLDomProps> = ({ children }) => {
  const appState = useAppSelector((state) => state.app);

  return (
    <html lang={appState.locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};
