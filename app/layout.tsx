import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Suggest Solutions | Community-Driven Problem Solving",
    template: `%s | Suggest Solutions`
  },
  description: "Join Suggest Solutions to upload problems and receive practical solutions from a helpful community. Empower yourself and others by sharing knowledge and expertise.",
  keywords: ["problem solving", "community solutions", "advice", "help", "support", "practical solutions", "suggest solutions", "crowdsource solutions", "Health", "Career", "Technology", "Personal Finance", "Legal", "Housing", "Transportation", "Environment", "Social Issues", "Government Services", "Consumer Rights", "Relationships", "Personal Development", "suggest solutions"],
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
        <GoogleTagManager gtmId="AW-372101184" />
      </html>
    </ClerkProvider>
  );
}
