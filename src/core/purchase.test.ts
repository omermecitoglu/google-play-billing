import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPurchases, requestPayment } from "./purchase";

describe("getPurchases", () => {
  const service = {
    provider: "https://play.google.com/billing",
    getDetails: vi.fn(),
    listPurchases: vi.fn(),
    listPurchaseHistory: vi.fn(),
    consume: vi.fn(),
  };

  it("should call service.listPurchases", async () => {
    await getPurchases(service);
    expect(service.listPurchases).toBeCalled();
  });
});

describe("requestPayment", () => {
  const completeMock = vi.fn();

  const showMock = vi.fn().mockResolvedValue({
    details: {
      purchaseToken: "MOCK_PURCHASE_TOKEN",
    },
    complete: completeMock,
  });

  const consumeMock = vi.fn();

  const service = {
    provider: "https://play.google.com/billing",
    getDetails: vi.fn(),
    listPurchases: vi.fn(),
    listPurchaseHistory: vi.fn(),
    consume: consumeMock,
  };

  beforeEach(() => {
    vi.stubGlobal("PaymentRequest", vi.fn().mockImplementation((_methods, _details) => ({
      show: showMock,
    })));
  });

  it("should show the payment request and complete the payment successfully", async () => {
    const result = await requestPayment(service, "shiny_sword", true);

    expect(showMock).toBeCalled();
    expect(completeMock).toHaveBeenCalledWith("success");
    expect(result).toBe("SUCCESS");
    expect(consumeMock).toHaveBeenCalledWith("MOCK_PURCHASE_TOKEN");
  });

  it("should handle successful backend operation validation", async () => {
    const backendOperation = vi.fn().mockResolvedValue(true);
    const result = await requestPayment(service, "shiny_sword", true, backendOperation);

    expect(backendOperation).toBeCalledWith("MOCK_PURCHASE_TOKEN", "shiny_sword");
    expect(result).toBe("SUCCESS");
    expect(completeMock).toHaveBeenCalledWith("success");
    expect(consumeMock).toHaveBeenCalledWith("MOCK_PURCHASE_TOKEN");
  });

  it("should handle failed backend operation validation", async () => {
    const backendOperation = vi.fn().mockResolvedValue(false);
    const result = await requestPayment(service, "shiny_sword", false, backendOperation);

    expect(backendOperation).toBeCalledWith("MOCK_PURCHASE_TOKEN", "shiny_sword");
    expect(result).toBe("FAILED");
    expect(completeMock).toHaveBeenCalledWith("fail");
  });

  it("should handle user cancellation", async () => {
    showMock.mockRejectedValueOnce(new Error("Payment app returned RESULT_CANCELED code"));
    const result = await requestPayment(service, "shiny_sword", false);

    expect(result).toBe("CANCELED_BY_THE_USER");
  });

  it("should throw an error for unexpected issues", async () => {
    showMock.mockRejectedValueOnce(new Error("Unexpected error"));

    await expect(requestPayment(service, "shiny_sword", false)).rejects.toThrow("Unexpected error");
  });
});
