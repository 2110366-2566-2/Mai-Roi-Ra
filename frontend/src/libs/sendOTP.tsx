import { apiBackUrl } from "../constants";

export default async function sendOTP(
  email: string,
  user_id: string,
  token: string,
) {
  try {
    const jsonBody = JSON.stringify({
      email: email,
      user_id: user_id,
    });
    const response = await fetch(
      `http://localhost:8080/api/v1/users/send_otp_email`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonBody,
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to send OTP email: ${response.status} - ${
          errorData.message || "Unknown error"
        }`,
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error sending OTP email: ${error}`);
  }
}
