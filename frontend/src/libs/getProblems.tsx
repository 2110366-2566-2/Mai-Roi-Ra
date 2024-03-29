import { apiBackUrl } from "../constants";

export default async function getProblems(user_id:string){
    const url = new URL(`${apiBackUrl}/problems`);
    url.searchParams.append('user_id', user_id);
	//  url.searchParams.append('status','Pending'); //ชั่วคราว

    const response = await fetch(url, {
		method: 'GET',
		next: {tags: ['problems']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch events');
	}
    console.log("success");
	return await response.json()
}