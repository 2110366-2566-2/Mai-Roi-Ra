"use client"
import { useState, useEffect } from 'react';
import getPaymentIntent from '@/libs/getPaymentIntent';
import { useSession } from "next-auth/react";
import participateEvent from '@/libs/participateEvent';
import { useRouter } from 'next/navigation';
import isRegisteredEvent from '@/libs/isRegisteredEvent';
import LoadingLine from '@/components/LoadingLine';


const StripeReturnPage = () => {
  const { data: session } = useSession();
  const [paymentIntent, setPaymentIntent] = useState("");
  const router = useRouter();
  const [isRegisterable, setIsRegisterable] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Get all the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const payment_intent = urlParams.get('payment_intent');
    const payment_intent_client_secret = urlParams.get('payment_intent_client_secret');
    const redirect_status = urlParams.get('redirect_status');
    
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
        paymentIntent.TransactionAmount,
        paymentIntent.EventId,
        paymentIntent.NumParticipants,
        session?.user?.user_id
      );
      console.log("Registeration result:", registrationResult);
    };

    const fetchIsRegisterable = async () => {
      try {
        const response = await isRegisteredEvent(session?.user?.user_id, paymentIntent.EventId);
        setIsRegisterable(!response.is_registered)
        console.log("isRegistered:", response.is_registered);
        setLoading(false);
      } catch (error) {
        // Handle the error
        console.log("Error fetching isRegisterable:", error.message);
      }
    };
    fetchIsRegisterable();

    if (paymentIntent?.Status === 'Completed' && isRegisterable) {
      // Participate in the event
      fetchParticipateEvent();
    } else {
      console.log('Payment:', paymentIntent?.Status, 'isRegisterable:', isRegisterable);
    }
  }, [paymentIntent]);



  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg mx-auto font-sans">
        <h1 className="text-2xl font-bold mb-4 text-black">Payment Status</h1>
        <p><strong>Payment Intent ID:</strong> {paymentIntent.PaymentIntentId}</p>
        <p><strong>Transaction Amount:</strong> {paymentIntent.TransactionAmount}</p>
        <p><strong>Currency:</strong> {paymentIntent.Currency}</p>
        <p><strong>Status:</strong> {paymentIntent.Status}</p>
        <p><strong>EventID:</strong> {paymentIntent.EventId}</p>
        <p><strong>Number of guest:</strong> {paymentIntent.NumParticipants}</p>
        <p><strong>UserID:</strong> {paymentIntent.UserId}</p>
        {paymentIntent.Status === 'Completed' ?
          <>
            <p className="text-green-500 font-bold">Complete Registering</p>
            {loading ? <LoadingLine /> : isRegisterable ? <p className="text-green-500 font-bold">Registration Successful</p> : <p className="text-red-500 font-bold">Already Registered</p>}
          </>
          :
          <p className="text-yellow-500 font-bold">Pending</p>
        }
      </div>
      <button onClick={() => router.push(`/events/${paymentIntent.EventId}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Go to Event
      </button>

    </div>
  );
};

export default StripeReturnPage;