"use client"
import { useState, useEffect } from 'react';
import getPaymentIntent from '@/libs/getPaymentIntent';
import { useSession } from "next-auth/react";
import participateEvent from '@/libs/participateEvent';


const StripeReturnPage = () => {
    const { data: session } = useSession();
    const [paymentIntent, setPaymentIntent] = useState("");

    useEffect(() => {
      // Get all the parameters from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const payment_intent = urlParams.get('payment_intent');
      const payment_intent_client_secret = urlParams.get('payment_intent_client_secret');
      const redirect_status = urlParams.get('redirect_status');
  
      console.log('Payment Intent ID:', payment_intent);
      console.log('Payment Intent Client Secret:', payment_intent_client_secret);
      console.log('Redirect Status:', redirect_status);
  
      if (redirect_status === 'succeeded') {
        // Handle successful payment
        console.log('Payment succeeded');
      } else {
        // Handle failed payment
        console.log('Payment failed');
      }
       // Define an async function
       const fetchPaymentIntent = async () => {
        // Get the payment intent ID from the URL
        const res = await getPaymentIntent(payment_intent as string);
        setPaymentIntent(res);
    };


    // Call the async function
    fetchPaymentIntent();
    }, []);

    useEffect(() => {
        const fetchParticipateEvent = async () => {
            const registrationResult = await participateEvent(
                paymentIntent.EventId,
                paymentIntent.NumParticipants,
                session?.user?.user_id
            );
        console.log("Registeration result:", registrationResult);
        };
        if (paymentIntent?.Status === 'succeeded') {
            // Participate in the event
            fetchParticipateEvent();
          } else {
            console.log('Payment:', paymentIntent?.Status);
          }
    },[paymentIntent]);


  
    return (
    //     <div className="bg-yellow-300 text-black p-6 rounded-lg max-w-md mx-auto">
    //     <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
    //     <p><strong>Payment Intent ID:</strong> {paymentIntent.PaymentIntentId}</p>
    //     {/* <p><strong>Payment Client Secret:</strong> {paymentIntent.PaymentClientSecret}</p> */}
    //     <p><strong>Transaction Amount:</strong> {paymentIntent.TransactionAmount}</p>
    //     <p><strong>Currency:</strong> {paymentIntent.Currency}</p>
    //     <p><strong>Status:</strong> {paymentIntent.Status}</p>
    //     <p><strong>EventID:</strong> {paymentIntent.event_id}</p>
    //     <p><strong>Number of guest:</strong> {paymentIntent.numberOfGuest}</p>
    //     {paymentIntent.Status === 'succeeded' && <p className="text-green-500 font-bold">Complete Registering</p>}
    //   </div>
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg mx-auto font-sans">
  <h1 className="text-2xl font-bold mb-4 text-black">Payment Status</h1>
  <p><strong>Payment Intent ID:</strong> {paymentIntent.PaymentIntentId}</p>
  <p><strong>Transaction Amount:</strong> {paymentIntent.TransactionAmount}</p>
  <p><strong>Currency:</strong> {paymentIntent.Currency}</p>
  <p><strong>Status:</strong> {paymentIntent.Status}</p>
  <p><strong>EventID:</strong> {paymentIntent.EventId}</p>
  <p><strong>Number of guest:</strong> {paymentIntent.NumParticipants}</p>
  <p><strong>UserID:</strong> {paymentIntent.UserId}</p>
  {paymentIntent.Status === 'succeeded' && <p className="text-green-500 font-bold">Complete Registering</p>}
</div>
    </div>
    );
  };
  
  export default StripeReturnPage;