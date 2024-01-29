import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
const rubik = Rubik({
  subsets: ["latin"],
  display: "auto",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tasking",
  description: "Task management for personal use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      </head>
      <body className={`${rubik.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
