import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AdSense from "@/components/adsense";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "日常小工具",
  description: "一个生活中常用的小工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <div>{children}</div>
        </AntdRegistry>
      </body>
    </html>
  );
}
