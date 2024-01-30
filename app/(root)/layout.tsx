import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graph Genius",
  description: "A genius applications to make graphs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html data-theme="light" lang='en'>
        <body className={inter.className}>
          <Topbar />
          <LeftSidebar />

          <main className='absolute left-60 ml-5 bottom-0 right-5 top-20 mt-5'>
              {children}
            {/* @ts-ignore */}
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}