import type { Price } from "./price";

/**
 * Represents the details of a digital goods item.
 */
export type ItemDetails = {
  /**
   * The unique identifier for the item.
   */
  itemId: string,
  /**
   * The title of the item.
   */
  title: string,
  /**
   * The price of the item.
   */
  price: Price,
  /**
   * The type of the item.
   */
  type: "product" | "subscription",
  /**
   * The description of the item.
   */
  description: string,
  /**
   * The icon URLs for the item.
   */
  iconURLs: string[],
  /**
   * The subscription period for the item.
   */
  subscriptionPeriod: "P1M" | "P1Y",
  /**
   * The free trial period for the item.
   */
  freeTrialPeriod: string,
  /**
   * The introductory price for the item.
   */
  introductoryPrice: Price,
  /**
   * The introductory price period for the item.
   */
  introductoryPricePeriod: string,
  /**
   * The number of cycles for the introductory price.
   */
  introductoryPriceCycles: unknown, // [EnforceRange] unsigned long long introductoryPriceCycles;
};
