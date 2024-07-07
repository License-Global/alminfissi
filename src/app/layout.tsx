import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/nav/Footer";
import Sidebar from "@/components/nav/Sidebar";
import { GlobalProvider } from "@/components/Context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alminfissi",
  description: "Developed by Dennis Badagliacca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="root" lang="en">
      <GlobalProvider>
        <body className={inter.className}><div className="flex flex-col min-h-screen"><Sidebar />{children}<Footer /></div></body>
      </GlobalProvider>
    </html>
  );
}
