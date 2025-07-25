import { describe, expect, it, vi } from "vitest";
import type { DigitalGoodsService } from "~/types/service";
import { getDigitalGoodsService } from "./service";

declare global {
  interface Window {
    getDigitalGoodsService(serviceProvider: string): Promise<DigitalGoodsService>,
  }
}

describe("getDigitalGoodsService", () => {
  it("should throw an error when Digital Goods API is not supported", async () => {
    await expect(getDigitalGoodsService("https://play.google.com/billing"))
      .rejects.toThrow("Digital Goods API is not supported in this browser!");
  });

  it("should return null when unsupported payment method error occurs", async () => {
    global.window.getDigitalGoodsService = vi.fn().mockImplementation(() => {
      return new Promise(() => {
        throw new Error("unsupported payment method");
      });
    });
    const service = await getDigitalGoodsService("https://play.google.com/billing");
    expect(service).toBeNull();
    // @ts-expect-error: remove mock implementation
    delete global.window.getDigitalGoodsService;
  });

  it("should throw an error for other errors", async () => {
    global.window.getDigitalGoodsService = vi.fn().mockImplementation(() => {
      return new Promise(() => {
        throw new Error("unknown error");
      });
    });
    await expect(getDigitalGoodsService("https://play.google.com/billing"))
      .rejects.toThrow("unknown error");
    // @ts-expect-error: remove mock implementation
    delete global.window.getDigitalGoodsService;
  });
});
