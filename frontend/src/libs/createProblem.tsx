import { apiBackUrl } from "../constants";

export default async function createProblem(
    user_id: string,
    problem: string,
    description: string,
   

) {
    try {
        console.log(user_id, problem,description);
        const jsonBody = JSON.stringify({
            "description": description,
            "problem": problem,
            "user_id": user_id,
           
        });

        console.log(jsonBody);

        const response = await fetch(`${apiBackUrl}/problems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`
            },
            body: jsonBody,
        });

        console.log(jsonBody);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Failed to create problem: ${response.status} - ${errorData.message || "Unknown error"}`
            );
        } console.log("Success To Create Problem");
        return await response.json();

    } catch (error) {
        throw new Error(`Error creating problem: ${error}`);
    }
}
