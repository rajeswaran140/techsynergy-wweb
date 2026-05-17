import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "./page";
import ServiceDetailPage, { generateStaticParams } from "./[slug]/page";
import { services } from "@/lib/services-data";

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("<ServicesPage /> (services index)", () => {
  it("renders one section per service", () => {
    render(<ServicesPage />);
    for (const service of services) {
      expect(
        screen.getByRole("heading", { level: 2, name: service.title })
      ).toBeInTheDocument();
    }
  });

  it("links each service to its detail page", () => {
    render(<ServicesPage />);
    for (const service of services) {
      const link = screen.getByRole("link", {
        name: new RegExp(`learn more about ${escapeRegex(service.title)}`, "i"),
      });
      expect(link).toHaveAttribute("href", `/services/${service.slug}`);
    }
  });

  it("anchors each service block by slug for in-page jumps", () => {
    const { container } = render(<ServicesPage />);
    for (const service of services) {
      expect(container.querySelector(`#${service.slug}`)).not.toBeNull();
    }
  });
});

describe("generateStaticParams (/services/[slug])", () => {
  it("emits a static param for every service", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(services.length);
    const slugs = params.map((p) => p.slug).sort();
    const expected = services.map((s) => s.slug).sort();
    expect(slugs).toEqual(expected);
  });

  it("includes the new MCP and Mobile slugs", async () => {
    const params = await generateStaticParams();
    const slugs = params.map((p) => p.slug);
    expect(slugs).toContain("ai-mcp-integration");
    expect(slugs).toContain("mobile-apps");
  });
});

describe("<ServiceDetailPage /> (/services/[slug])", () => {
  it("renders the MCP service detail page", async () => {
    const ui = await ServiceDetailPage({
      params: Promise.resolve({ slug: "ai-mcp-integration" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 1, name: /MCP/ })
    ).toBeInTheDocument();
    // "Model Context Protocol" appears in both the description and the
    // capability-tags list, so just assert that at least one node contains it.
    expect(screen.getAllByText(/Model Context Protocol/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { level: 2, name: /what we offer/i })
    ).toBeInTheDocument();
  });

  it("renders the Mobile Apps detail page with React Native capability tag", async () => {
    const ui = await ServiceDetailPage({
      params: Promise.resolve({ slug: "mobile-apps" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 1, name: /Mobile Apps/ })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/React Native/i).length).toBeGreaterThan(0);
  });

  it("calls notFound() for an unknown slug", async () => {
    // notFound() throws a special error in Next; we just assert it throws.
    await expect(
      ServiceDetailPage({
        params: Promise.resolve({ slug: "no-such-service" }),
      })
    ).rejects.toThrow();
  });
});
