import { describe, it, expect } from "vitest";
import {
  products,
  enabledProducts,
  featuredProducts,
  getProductBySlug,
} from "./products-data";

describe("products-data", () => {
  it("exports at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has slugs in kebab-case", () => {
    for (const product of products) {
      expect(product.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("populates every required field", () => {
    for (const product of products) {
      expect(product.slug, `slug for ${product.name}`).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.tagline).toBeTruthy();
      expect(product.shortDescription.length).toBeLessThanOrEqual(200);
      expect(product.description.length).toBeGreaterThanOrEqual(40);
      expect(product.color).toMatch(/^from-[\w-]+ to-[\w-]+$/);
      expect(typeof product.enabled).toBe("boolean");
      expect(typeof product.featured).toBe("boolean");
    }
  });

  it("requires href on enabled, non-comingSoon products", () => {
    for (const product of products) {
      if (product.enabled && !product.comingSoon) {
        expect(product.href, `href for ${product.slug}`).toMatch(/^https?:\/\//);
      }
    }
  });

  it("never marks a product both featured and disabled", () => {
    for (const product of products) {
      if (product.featured) {
        expect(product.enabled).toBe(true);
      }
    }
  });

  it("filters enabledProducts correctly", () => {
    expect(enabledProducts.every((p) => p.enabled)).toBe(true);
    expect(enabledProducts.length).toBeLessThanOrEqual(products.length);
  });

  it("filters featuredProducts to enabled + featured only", () => {
    expect(featuredProducts.every((p) => p.enabled && p.featured)).toBe(true);
    expect(featuredProducts.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });

  it("finds known products by slug", () => {
    expect(getProductBySlug("crowvault-ai")?.name).toBe("Crowvault.ai");
    expect(getProductBySlug("mobily-ca")?.name).toBe("Mobily.ca");
  });

  it("keeps Talky off the landing preview but visible on /portfolio", () => {
    const talky = getProductBySlug("talky-ca");
    expect(talky).toBeDefined();
    expect(talky?.enabled).toBe(true);
    expect(talky?.featured).toBe(false);
  });

  it("hides in-progress products (TalkyMobile / WebCore / SeoSync) everywhere", () => {
    for (const slug of ["talkymobile-ca", "webcore-ca", "seosync-ca"]) {
      const p = getProductBySlug(slug);
      expect(p, slug).toBeDefined();
      expect(p?.enabled, `${slug} should be hidden`).toBe(false);
    }
  });
});
