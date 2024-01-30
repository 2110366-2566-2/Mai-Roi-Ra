import { apiBackUrl } from "../constants";

export default async function createCampground(
    name: string,
    address: string,
    district: string,
    province: string,
    postalCode: string,
    tel: string,
    picture: string,
    token: string
) {
    try {
        console.log(name, address, district, province, postalCode, tel, picture, token)
        const jsonBody = JSON.stringify({
            "name": name,
            "address": address,
            "district": district,
            "province": province,
            "postalcode": postalCode,
            "tel": tel,
            "picture": picture,
        })
        const response = await fetch(`${apiBackUrl}/campgrounds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: jsonBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create campground: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error creating campground: ${error}`);
    }
}
