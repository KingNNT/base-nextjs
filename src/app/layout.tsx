import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/index.scss";
import { LibraryProvider } from "@/libraries/LibraryProvider";
import { PropsWithChildren } from "react";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export interface IRootLayoutProps extends PropsWithChildren {}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <LibraryProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </LibraryProvider>
  );
};

export default RootLayout;
