import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ChartsMenuPrototypePage } from "./ChartsMenuPrototypePage";

function dialog() {
  return screen.getByRole("dialog", { name: /add charts to view/i });
}

/**
 * Integration-style tests: render real page tree, interact like a user.
 * (Still in-memory via jsdom — not a real browser like Playwright.)
 */
describe("ChartsMenuPrototypePage", () => {
  it("shows chart grid and add-charts dialog together", () => {
    render(<ChartsMenuPrototypePage />);

    expect(screen.getByLabelText(/study view charts/i)).toBeInTheDocument();
    expect(dialog()).toBeInTheDocument();
  });

  it("switches main tab to X vs Y", async () => {
    const user = userEvent.setup();
    render(<ChartsMenuPrototypePage />);

    const panel = dialog();
    await user.click(within(panel).getByRole("tab", { name: /^X vs Y$/i }));

    expect(within(panel).getByRole("tab", { name: /^X vs Y$/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("reflects selection count in footer", async () => {
    const user = userEvent.setup();
    render(<ChartsMenuPrototypePage />);

    const initial = within(dialog()).getByTestId("selection-count").textContent;
    expect(initial).toMatch(/\d+ chart/);

    const firstCheckbox = within(dialog()).getAllByRole("checkbox")[0];
    const wasChecked = (firstCheckbox as HTMLInputElement).checked;
    await user.click(firstCheckbox);
    expect((firstCheckbox as HTMLInputElement).checked).toBe(!wasChecked);
  });
});
