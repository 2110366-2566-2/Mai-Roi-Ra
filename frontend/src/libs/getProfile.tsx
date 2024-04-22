import { apiBackUrl } from "../constants";

export default async function getProfile(id: string, token: string) {
  const response = await fetch(`${apiBackUrl}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["profile"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const profile = await response.json();

  const formattedProfile = {
    user_id: profile.UserID,
    username: profile.Username,
    phone_number: profile.PhoneNumber,
    email: profile.Email,
    first_name: profile.FirstName,
    last_name: profile.LastName,
    address: profile.Address,
    district: profile.District,
    province: profile.Province,
    birth_date: profile.BirthDate,
    role: profile.Role,
    registerType: profile.RegisterType,
    isVerified: profile.IsVerified,
    createdAt: profile.CreatedAt,
    updatedAt: profile.UpdatedAt,
    is_enable_notification: profile.IsEnebaleNotification,
    user_image: profile.UserImage,
  };

  return formattedProfile;
}
