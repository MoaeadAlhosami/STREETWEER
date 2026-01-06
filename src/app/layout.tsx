import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "STREETWEER | Elevated Minimalism",
  description:
    "International standard clothing ecommerce. Built with Next.js, Tailwind, Zustand, and React Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <body
        className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-black selection:text-white"
      >
        <Providers>
          <Header />
          <main className="flex-1 pt-32 md:pt-40">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
