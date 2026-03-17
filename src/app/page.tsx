import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview")
);
const ProductsPreview = dynamic(
  () => import("@/components/sections/ProductsPreview")
);
const CTA = dynamic(() => import("@/components/sections/CTA"));

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
