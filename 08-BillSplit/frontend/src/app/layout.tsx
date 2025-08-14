import type React from "react";
import type { Metadata } from "next";
// import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "@/src/contexts/AuthProvider";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bill Splitter ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
