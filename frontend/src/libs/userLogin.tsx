import { apiBackUrl } from "../constants"

export default async function userLogin(userName: string, userPassword:string) {
    const response = await fetch(`${apiBackUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userName,
            password: userPassword
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to log in")
    }

    return await response.json()
}