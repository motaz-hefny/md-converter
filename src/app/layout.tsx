import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://md.moteklab.com"),
  title: {
    default: "MD Converter | Free Markdown \u2194 RichText Converter",
    template: "%s | MD Converter",
  },
  description:
    "Free, private, and fast bidirectional Markdown to RichText converter. Convert MD to HTML, Word, PDF. No data stored, 100% client-side processing. Supports GitHub Flavored Markdown.",
  keywords: [
    "Markdown converter",
    "RichText converter",
    "MD to HTML",
    "Markdown to Word",
    "Markdown to PDF",
    "GitHub Flavored Markdown",
    "GFM converter",
    "private markdown tool",
    "client-side converter",
    "free markdown editor",
    "bidirectional converter",
    "markdown preview",
    "rich text editor",
  ],
  authors: [{ name: "MotekLab", url: "https://www.moteklab.com" }],
  creator: "MotekLab",
  publisher: "MotekLab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://md.moteklab.com",
    title: "MD Converter | Free Markdown \u2194 RichText Converter",
    description:
      "Convert Markdown to RichText and vice versa. Free, private, no data stored. Supports GFM, exports to HTML/Word/PDF.",
    siteName: "MD Converter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MD Converter - Free Markdown to RichText Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Converter | Free Markdown \u2194 RichText Converter",
    description:
      "Free, private Markdown converter. No data stored, 100% client-side.",
    images: ["/og-image.png"],
    creator: "@moteklab",
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
  alternates: {
    canonical: "https://md.moteklab.com",
    languages: {
      "en": "https://md.moteklab.com",
      "ar": "https://md.moteklab.com/ar",
      "ar-EG": "https://md.moteklab.com/ar-eg",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MD Converter",
  url: "https://md.moteklab.com",
  description:
    "Free bidirectional Markdown to RichText converter. Private, client-side processing.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "MotekLab",
    url: "https://www.moteklab.com",
  },
  featureList: [
    "Bidirectional Markdown \u2194 RichText conversion",
    "GitHub Flavored Markdown support",
    "Export to HTML, Word, PDF",
    "100% client-side processing",
    "No data storage",
    "Privacy-first design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Google AdSense - Uncomment when ready */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-grain min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
