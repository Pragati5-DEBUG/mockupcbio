import { describe, expect, it } from "vitest";
import { bandSort, cohortWord } from "./mockData";

/** Unit tests: pure helpers, no React / browser UI. */
describe("cohortWord", () => {
  it("returns em dash for null", () => {
    expect(cohortWord(null)).toBe("—");
  });

  it("maps coverage bands to labels", () => {
    expect(cohortWord(95)).toBe("Strong");
    expect(cohortWord(70)).toBe("Moderate");
    expect(cohortWord(30)).toBe("Sparse");
  });
});

describe("bandSort", () => {
  it("orders bands consistently", () => {
    expect(bandSort("common")).toBeLessThan(bandSort("demographic"));
    expect(bandSort("demographic")).toBeLessThan(bandSort("genomic"));
  });
});
