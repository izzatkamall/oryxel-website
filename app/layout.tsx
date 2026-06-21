import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oryxel — Boutique Tech Studio",
  description:
    "Oryxel is a boutique technology studio building web, mobile, AI, design and SaaS products for ambitious teams.",
  metadataBase: new URL("https://oryxel.com"),
  openGraph: {
    title: "Oryxel — Boutique Tech Studio",
    description:
      "We engineer digital products worth obsessing over. Web · Mobile · AI · Design · SaaS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} cursor-none-desktop`}
    >
      <body>
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
