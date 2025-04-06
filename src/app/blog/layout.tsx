import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NyxSpectra - Blog",
  description: "Explore the latest insights and trends in healthcare AI technology",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 