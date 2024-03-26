"use client"
import React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/CheckoutForm";
import createPaymentIntent from '../../libs/createPaymentIntent';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,);

export default function App() {
  const [clientSecret, setClientSecret] = useState(null);


//   React.useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch(`http://localhost:8080/api/v1/transactions/qr`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         "transaction_amount": 0,
//         "user_id": "string",
//         "event_id": "string",
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));

      
//   }, []);

  async function handleCreatePaymentIntent(transaction_amount: number, user_id: string, event_id: string) {
    try {
      const result = await createPaymentIntent(transaction_amount, user_id, event_id);
      console.log(result);
      // Handle the response
        console.log(`Event ID: ${result.event_id}`);
        console.log(`Payment Intent ID: ${result.payment_intent_id}`);
        console.log(`Payment Client Secret: ${result.payment_client_secret}`);
        console.log(`Payment Method Type: ${result.payment_method_type}`);
        console.log(`Transaction Amount: ${result.transaction_amount}`);
        setClientSecret(result.payment_client_secret);
    } catch (error) {
      console.error('Failed to create payment intent:', error);
    }
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const [transactionAmount, setTransactionAmount] = useState(0);
const [userId, setUserId] = useState('');
const [eventId, setEventId] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();
  handleCreatePaymentIntent(transactionAmount, userId, eventId);
};

  return (
    <div className="App">
        <div>
        <form onSubmit={handleSubmit}>
      <label>
        Transaction Amount:
        <input type="number" value={transactionAmount} onChange={e => setTransactionAmount(Number(e.target.value))} />
      </label>
      <label>
        User ID:
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
      </label>
      <label>
        Event ID:
        <input type="text" value={eventId} onChange={e => setEventId(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
        </div>

        <p>{clientSecret}</p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}