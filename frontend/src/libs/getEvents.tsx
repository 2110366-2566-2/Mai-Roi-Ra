import { apiBackUrl } from "../constants";

export default async function getEvents(){
    const response = await fetch(`${apiBackUrl}/events`, {
		method: 'GET',
		next: {tags: ['events']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch events');
	}
    console.log("success");
	return await response.json()
}