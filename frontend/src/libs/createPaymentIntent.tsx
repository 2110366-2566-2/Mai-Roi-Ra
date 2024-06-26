import { apiBackUrl } from "../constants";

export default async function createPaymentIntent(
  transaction_amount: number,
  user_id: string,
  event_id: string,
  payment_type: number,
  token: string,
) {
  try {
    const jsonBody = JSON.stringify({
      transaction_amount: transaction_amount,
      user_id: user_id,
      event_id: event_id,
      payment_type: payment_type,
    });
    const response = await fetch(
      `http://localhost:8080/api/v1/transactions/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["createPaymentIntent"] },
        body: jsonBody,
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create payment intent: ${response.status} - ${errorData.message || "Unknown error"}`,
      );
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to create payment intent: ${error}`);
  }
}
