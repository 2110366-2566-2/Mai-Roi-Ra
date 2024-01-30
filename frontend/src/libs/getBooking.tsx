import { apiBackUrl } from "../constants"

export default async function getBooking(id:string,token:string) {
	const response = await fetch(`${apiBackUrl}/bookings/${id}`, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
		next: {tags: [`bookings/${id}`]}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch bookings')
	}
	return await response.json()
}