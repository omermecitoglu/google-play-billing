import type { ItemDetails } from "./item";
import type { PurchaseDetails } from "./purchase";

/**
 * Represents a digital goods service.
 */
export interface DigitalGoodsService {
  /**
   * URL of the service provider.
   */
  provider: string,
  /**
   * Retrieves the details of the specified items.
   */
  getDetails(itemIds: string[]): Promise<ItemDetails[]>,
  /**
   * Lists the purchases made by the user.
   */
  listPurchases(): Promise<PurchaseDetails[]>,
  /**
   * Lists the purchase history of the user.
   */
  listPurchaseHistory(): Promise<PurchaseDetails[]>,
  /**
   * Consumes a purchase, making it unavailable for future use.
   */
  consume(purchaseToken: string): Promise<void>,
}
