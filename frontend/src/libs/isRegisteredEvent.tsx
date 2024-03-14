import { apiBackUrl } from "../constants"

export default async function isRegisteredEvent(user_id:string, event_id:string) {

	if(!user_id) return {is_registered:true}
	const response = await fetch(`${apiBackUrl}/isregistered/?userId=${user_id}&event_id=${event_id}`, {
		method: 'GET',
		headers: {
		}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch user profile')
	}
	
	return await response.json()
}