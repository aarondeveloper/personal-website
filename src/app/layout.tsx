import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AmbientSoundProvider } from "./contexts/AmbientSoundContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaron's Portfolio | Full Stack Developer",
  description: "Personal portfolio showcasing my projects and skills in web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-900`}
      >
        <AmbientSoundProvider>
          <Navbar />
          {children}
        </AmbientSoundProvider>
      </body>
    </html>
  );
}
