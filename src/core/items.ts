import type { DigitalGoodsService } from "~/types/service";

/**
 * Retrieves details for the specified digital goods items using the provided service.
 *
 * @param service - The digital goods service instance.
 * @param itemIds - Array of item IDs to fetch details for.
 * @returns Array of item details, or an empty array if client app is unavailable.
 */
export async function getDigitalGoods(service: DigitalGoodsService, itemIds: string[]) {
  try {
    return await service.getDetails(itemIds);
  } catch (error) {
    if (error && typeof error === "object" && "message" in error && error.message === "clientAppUnavailable") {
      return [];
    }
    throw error;
  }
}
