import { describe, it, expect } from "vitest";
import {
  services,
  featuredServices,
  getServiceBySlug,
} from "./services-data";

describe("services-data", () => {
  it("exports at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has slugs in kebab-case", () => {
    for (const service of services) {
      expect(service.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("populates every required field on every service", () => {
    for (const service of services) {
      expect(service.slug, `slug for ${service.title}`).toBeTruthy();
      expect(service.title, `title for ${service.slug}`).toBeTruthy();
      expect(service.description.length).toBeGreaterThanOrEqual(40);
      expect(service.shortDescription.length).toBeLessThanOrEqual(160);
      expect(service.features.length).toBeGreaterThanOrEqual(4);
      expect(service.highlights.length).toBe(3);
      expect(service.technologies.length).toBeGreaterThanOrEqual(4);
      expect(typeof service.icon).toBe("function");
      expect(service.color).toMatch(/^from-[\w-]+ to-[\w-]+$/);
    }
  });

  it("includes the new AI & MCP Integration service", () => {
    const mcp = getServiceBySlug("ai-mcp-integration");
    expect(mcp).toBeDefined();
    expect(mcp?.title).toMatch(/MCP/);
    expect(mcp?.featured).toBe(true);
    expect(mcp?.highlights.join(" ")).toMatch(/MCP/i);
  });

  it("includes the new Mobile Apps service", () => {
    const mobile = getServiceBySlug("mobile-apps");
    expect(mobile).toBeDefined();
    expect(mobile?.title).toMatch(/Mobile/);
    expect(mobile?.featured).toBe(true);
    expect(mobile?.technologies.some((t) => /react native|expo/i.test(t))).toBe(
      true
    );
  });

  it("renames cloud infrastructure to surface data residency", () => {
    const cloud = getServiceBySlug("cloud-data-residency");
    expect(cloud).toBeDefined();
    expect(cloud?.title.toLowerCase()).toContain("canadian");
    // The old slug should no longer resolve.
    expect(getServiceBySlug("cloud-infrastructure")).toBeUndefined();
  });

  it("returns undefined for unknown slugs", () => {
    expect(getServiceBySlug("does-not-exist")).toBeUndefined();
    expect(getServiceBySlug("")).toBeUndefined();
  });

  it("filters featuredServices to only featured entries", () => {
    expect(featuredServices.length).toBeGreaterThan(0);
    expect(featuredServices.every((s) => s.featured)).toBe(true);
    expect(featuredServices.length).toBeLessThanOrEqual(services.length);
  });

  it("features both new services on the landing preview", () => {
    const featuredSlugs = featuredServices.map((s) => s.slug);
    expect(featuredSlugs).toContain("ai-mcp-integration");
    expect(featuredSlugs).toContain("mobile-apps");
  });
});
