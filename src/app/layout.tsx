import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teams AI Extension Prototype",
  description: "AI meeting audit prototype for Teams action item extraction."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
