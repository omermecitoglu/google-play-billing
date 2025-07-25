import type { Price } from "./price";

export type ItemDetails = {
  itemId: string,
  title: string,
  price: Price,
  type: "product" | "subscription",
  description: string,
  iconURLs: string[],
  subscriptionPeriod: "P1M" | "P1Y",
  freeTrialPeriod: string,
  introductoryPrice: Price,
  introductoryPricePeriod: string,
  introductoryPriceCycles: unknown, // [EnforceRange] unsigned long long introductoryPriceCycles;
};
