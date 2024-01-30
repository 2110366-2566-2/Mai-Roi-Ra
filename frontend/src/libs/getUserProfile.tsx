import { apiBackUrl } from "../constants"

export default async function getUserProfile(token:string) {
	const response = await fetch(`${apiBackUrl}/auth/me`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch user profile')
	}
	return await response.json()
}