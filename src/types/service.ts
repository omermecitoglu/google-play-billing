import type { ItemDetails } from "./item";
import type { PurchaseDetails } from "./purchase";

export interface DigitalGoodsService {
  provider: string,
  getDetails(itemIds: string[]): Promise<ItemDetails[]>,
  listPurchases(): Promise<PurchaseDetails[]>,
  listPurchaseHistory(): Promise<PurchaseDetails[]>,
  consume(purchaseToken: string): Promise<void>,
}
