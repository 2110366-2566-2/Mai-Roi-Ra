import { apiBackUrl } from "../constants"

export default async function getBookings(token:string) {
	const response = await fetch(`${apiBackUrl}/bookings`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
		next: {tags: ['bookings']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch bookings')
	}
	return await response.json()
}