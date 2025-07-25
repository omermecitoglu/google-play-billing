import { describe, expect, it } from "vitest";
import { exampleFunction } from "./index";

describe("exampleFunction", () => {
  it("should be a function", () => {
    expect(typeof exampleFunction).toBe("function");
  });
});
