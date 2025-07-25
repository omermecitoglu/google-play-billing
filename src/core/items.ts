import type { DigitalGoodsService } from "~/types/service";

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
