"use client";
import PlusIcon from "@mui/icons-material/AddCircleOutline";
import MinusIcon from "@mui/icons-material/RemoveCircleOutline";
import LocationIcon from "@mui/icons-material/Place";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import AddGuestIcon from "@mui/icons-material/GroupAdd";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import participateEvent from "@/libs/participateEvent";
import Modal from "./Modal";
import isRegisteredEvent from '@/libs/isRegisteredEvent';
import verifyEvent from "@/libs/VerifyEvent";
import rejectEvent from "@/libs/rejectEvent";
import { useRouter } from "next/navigation";

//Payment
import createPaymentIntent from '@/libs/createPaymentIntent';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,);


interface Event {
  activities: string;
  admin_id: string;
  city: string;
  country: string;
  deadline: string;
  description: string;
  district: string;
  end_date: string;
  event_id: string;
  event_image: string;
  event_name: string;
  location_id: string;
  location_name: string;
  organizer_id: string;
  participant_fee: 0;
  start_date: string;
  status: string;
}

export default function RegisterEventBox({
  event,
}: {
  event: Event;
}) {
  const { data: session } = useSession();
  const [isRegisterable, setIsRegisterable] = useState(false);

  const router = useRouter();

  const handleRegisterEventButton = async () => {
    try {
      // Call the userRegister function to register the user for the event
      console.log(event.event_id, numberOfGuest, session?.user?.user_id);
      const registrationResult = await participateEvent(
        event.event_id,
        numberOfGuest,
        session?.user?.user_id
      );
      // Handle successful registration
      console.log("Registration successful:", registrationResult);
      setShowQRCode(false);
    } catch (error: any) {
      // Handle registration error
      console.error("Registration failed:", error.message);
    }
  };

  useEffect(() => {
    const fetchIsRegisterable = async () => {
      try {
        const response = await isRegisteredEvent(session?.user?.user_id,event.event_id);
        setIsRegisterable(!response.is_registered)
        console.log("isRegistered:", response.is_registered);
      } catch (error) {
        // Handle the error
        console.log("Error fetching isRegisterable:", error.message);
      }
    };

    fetchIsRegisterable();

  }, []);

  const handleVerifyEventButton = async () => {
    try {
      const verificationResult = await verifyEvent(event.event_id);
      // Handle successful registration
      console.log("Verify successful:", verificationResult);
      router.push("/homepage");
    } catch (error: any) {
      // Handle registration error
      console.error("Verify failed:", error.message);
    }
  };

  const handleRejectEventButton = async () => {
    try {
      const rejectedResult = await rejectEvent(event.event_id);
      // Handle successful registration
      console.log("Reject successful:", rejectedResult);
      router.push("/homepage");
    } catch (error: any) {
      // Handle registration error
      console.error("Reject failed:", error.message);
    }
  };

  const [numberOfGuest, setNumberOfGuest] = useState(1);

  const startyear = event.start_date.substring(0, 4);
  const startmonth = event.start_date.substring(4, 6);
  const startday = event.start_date.substring(6, 8);

  const startdateObj = new Date(`${startyear}-${startmonth}-${startday}`);
  const formattedStartDate = startdateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endyear = event.end_date.substring(0, 4);
  const endmonth = event.end_date.substring(4, 6);
  const endday = event.end_date.substring(6, 8);

  const enddateObj = new Date(`${endyear}-${endmonth}-${endday}`);
  const formattedEndDate = enddateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleMinusGuestButton = () => {
    if (numberOfGuest == 1) {
      return;
    } else {
      setNumberOfGuest(numberOfGuest - 1);
    }
  };

  const currentDate = new Date();
  const enddateCompare = new Date(event.end_date);
  const isRegistrationClosed = currentDate > enddateCompare;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminVerifyModalOpen, setIsAdminVerifyModalOpen] = useState(false);
  const [isAdminRejectModalOpen, setIsAdminRejectModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setShowQRCode(false);
  };

  const [showQRCode, setShowQRCode] = useState(false);
  console.log(isRegisterable ,"here",session?.user?.user_id)
  console.log("QR:",showQRCode)


  const closeAdminVerifyModal = () => {
    setIsAdminVerifyModalOpen(false);
  };

  const closeAdminRejectModal = () => {
    setIsAdminRejectModalOpen(false);
  };

  //Payment
  const [clientSecret, setClientSecret] = useState(null);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
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

  return (
    <div>

      <Modal //confirm register modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Are you sure to register to this event?"
        style={null}
        allowOuterclose={true}
        modalsize="h-screen w-full"
      >
        <p>The Registeration cannot be cancel in the future.</p>
        <div>
        { showQRCode ? (
            <div className="w-full h-[200px] flex justify-center items-center flex-col">
             <p>{clientSecret}</p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
              <div className="w-full flex justify-between">
          <button
            onClick={() => {
              closeModal();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-gray-300 hover:bg-gray-400 w-[82px]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              //closeModal();
              handleRegisterEventButton();
               // window.location.reload();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-[#F2D22E] hover:bg-yellow-500 w-[82px]"
          >
            Yes
          </button>
        </div>
            </div>
        ):(
            <div className="w-full flex justify-between">
          <button
            onClick={() => {
              closeModal();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-gray-300 hover:bg-gray-400 w-[82px]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              //closeModal();
              handleRegisterEventButton();
               // window.location.reload();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-[#F2D22E] hover:bg-yellow-500 w-[82px]"
          >
            Yes
          </button>
        </div>
         )
            
        }
        </div>
      </Modal>

      <Modal //confirm verify modal
        isOpen={isAdminVerifyModalOpen}
        closeModal={closeAdminVerifyModal}
        title="Are you sure to verify to this event?"
        style={null}
      >
        <p>The event cannot be rejected in the future.</p>
        <div className="w-full flex justify-between">
          <button
            onClick={() => {
              closeAdminVerifyModal();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-gray-300 hover:bg-gray-400 w-[82px]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeAdminVerifyModal();
              handleVerifyEventButton();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-[#F2D22E] hover:bg-yellow-500 w-[82px]"
          >
            Yes
          </button>
        </div>
      </Modal>

      <Modal //confirm reject modal
        isOpen={isAdminRejectModalOpen}
        closeModal={closeAdminRejectModal}
        title="Are you sure to reject to this event?"
        style={null}
      >
        <p>The event cannot be verified in the future.</p>
        <div className="w-full flex justify-between">
          <button
            onClick={() => {
              closeAdminRejectModal();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-gray-300 hover:bg-gray-400 w-[82px]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              closeAdminRejectModal();
              handleRejectEventButton();
            }}
            className="mt-4 py-2 px-4 text-white rounded-md bg-[#F2D22E] hover:bg-yellow-500 w-[82px]"
          >
            Yes
          </button>
        </div>
      </Modal>

      <div className="flex mb-2 border rounded-lg p-4 flex flex-col w-full max-w-[400px] h-auto shadow-xl">
        <div>
          <span className="text-2xl font-semibold">
            {event.participant_fee} ฿
          </span>
          <div className="w-full border rounded-lg flex flex-col h-auto mt-4">
            <div className="w-full h-auto border flex flex-col p-4">
              <span className="w-full font-semibold flex items-center mb-4">
                <LocationIcon className="mr-2" />
                Location
              </span>
              <label>{`${event.location_name}, ${event.district}, ${event.city}, ${event.country}`}</label>
            </div>
            <div className="w-full h-auto border flex flex-col p-4">
              <span className="w-full font-semibold flex items-center mb-4">
                <CalendarIcon className="mr-2" />
                Date
              </span>
              <label>{formattedStartDate + " - " + formattedEndDate}</label>
            </div>
            {session?.user.role != "ADMIN" && (
              <div className="w-full h-[50px] border flex items-center justify-between p-4">
                <span className="font-semibold flex items-center">
                  <AddGuestIcon className="mr-2" />
                  Guest
                </span>
                <div className="">
                  <button
                    className="h-full mx-2"
                    onClick={() => {
                      handleMinusGuestButton();
                    }}
                  >
                    <MinusIcon
                      className={
                        "text-slate-300 " +
                        `${numberOfGuest == 1 ? "" : "hover:text-black "}`
                      }
                    />
                  </button>
                  <label className="mx-3">{numberOfGuest}</label>
                  <button
                    className="h-full mx-2"
                    onClick={() => {
                      setNumberOfGuest(numberOfGuest + 1);
                    }}
                  >
                    <PlusIcon className="text-slate-300 hover:text-black" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between my-4">
            <label className="px-1">Total fee {numberOfGuest} person</label>
            <label className="px-1">
              {event.participant_fee * numberOfGuest} ฿
            </label>
          </div>
        </div>
        {session && session?.user.role == "ADMIN" && (
          <div className="flex justify-center items-center">
            <button
              className="text-center bg-gray-300 text-white hover:bg-gray-400 rounded-lg py-4 px-12 mx-2"
              onClick={() => {
                setIsAdminRejectModalOpen(true);
              }}
            >
              Reject
            </button>
            <button
              className="text-center bg-[#F2D22E] text-white hover:bg-yellow-500 rounded-lg py-4 px-12 mx-2"
              onClick={() => {
                setIsAdminVerifyModalOpen(true);
              }}
            >
              Verify
            </button>
          </div>
        )}
        {session && !session.user.organizer_id && !isRegistrationClosed ? (
          isRegisterable ? (
            <button
              className="rounded-lg text-center w-full h-full bg-[#F2D22E] p-4 hover:bg-yellow-500"
              onClick={() => {
                setIsModalOpen(true);
                setShowQRCode(true);
                handleCreatePaymentIntent(event.participant_fee * numberOfGuest, session?.user?.user_id, event.event_id);
              }}
            >
              Register
            </button>
           ) :
           <button className="rounded-lg text-center w-full h-full bg-white text-red-500 p-4 cursor-not-allowed border-red-500 border-2">
             You are already registered
           </button>
        ) : (
          <button className="rounded-lg text-center w-full h-full bg-gray-300 text-white p-4 cursor-not-allowed">
            {session
              ? session.user.organizer_id
                ? "You are organizer. Only user can register"
                : isRegistrationClosed
                ? "The Event has passed"
                : null
              : "Please Sign in first"}
          </button>
        )}
      </div>
    </div>
  );
}