import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BackToTop from "@/components/ui/BackToTop";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechSynergy | Software Development & Web Solutions",
    template: "%s | TechSynergy",
  },
  description:
    "TechSynergy delivers cutting-edge software development, web development, cloud solutions, and digital transformation services for businesses worldwide.",
  keywords: [
    "software development",
    "web development",
    "cloud solutions",
    "digital transformation",
    "UI/UX design",
    "mobile app development",
  ],
  openGraph: {
    title: "TechSynergy | Software Development & Web Solutions",
    description:
      "End-to-end software development services that empower businesses to scale, innovate, and lead in the digital age.",
    type: "website",
    locale: "en_US",
    siteName: "TechSynergy",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSynergy | Software Development & Web Solutions",
    description:
      "End-to-end software development services that empower businesses to scale, innovate, and lead in the digital age.",
  },
  icons: {
    icon: "/icon.svg",
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://techsynergy.ca"),
  verification: {
    google: "G-EYSYQF5TMF",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59JW926T');`}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EYSYQF5TMF"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-EYSYQF5TMF', {
  page_path: window.location.pathname,
});`}
        </Script>
      </head>
      <body
        className={`${poppins.variable} antialiased font-(family-name:--font-poppins)`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59JW926T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
