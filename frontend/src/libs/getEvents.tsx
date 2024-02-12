import { apiBackUrl } from "../constants";

export default async function getCampgrounds(){
    const response = await fetch(`${apiBackUrl}/events`, {next: {tags: [`events`]}});
    
    if (!response.ok){
        throw new Error("Failed To Fetch Events Info")
    }

    return await response.json();
}