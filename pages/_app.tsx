import "@/styles/tailwind.css";
import type { AppProps } from "next/app";
import { Inter, Rubik } from "@next/font/google";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rubikFont = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${interFont.variable} ${rubikFont.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
