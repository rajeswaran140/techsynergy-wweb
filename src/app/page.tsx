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
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ProductsPreview />
      <CTA />
    </>
  );
}
