import type { DigitalGoodsService } from "~/types/service";

/**
 * Retrieves the list of purchases from the digital goods service.
 *
 * @param service - The digital goods service instance.
 * @returns Array of purchase details.
 */
export function getPurchases(service: DigitalGoodsService) {
  return service.listPurchases();
}

/**
 * Initiates a payment request for a digital goods item and handles purchase completion.
 *
 * @param service - The digital goods service instance.
 * @param itemId - The ID of the item to purchase.
 * @param consume - Whether to consume the purchase after completion.
 * @param backendOperation - Optional backend operation to validate the purchase.
 * @returns Payment result: "SUCCESS", "FAILED", or "CANCELED_BY_THE_USER".
 */
export async function requestPayment(
  service: DigitalGoodsService,
  itemId: string,
  consume: boolean,
  backendOperation?: (purchaseToken: string, itemId: string) => Promise<boolean>,
) {
  const paymentMethods: PaymentMethodData[] = [{
    supportedMethods: service.provider,
    data: {
      sku: itemId,
    },
  }];
  const paymentDetails: PaymentDetailsInit = {
    total: {
      label: "Total",
      amount: { currency: "USD", value: "0" },
    },
  };
  try {
    const request = new PaymentRequest(paymentMethods, paymentDetails);
    const paymentResponse = await request.show();
    const { purchaseToken } = paymentResponse.details as {
      purchaseToken: string,
    };

    if (backendOperation) {
      const isValid = await backendOperation(purchaseToken, itemId);
      if (isValid) {
        await paymentResponse.complete("success");
        if (consume) await service.consume(purchaseToken);
        return "SUCCESS";
      } else {
        await paymentResponse.complete("fail");
      }
      return "FAILED";
    } else {
      await paymentResponse.complete("success");
      if (consume) await service.consume(purchaseToken);
      return "SUCCESS";
    }
  } catch (error) {
    if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      if (error.message.startsWith("Payment app returned RESULT_CANCELED code")) {
        return "CANCELED_BY_THE_USER";
      }
    }
    throw error;
  }
}
