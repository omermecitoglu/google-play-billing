export type ItemDetails = {
  itemId: string,
  title: string,
  price: {
    currency: string,
    value: string,
  },
  type: "product" | "subscription",
  description: string,
  iconURLs: string[],
  subscriptionPeriod: "P1M" | "P1Y",
  freeTrialPeriod: string,
  introductoryPrice: {
    currency: string,
    value: string,
  },
  introductoryPricePeriod: string,
  introductoryPriceCycles: unknown, // [EnforceRange] unsigned long long introductoryPriceCycles;
};
