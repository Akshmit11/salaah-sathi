import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Suggest Solutions | Community-Driven Problem Solving",
    template: `%s | Suggest Solutions`,
  },
  openGraph: {
    description:
    "Join Suggest Solutions to upload problems and receive practical solutions from a helpful community. Empower yourself and others by sharing knowledge and expertise.",  
    images: ['https://shorturl.at/5FMDj', 'https://shorturl.at/P96J0', 'https://shorturl.at/cB9Bf', 'https://shorturl.at/rVFcR', 'https://utfs.io/f/409a78bd-af17-4c58-b2bb-93543218f5fd-t4bwmb.jpeg', 'https://utfs.io/f/db295597-f78c-4beb-a96c-5e74ef125ce5-t3s40y.jpeg', 'https://utfs.io/f/5e9689c8-ccb0-4e43-b21f-e37557c17abd-gqyb8g.20.33.jpeg', 'https://utfs.io/f/ea8a50f1-e0a2-44be-bc0c-b729224ef6ac-gqyb8g.20.32.jpeg'],
  },
  keywords: [
    "problem solving",
    "community solutions",
    "advice",
    "help",
    "support",
    "practical solutions",
    "suggest solutions",
    "crowdsource solutions",
    "Health",
    "Career",
    "Technology",
    "Personal Finance",
    "Legal",
    "Housing",
    "Transportation",
    "Environment",
    "Social Issues",
    "Government Services",
    "Consumer Rights",
    "Relationships",
    "Personal Development",
    "suggest solutions",
  ],
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
        <body className={`${inter.className} bg-primary-50`}>{children}</body>

        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager gtmId="AW-372101184" />
        )}
      </html>
    </ClerkProvider>
  );
}
