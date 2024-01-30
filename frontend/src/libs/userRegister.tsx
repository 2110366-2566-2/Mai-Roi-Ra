import { apiBackUrl } from "../constants"

export default async function userRegister(userName: string, userEmail: string, userTel: string, userPassword:string) {
    const response = await fetch(`${apiBackUrl}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            tel: userTel,
            password: userPassword
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to register")
    }

    return await response.json()
}