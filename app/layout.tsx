import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BioTranslate Pro",
  description: "Professional Chinese-English biomedical translation platform.",
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
