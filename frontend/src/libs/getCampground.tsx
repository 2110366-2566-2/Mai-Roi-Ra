import { apiBackUrl } from "../constants";

export default async function getCampground(id:string){
    const response = await fetch(`${apiBackUrl}/campgrounds/${id}`, {next: {tags: [`campground/${id}`]}});
    
    if (!response.ok){
        throw new Error("Failed To Fetch Campground Info")
    }

    return await response.json();
}