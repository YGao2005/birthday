// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { GlobalCursorProvider } from "@/components/ui/global-cursor";
import CurveTransition from "@/components/ui/curve-transition";
import "@/styles/globals.css";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
    >
      <GlobalCursorProvider>
        <CurveTransition>
          <Component {...pageProps} />
        </CurveTransition>
      </GlobalCursorProvider>
    </div>
  );
} 