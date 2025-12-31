import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Quiet Label",
  description: "Quiet Label deciphers the hidden language of product labels, providing AI-driven insights into ingredient impacts on your health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
