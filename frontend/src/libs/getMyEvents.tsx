import { apiBackUrl } from "../constants";

export default async function getMyEvents(id:string){
    const response = await fetch(`${apiBackUrl}/events?organizer_id=${id}`, {
		method: 'GET',
		next: {tags: ['events']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch events');
	}
    console.log(`success`);
	return await response.json()
}