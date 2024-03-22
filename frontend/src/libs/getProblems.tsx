import { apiBackUrl } from "../constants";

export default async function getProblems(){
    const response = await fetch(`${apiBackUrl}/problems`, {
		method: 'GET',
		next: {tags: ['problems']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch events');
	}
    console.log("success");
	return await response.json()
}