import { apiBackUrl } from "../constants";

export default async function uploadProfileImage(formData:FormData,token:string) {
    try {
        console.log(formData);
        
        const response = await fetch(`http://localhost:8080/api/v1/users/upload/${formData.get("user_id")}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to uplaod profile image: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Upload Profile Image");
        return await response.json();

    } catch (error) {
        throw new Error(`Error upload profile image: ${error}`);
    }
}
