import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-[family-name:var(--font-poppins)]`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
