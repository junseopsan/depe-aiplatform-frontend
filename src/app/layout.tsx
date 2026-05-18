/* Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2026-04-20. */
import type { Metadata } from "next";
import { AppHeader } from "@/components/common/AppHeader";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "EPC PE AI-Platform",
  description: "EPC PE AI-Platform Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
