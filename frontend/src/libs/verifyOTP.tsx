import { apiBackUrl } from "../constants";

export default async function verifyOTP(otp: string, user_id: string) {
  try {
    const jsonBody = JSON.stringify({
      otp: otp,
      user_id: user_id,
    });
    const response = await fetch(`${apiBackUrl}/users/verify_otp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Uncomment and use token if required
      },
      body: jsonBody,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to verify OTP: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error verify OTP: ${error}`);
  }
}
