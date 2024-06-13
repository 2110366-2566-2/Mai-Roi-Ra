"use client";
import { useState, useEffect } from "react";
import getPaymentIntent from "@/libs/getPaymentIntent";
import { useSession } from "next-auth/react";
import participateEvent from "@/libs/participateEvent";
import { useRouter } from "next/navigation";
import isRegisteredEvent from "@/libs/isRegisteredEvent";
import LoadingLine from "@/components/LoadingLine";

type PaymentIntent = {
  PaymentIntentId: string;
  TransactionAmount: number;
  Currency: string;
  Status: string;
  EventId: string;
  NumParticipants: number;
  UserId: string;
};

const StripeReturnPage = () => {
  const { data: session } = useSession();
  const [paymentIntent, setPaymentIntent] = useState(
    null as PaymentIntent | null,
  );
  const router = useRouter();
  const [isRegisterable, setIsRegisterable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const payment_intent = urlParams.get("payment_intent");
    const payment_intent_client_secret = urlParams.get(
      "payment_intent_client_secret",
    );
    const redirect_status = urlParams.get("redirect_status");

    console.log("Payment Intent ID:", payment_intent);
    console.log("Payment Intent Client Secret:", payment_intent_client_secret);
    console.log("Redirect Status:", redirect_status);

    if (redirect_status === "succeeded") {
      // Handle successful payment
      console.log("Payment succeeded");
    } else {
      // Handle failed payment
      console.log("Payment failed");
    }
    // Define an async function
    const fetchPaymentIntent = async () => {
      // Get the payment intent ID from the URL
      const res = await getPaymentIntent(
        payment_intent as string,
        session?.user?.token as string,
      );
      setPaymentIntent(res);
    };

    // Call the async function
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    const fetchParticipateEvent = async () => {
      const registrationResult = await participateEvent(
        paymentIntent?.TransactionAmount || 0,
        paymentIntent?.EventId || "",
        paymentIntent?.NumParticipants || 0,
        session?.user?.user_id || "",
        session?.user?.token || "",
      );
      console.log("Registeration result:", registrationResult);
    };

    const fetchIsRegisterable = async () => {
      try {
        const response = await isRegisteredEvent(
          session?.user?.user_id || "",
          paymentIntent?.EventId || "",
          session?.user?.token as string,
        );
        setIsRegisterable(!response.is_registered);
        console.log("isRegistered:", response.is_registered);
        setLoading(false);
      } catch (error: any) {
        // Handle the error
        console.log("Error fetching isRegisterable:", error.message);
      }
    };
    fetchIsRegisterable();

    if (paymentIntent?.Status === "Completed" && isRegisterable) {
      // Participate in the event
      fetchParticipateEvent();
    } else {
      console.log(
        "Payment:",
        paymentIntent?.Status,
        "isRegisterable:",
        isRegisterable,
      );
    }
  }, [paymentIntent]);

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg mx-auto font-sans">
        <h1 className="text-2xl font-bold mb-4 text-black">Payment Status</h1>
        <p>
          <strong>Payment Intent ID:</strong> {paymentIntent?.PaymentIntentId}
        </p>
        <p>
          <strong>Transaction Amount:</strong>{" "}
          {paymentIntent?.TransactionAmount}
        </p>
        <p>
          <strong>Currency:</strong> {paymentIntent?.Currency}
        </p>
        <p>
          <strong>Status:</strong> {paymentIntent?.Status}
        </p>
        <p>
          <strong>EventID:</strong> {paymentIntent?.EventId}
        </p>
        <p>
          <strong>Number of guest:</strong> {paymentIntent?.NumParticipants}
        </p>
        <p>
          <strong>UserID:</strong> {paymentIntent?.UserId}
        </p>
        {paymentIntent?.Status === "Completed" ? (
          <>
            <p className="text-green-500 font-bold">Complete Registering</p>
            {loading ? (
              <LoadingLine />
            ) : isRegisterable ? (
              <p className="text-green-500 font-bold">
                Registration Successful
              </p>
            ) : (
              <p className="text-red-500 font-bold">Already Registered</p>
            )}
          </>
        ) : (
          <p className="text-yellow-500 font-bold">Pending</p>
        )}
      </div>
      <button
        onClick={() => router.push(`/events/${paymentIntent?.EventId}`)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Go to Event
      </button>
    </div>
  );
};

export default StripeReturnPage;
