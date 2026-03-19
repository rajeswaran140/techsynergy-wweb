import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";

const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview")
);
const ProductsPreview = dynamic(
  () => import("@/components/sections/ProductsPreview")
);
const CTA = dynamic(() => import("@/components/sections/CTA"));

export const metadata: Metadata = {
  title: "TechSynergy | Privacy-First SaaS Development in Canada",
  description: "Canadian software company with 25+ years experience building privacy-first SaaS products. Full-stack development, cloud infrastructure, and API integrations. PIPEDA compliant. Serving customers in 150+ countries.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TechSynergy | Privacy-First SaaS Development",
    description: "25+ years building Canadian-hosted SaaS products including TalkyMobile, WebCore, Mobily, and SeoSync. PIPEDA compliant from day one.",
    url: "https://techsynergy.ca",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TechSynergy - Canadian Software Development Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechSynergy | Privacy-First SaaS Development",
    description: "Canadian software company building privacy-first SaaS products. 25+ years experience.",
    images: ["/og-default.png"],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TechSynergy Corp",
    url: "https://techsynergy.ca",
    logo: "https://techsynergy.ca/logo-light.svg",
    description:
      "Canadian software development company building privacy-first SaaS products and cloud infrastructure solutions.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Markham",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Raj",
    },
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    knowsAbout: [
      "Software Development",
      "Cloud Infrastructure",
      "SaaS Products",
      "Web Development",
      "Mobile App Development",
      "API Integration",
      "Managed WordPress Hosting",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <ServicesPreview />
      <ProductsPreview />
      <CTA />
    </>
  );
}
