import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/link → plain <a> for unit tests so we can assert href/text directly.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Anchor = "a" as any;
    return (
      <Anchor href={href} {...rest}>
        {children}
      </Anchor>
    );
  },
}));
