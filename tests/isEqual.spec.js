import { isEqual } from "../src/isEqual";

describe("isEqual", () => {
  it("returns true for two identical arrays", () => {
    expect(isEqual([3, 3], [3, 3])).toBe(true);
  });

  it("returns false when values differ", () => {
    expect(isEqual([3, 3], [3, 4])).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(isEqual([3, 3], [3, 3, 3])).toBe(false);
  });

  it("returns true for two empty arrays", () => {
    expect(isEqual([], [])).toBe(true);
  });

  it("returns false for empty vs non-empty array", () => {
    expect(isEqual([], [0])).toBe(false);
  });

  it("returns true for single-element arrays with equal values", () => {
    expect(isEqual([7], [7])).toBe(true);
  });

  it("returns false for single-element arrays with different values", () => {
    expect(isEqual([0], [1])).toBe(false);
  });
});
