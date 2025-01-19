import type { Metadata } from "next";
import { Nunito, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/SideBar/Sidebar";
import Header from "@/components/layout/Header";
import "remixicon/fonts/remixicon.css";
import StoreProvider from "./StoreProvider";

const nunitoFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Task Manager",
  description: "Manage tasks with kanban board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoFont.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-grow">
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
