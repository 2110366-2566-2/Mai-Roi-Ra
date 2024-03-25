import { apiBackUrl } from "../constants";

export default async function getProblem(id:string){
    const response = await fetch(`${apiBackUrl}/problems/${id}`, {
		method: 'GET',
		next: {tags: ['problem']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch events');
	}
    console.log("success");
	return await response.json()
}