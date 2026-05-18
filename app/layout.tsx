import type { Metadata } from "next";
import { Geist, Geist_Mono, Padauk } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const padauk = Padauk({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-padauk",
})

export const metadata: Metadata = {
  title: "Spare Parts Inventory Management System ",
  description: "Spare Parts Inventory Management System (Myanmar)",
  keywords: ["inventory", "spare parts", "myanmar", "အပိုပစ္စည်း"],
  icons: {
    icon: "/naya-logo.jpg",
    shortcut: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} ${padauk.variable} h-ful antialiased`}
    >
      <body className="font-padauk min-h-full flex flex-col">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
