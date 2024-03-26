import React, { useState } from 'react';
import createPaymentIntent from '../../../libs/createPaymentIntent';

const Page = () => {
    const [amount, setAmount] = useState('');

    async function handleCreatePaymentIntent(transaction_amount: number, user_id: string, event_id: string) {
        try {
          const result = await createPaymentIntent(transaction_amount, user_id, event_id);
          console.log(result);
          // Handle the response
            const { res_event_id, res_payment_intent_id, res_payment_client_secret, res_payment_method_type, res_transaction_amount } = result;
            console.log(`Event ID: ${res_event_id}`);
            console.log(`Payment Intent ID: ${res_payment_intent_id}`);
            console.log(`Payment Client Secret: ${res_payment_client_secret}`);
            console.log(`Payment Method Type: ${res_payment_method_type}`);
            console.log(`Transaction Amount: ${res_transaction_amount}`);
        } catch (error) {
          console.error('Failed to create payment intent:', error);
        }
      }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call createPaymentIntent function from libs
        const paymentIntent = await createPaymentIntent(amount);

        // Handle the paymentIntent response
        console.log(paymentIntent);
    };

    return (
        <div>
            <h1>Create Payment Intent</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <button type="submit">Create Payment Intent</button>
            </form>
        </div>
    );
};

export default Page;