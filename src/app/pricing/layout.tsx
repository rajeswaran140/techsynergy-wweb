import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for software development, cloud infrastructure, and API integration services. Contact TechSynergy for a custom quote.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | TechSynergy",
    description:
      "Transparent pricing for Canadian software development services. Get a custom quote today.",
    url: "https://techsynergy.ca/pricing",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | TechSynergy",
    description: "Transparent pricing for software development services.",
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
