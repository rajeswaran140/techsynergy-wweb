import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Engage — Pricing & Engagement Models | TechSynergy",
  description:
    "Three engagement models (project, retainer, hourly), example budget ranges by service, and our scoping process — so Canadian businesses know what to expect before the first call.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "How We Engage | TechSynergy",
    description:
      "Project, retainer, and hourly engagement models with example budget ranges for Canadian software work.",
    url: "https://techsynergy.ca/pricing",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy engagement models and pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Engage | TechSynergy",
    description:
      "Engagement models and example budget ranges for Canadian software work.",
    images: ["/og-default.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
