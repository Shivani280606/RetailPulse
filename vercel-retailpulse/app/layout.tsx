import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetailPulse Command Center",
  description: "A Vercel-ready retail analytics command center.",
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
