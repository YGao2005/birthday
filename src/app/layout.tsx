// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { GlobalCursorProvider } from "@/components/ui/global-cursor";
import CurveTransition from "@/components/ui/curve-transition";
import { BackButton } from "@/components/gallery/back-button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "A beautiful photo gallery with smooth transitions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <GlobalCursorProvider>
          <CurveTransition>
            {children}
          </CurveTransition>
        </GlobalCursorProvider>
      </body>
    </html>
  );
}