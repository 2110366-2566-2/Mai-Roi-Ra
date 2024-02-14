import { apiBackUrl } from "../constants"

const isValidEmail = (email: string):boolean => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
};

export default async function userLogin(username: string, password:string) {
    console.log(username,password)
    
    const response = await fetch(`${apiBackUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: isValidEmail(username) ? username : null,
            phonenumber: (username.length === 10 && username[0] === '0') ? username : null,
            password: password
        }),
    })
    if (!response.ok) {
        throw new Error("Failed to log in")
    }

    console.log(response.json());

    return await response.json()
}