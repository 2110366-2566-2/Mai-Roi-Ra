import { apiBackUrl } from "../constants";

export default async function getPaymentIntent(id:string){
    const response = await fetch(`${apiBackUrl}/transactions/payment-intent/${id}`, {
		method: 'GET',
		next: {tags: ['getPaymentIntent']}
	})
	
	if(!response.ok) {
		throw new Error('Failed to fetch payment-intent');
	}
    console.log("success get payment-intent");
	return await response.json()
}