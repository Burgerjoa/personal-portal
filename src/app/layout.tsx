import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "정성우 | Personal Portal",
    template: "%s | 정성우",
  },
  description:
    "프론트엔드 개발자 정성우의 기술 블로그, 포트폴리오, 웹 유틸리티 도구를 한 곳에서.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://burgerjoa.vercel.app",
    siteName: "정성우 | Personal Portal",
    title: "정성우 | Personal Portal",
    description:
      "프론트엔드 개발자 정성우의 기술 블로그, 포트폴리오, 웹 유틸리티 도구를 한 곳에서.",
  },
  twitter: {
    card: "summary_large_image",
    title: "정성우 | Personal Portal",
    description:
      "프론트엔드 개발자 정성우의 기술 블로그, 포트폴리오, 웹 유틸리티 도구를 한 곳에서.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pt-16">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
