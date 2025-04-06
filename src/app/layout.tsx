import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import AnalyticsTracker from "../components/AnalyticsTracker";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NyxSpectra - AI-Powered Healthcare Solutions",
  description: "Empowering healthcare professionals with cutting-edge AI tools for improved patient care and operational efficiency",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nyxspectra.com'),
  openGraph: {
    title: "NyxSpectra - AI-Powered Healthcare Solutions",
    description: "Empowering healthcare professionals with cutting-edge AI tools for improved patient care",
    images: ['/Images/og-image.jpg'],
    type: 'website',
    locale: 'en_US',
    siteName: 'NyxSpectra',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NyxSpectra - AI-Powered Healthcare Solutions",
    description: "Empowering healthcare professionals with cutting-edge AI tools",
    images: ['/Images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClient = typeof window !== "undefined";

  return (
    <html lang="en" className={twMerge("relative", isClient ? "hydrated" : "")}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={twMerge(dmSans.className, "bg-[#EAEEFE]")}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
