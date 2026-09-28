import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickPDF",
  description: "Lightweight browser-based PDF utilities for everyday file tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
