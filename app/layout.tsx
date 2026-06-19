import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import AuthInitializer from "@/components/AuthInitializer";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ShareSidebar from "@/components/ShareSidebar";
import CartAddedModal from "@/components/CartAddedModal";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://farmpedia.vercel.app"),
  title: {
    template: "%s | GoFarmpedia - Agricultural E-Commerce",
    default: "GoFarmpedia - Fresh Fruits, Vegetables & Livestock",
  },
  description:
    "Discover fresh agricultural products at GoFarmpedia. Shop high-quality fruits, vegetables, and livestock products like eggs, milk, fish, chicken, beef, and goat meat directly from farmers.",
  keywords: [
    "online shopping",
    "e-commerce",
    "buy online",
    "shop online",
    "electronics",
    "fashion",
    "home goods",
    "deals",
    "discounts",
    "gofarmpedia",
    "agricultural ecommerce",
    "fresh fruits",
    "vegetables",
    "livestock",
    "farm products",
    "buy online",
  ],
  authors: [{ name: "GoFarmpedia" }],
  creator: "GoFarmpedia",
  publisher: "GoFarmpedia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farmpedia.vercel.app",
    siteName: "GoFarmpedia",
    title: "GoFarmpedia - Fresh Agricultural Products",
    description:
      "Shop high-quality fruits, vegetables, and livestock products like eggs, milk, and meat directly from farmers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoFarmpedia Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoFarmpedia - Fresh Agricultural Products",
    description:
      "Shop high-quality fruits, vegetables, and livestock products directly from farmers.",
    images: ["/og-image.jpg"],
    creator: "@gofarmpedia",
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
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
  alternates: {
    canonical: "https://farmpedia.vercel.app",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased`}>
        <AuthInitializer />
        <AnalyticsProvider />
        <ShareSidebar />
        {children}
        <CartAddedModal />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            },
            className: "sonner-toast",
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
