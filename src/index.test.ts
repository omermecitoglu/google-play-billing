import { describe, expect, it } from "vitest";
import { getDigitalGoodsService } from "./index";

describe("getDigitalGoodsService", () => {
  it("should be a function", () => {
    expect(typeof getDigitalGoodsService).toBe("function");
  });
});
