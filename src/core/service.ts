import type { DigitalGoodsService } from "~/types/service";

export async function getDigitalGoodsService(serviceProvider: string) {
  if (typeof window === "object" && "getDigitalGoodsService" in window && typeof window.getDigitalGoodsService === "function") {
    try {
      return await window.getDigitalGoodsService(serviceProvider) as DigitalGoodsService;
    } catch (error) {
      if (error && typeof error === "object" && "message" in error && error.message === "unsupported payment method") {
        return null;
      }
      throw error;
    }
  }
  throw new Error("Digital Goods API is not supported in this browser!");
}
