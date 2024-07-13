import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-[100dvh] w-full flex-col justify-between bg-primary">
        <header>
          <Navbar/>
        </header>
        {children}
        <footer>
          <div className="flex flex-row h-8 bg-secondary text-black items-center justify-center">
              <p className="flex text-sm font-semibold gap-1">© Out of passion by, <a href="https://helper-api-vignu.el.r.appspot.com/redirect_links/redirect/6691475f7d0ad6b43299e5b9" target="_blank" className="flex">Vignaraj D</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
