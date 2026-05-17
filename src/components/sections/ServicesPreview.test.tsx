import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ServicesPreview from "./ServicesPreview";
import { featuredServices } from "@/lib/services-data";

describe("<ServicesPreview />", () => {
  it("renders a section labelled with a heading", () => {
    render(<ServicesPreview />);
    expect(
      screen.getByRole("heading", { level: 2, name: /full-stack services/i })
    ).toBeInTheDocument();
  });

  it("renders one card per featured service", () => {
    render(<ServicesPreview />);
    for (const service of featuredServices) {
      expect(
        screen.getByRole("heading", { level: 3, name: service.title })
      ).toBeInTheDocument();
    }
  });

  it("links every card to its detail page", () => {
    render(<ServicesPreview />);
    for (const service of featuredServices) {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: service.title,
      });
      const link = heading.closest("a");
      expect(link, `card for ${service.slug} should be wrapped in a link`).not.toBeNull();
      expect(link).toHaveAttribute("href", `/services/${service.slug}`);
    }
  });

  it("renders all three highlights for each card", () => {
    render(<ServicesPreview />);
    for (const service of featuredServices) {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: service.title,
      });
      const card = heading.closest("a")!;
      for (const highlight of service.highlights) {
        expect(within(card).getByText(highlight)).toBeInTheDocument();
      }
    }
  });

  it("includes a 'View All Services' link to the services index", () => {
    render(<ServicesPreview />);
    const link = screen.getByRole("link", { name: /view all services/i });
    expect(link).toHaveAttribute("href", "/services");
  });

  it("surfaces the new MCP and Mobile services on the landing page", () => {
    render(<ServicesPreview />);
    expect(
      screen.getByRole("heading", { level: 3, name: /MCP/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Mobile Apps/ })
    ).toBeInTheDocument();
  });
});
