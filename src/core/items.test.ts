import { describe, expect, it } from "vitest";
import type { DigitalGoodsService } from "~/types/service";
import { getDigitalGoods } from "./items";

describe("getDigitalGoods", () => {
  it("should return an empty array when clientAppUnavailable error occurs", async () => {
    const service = {
      getDetails: () => Promise.reject(new Error("clientAppUnavailable")),
    } as unknown as DigitalGoodsService;
    const result = await getDigitalGoods(service, ["item1", "item2"]);
    expect(result).toStrictEqual([]);
  });

  it("should throw an error for other errors", async () => {
    const service = {
      getDetails: () => Promise.reject(new Error("unknown error")),
    } as unknown as DigitalGoodsService;
    await expect(getDigitalGoods(service, ["item1", "item2"]))
      .rejects.toThrow("unknown error");
  });
});
