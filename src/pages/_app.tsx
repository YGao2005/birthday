// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { GlobalCursorProvider } from "@/components/ui/global-cursor";
import { AnimatePresence } from "motion/react";
import "@/styles/globals.css";
import "@/styles/gallery.css";
import "@/styles/gallery/[category]/gallery-category.css";
import "@/components/ui/curve-transition.css";

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

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
    >
      <GlobalCursorProvider>
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </GlobalCursorProvider>
    </div>
  );
}