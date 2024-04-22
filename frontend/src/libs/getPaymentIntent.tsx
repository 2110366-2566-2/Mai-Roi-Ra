import { apiBackUrl } from "../constants";

export default async function getPaymentIntent(id:string, token: string){
    const response = await fetch(`${apiBackUrl}/api/v1/transactions/payment-intent/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {tags: ['getPaymentIntent']}
    })
    
    if(!response.ok) {
        throw new Error('Failed to fetch payment-intent');
    }
    console.log("success get payment-intent");
    return await response.json()
}