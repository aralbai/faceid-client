"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <div className="flex h-screen relative">
          {/* Sidebar */}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          {/* Content */}
          <div className="w-full lg:w-[85%] h-full overflow-y-auto bg-gray">
            <Navbar setSidebarOpen={setSidebarOpen} />
            {children}

            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 3000 }}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
