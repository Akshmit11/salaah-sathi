import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suggest Solutions | Community-Driven Problem Solving",
  description: "Join Suggest Solutions to upload problems and receive practical solutions from a helpful community. Empower yourself and others by sharing knowledge and expertise.",
  keywords: "problem solving, community solutions, advice, help, support, practical solutions, suggest solutions, crowdsource solutions",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {process.env.NODE_ENV === "production" && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8181574493921236"
              crossOrigin="anonymous"
            ></script>
          )}
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
