import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';
import "./globals.css";
import { ThemeProvider } from "@/hooks/use-theme";
import { ExampleStateProvider } from './ExampleStateProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "默默学开发",
  description: "探索现代化 React 开发技术，包含丰富的示例代码和详细教程，帮助您掌握 React、Next.js 等前沿技术。",
  keywords: "React, Next.js, 前端开发, 示例代码, 教程",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '默默学开发',
              description: '探索现代化 React 开发技术，包含丰富的示例代码和详细教程。',
              url: 'https://www.silencelee.cn',
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ExampleStateProvider>
            <div className="portal-layout">
              <main>{children}</main>
            </div>
            <div className="text-center text-sm text-gray-500 mt-10"><a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备20014625号-1</a></div>
          </ExampleStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
