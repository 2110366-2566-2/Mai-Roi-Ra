"use client";
import reviewEvent from "@/libs/reviewEvent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import LoadingLine from "./LoadingLine";
import ReviewModal from "./ReviewModal";
import { useRouter } from "next/navigation";
import SuccessReviewEventModal from "./SuccessReviewEventModal";
import responsePost from "@/libs/responsePost";
import isReviewedEvent from "@/libs/isReviewedEvent";

interface Responses {
  [key: string]: string; // This means the object can have any number of properties, all with string keys and string values.
}

interface Post {
  post_id: string;
  user_image: string;
  username: string;
  rating_score: number;
  caption: string;
  organizer_response?: string; // Optional property
}

interface Props {
  post_lists: Post[]; // Array of Post objects
  role: string;
  user_id: string;
  event_id: string;
  token: string;
  organizer_id: string;
}

const CommentBox = ({
  post_lists,
  role,
  user_id,
  event_id,
  token,
  organizer_id,
}: Props) => {
  console.log(role);
  //   console.log(user_id);
  const [isReviewed, setIsReviewed] = useState(false);

  const fetchIsReviewed = async () => {
    try {
      const response = await isReviewedEvent(user_id, event_id, token);
      setIsReviewed(response.is_reviewed);
    } catch (error) {
      console.error("Failed to fetch isReviewedEvent:", error);
    }
  };
  if (role == "USER") {
    useEffect(() => {
      fetchIsReviewed();
    }, []);
  }
  const [curr, setCurr] = useState(0);

  const router = useRouter();

  const prev = () => {
    setCurr((curr) => (curr === 0 ? post_lists.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === post_lists.length - 1 ? 0 : curr + 1));
  };
  /////////////////////////    User   //////////////////////////////////
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [isWriteReviewModal, setIsWriteReviewModal] = useState(false);

  const closeWriteReviewModal = () => {
    setIsWriteReviewModal(false);
  };
  const openWriteReviewModal = () => {
    setIsWriteReviewModal(true);
  };

  const [ratingScore, setRatingScore] = useState(0);
  const [reviewText, SetReviewText] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    SetReviewText(event.target.value);
  };

  const handleRatingChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number | null,
  ): void => {
    if (newValue !== null) {
      setRatingScore(newValue);
    }
  };

  const [successModalText, setSuccessModalText] = useState("");

  const [isWrongInputs, setIsWrongInputs] = useState(false);

  const submitReview = async () => {
    if (reviewText && ratingScore != 0) {
      setIsWrongInputs(false);
      setIsSubmitLoading(true);
      try {
        // Assuming you have the required variables `event_id`, `user_id`, and `token`
        const response = await reviewEvent(
          reviewText,
          event_id,
          Math.round(ratingScore),
          user_id,
          token,
        );
        console.log("Review submitted successfully:", response);
        // Additional logic for handling successful submission
        closeWriteReviewModal();

        setTimeout(() => {
          setSuccessModalText("Your review has been posted !");
          setSuccessModal(true);
        }, 500);
        setTimeout(() => {
          setSuccessModal(false);
          router.refresh();
        }, 4000);
        setIsSubmitLoading(false);
        setSuccessModalText("");
        router.refresh();
      } catch (error) {
        console.error("Failed to submit review:", error);
      } finally {
        setIsSubmitLoading(false);
        setSuccessModalText("");
        router.refresh();
      }
    } else {
      setIsWrongInputs(true);
      console.log("all field must be filled");
    }
  };
  const [successModal, setSuccessModal] = useState(false);

  //////// Organizer ////////

  const [isSubmitResponseLoading, setIsSubmitResponseLoading] = useState(false);

  const [responses, setResponses] = useState<Responses>({}); // Initialize with an empty object.

  const handleResponseChange = (postId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [postId]: value })); // Update the response for the specific post
  };

  const [isWrongResponseInputs, setIsWrongInputsResponse] = useState(false);

  const submitResponse = async (postId: string, responseText: string) => {
    if (responseText) {
      setIsSubmitResponseLoading(true);
      setIsWrongInputsResponse(false);
      try {
        // Assuming you have the required variables `organizer_id` and `token`
        const response = await responsePost(
          responseText,
          organizer_id, // assuming `user_id` is the organizer's ID in this context
          postId,
          token,
        );
        console.log("Response submitted successfully:", response);
        // Additional logic for handling successful submission
        setSuccessModalText("Your response has been posted !");
        setTimeout(() => {
          setSuccessModal(true);
        }, 500);
        setTimeout(() => {
          setSuccessModal(false);
          router.refresh(); // Refresh the page or data
        }, 4000);
      } catch (error) {
        console.error("Failed to submit response:", error);
        setIsWrongInputsResponse(true); // Update state to indicate error in inputs
      } finally {
        setIsSubmitResponseLoading(false);
      }
    } else {
      setIsWrongInputsResponse(true);
      console.log("Response field must be filled");
    }
  };

  return (
    <div className="w-full h-full space-y-[2%]">
      <SuccessReviewEventModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        text={successModalText}
      ></SuccessReviewEventModal>

      <ReviewModal
        isOpen={isWriteReviewModal}
        closeModal={closeWriteReviewModal}
        title="Write your review"
      >
        <div className="mt-8">
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <Rating
                className="text-4xl"
                value={ratingScore}
                precision={1}
                onChange={handleRatingChange}
              />
            </div>
            <div className="w-full px-4">
              <textarea
                id="review"
                name="review"
                value={reviewText}
                onChange={handleTextChange}
                className="mt-4 border border-slate-400 rounded-xl h-[200px] w-full focus:outline-none p-4 resize-none"
                placeholder="Write your review here ... (< 100 words)"
              ></textarea>
              {isWrongInputs && (
                <div className="mt-4" style={{ color: "#F16E1E" }}>
                  All field must be filled correctly !
                </div>
              )}

              <div className="flex justify-center items-center pb-4 pt-8">
                <button
                  className="bg-[#F2D22E] hover:bg-yellow-500 rounded-lg text-gray-700 py-2 px-16"
                  onClick={submitReview}
                >
                  Submit Review
                </button>
              </div>
              {isSubmitLoading && (
                <div className="px-8 py-4">
                  <LoadingLine></LoadingLine>
                </div>
              )}
            </div>
          </div>
        </div>
      </ReviewModal>
      <div
        className={`w-full ${
          role === "ORGANIZER" ? "h-[90%]" : "h-[70%]"
        } flex flex-row justify-center`}
      >
        <div className="flex flex-row justify-center items-center h-full w-[10%]">
          <div className="w-fit h-fit" onClick={prev}>
            <ArrowBackIosIcon className="cursor-pointer" />
          </div>
        </div>

        <div className="border-black rounded-2xl border-[1px] h-full w-[80%] overflow-hidden relative flex transition duration-300 ease-in-out">
          <div
            style={{ transform: `translateX(-${curr * 100}%)` }}
            className="flex transition-transform duration-300 ease-linear w-full"
          >
            {post_lists.map((post, index) => (
              <div
                key={post.post_id}
                className="flex-1 flex-col space-y-4 min-w-full flex p-4 text-lg font-medium"
              >
                <div className="w-full h-[20%] flex flex-row justify-start">
                  <div className="h-full w-[20%] flex items-center justify-center">
                    <Image
                      className="w-[40px] h-[40px] rounded-full"
                      src={
                        post.user_image
                          ? post.user_image
                          : "/img/profile_picture.png"
                      }
                      alt="profile image"
                      width={1000}
                      height={1000}
                    />
                  </div>

                  <div>
                    <div>{post.username}</div>

                    <div>
                      <Rating
                        className="text-[17px]"
                        defaultValue={post.rating_score}
                        precision={0.01}
                        max={5}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">{post.caption}</div>

                <div className="w-full">
                  <div className="flex flex-row justify-between">
                    <div className="text-gray-400">Organizers Response:</div>
                    {role == "ORGANIZER" && !post.organizer_response && (
                      <button
                        onClick={() =>
                          submitResponse(
                            post.post_id,
                            responses[post.post_id] || "",
                          )
                        }
                        disabled={isSubmitResponseLoading}
                        className="bg-[#F2D22E] hover:bg-yellow-500 text-sm px-8 rounded-lg space-x-2 mr-2"
                      >
                        Send
                      </button>
                    )}
                  </div>
                  <div className="text-md text-base font-normal ml-2">
                    {post.organizer_response}
                  </div>
                  {isSubmitResponseLoading && (
                    <div className="mt-2 px-2">
                      <LoadingLine></LoadingLine>
                    </div>
                  )}

                  {role == "ORGANIZER" && !post.organizer_response && (
                    <textarea
                      key={`response ${post.post_id}`}
                      id={`response ${post.post_id}`}
                      name="response"
                      value={responses[post.post_id] || ""}
                      onChange={(e) =>
                        handleResponseChange(post.post_id, e.target.value)
                      }
                      placeholder="Write your response here ... (< 100 words)"
                      className="!text-md text-base font-normal mt-4 border border-slate-400 rounded-xl h-auto w-full focus:outline-none p-4 resize-none"
                    ></textarea>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-center items-center h-full w-[10%]">
          <div className="w-fit h-fit" onClick={next}>
            <ArrowForwardIosIcon className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center lg:items-end items-center h-[28%]">
        {!isReviewed && role === "USER" && (
          <button
            onClick={openWriteReviewModal}
            className="flex flex-row justify-center items-center bg-[#F2D22E] hover:bg-yellow-500 py-3 px-2 rounded-2xl space-x-2 w-[70%]"
          >
            <div>
              <QuestionAnswerIcon className="text-[30px]" />
            </div>

            <div className="text-[20px]">Write your reviews</div>
          </button>
        )}
        {isReviewed && role === "USER" && (
          <button
            // onClick={openWriteReviewModal}
            className="text-gray-800 flex flex-row justify-center items-center bg-gray-200 cursor-default py-3 px-2 rounded-2xl space-x-2 w-[70%]"
          >
            <div>
              <QuestionAnswerIcon className="text-[30px]" />
            </div>

            <div className="text-[20px]">You have already reviewed</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
