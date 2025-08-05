import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { getAllContent } from "@/lib/content-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhiram N J - Developer & Creator",
  description: "Personal portfolio of Abhiram N J - thoughts, projects, talks, and more.",
  keywords: ["developer", "portfolio", "blog", "projects", "talks"],
  authors: [{ name: "Abhiram N J" }],
  creator: "Abhiram N J",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhiramnj.com",
    title: "Abhiram N J - Developer & Creator",
    description: "Personal portfolio of Abhiram N J - thoughts, projects, talks, and more.",
    siteName: "Abhiram N J",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiram N J - Developer & Creator",
    description: "Personal portfolio of Abhiram N J - thoughts, projects, talks, and more.",
    creator: "@TwilightyAbhi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allContent = getAllContent();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-neutral-950">
            <Navigation allContent={allContent} />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
