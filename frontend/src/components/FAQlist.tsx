import React from "react";
import Accordion from "./FAQAccordion";
import Image from "next/image";

const FAQlist = () => {
  return (
    <div className="">
      <div className="text-center my-10">
        <h1 className="font-bold lg:text-5xl text-3xl lg:mb-4 md:mb-3 mb-2">
          Frequently Asked Questions
        </h1>
        <h2 className="font-base lg:text-3xl text-xl lg:mb-4 md:mb-3 mb-2">
          Here are some of the frequently asked questions
        </h2>
      </div>

      <div className="flex flex-wrap">
        {faqData.map((faq, index) => (
          <div key={index} className="w-1/2 p-4 bg-white rounded-lg mt-6 px-10">
            <Accordion title={faq.question} answer={faq.answer} />
          </div>
        ))}
      </div>
    </div>
  );
};

const faqData = [
  {
    question: "How do I register for an event?",
    answer:
      "Visit our event page, select the event, and fill out the registration form.",
  },
  {
    question: "Can I cancel my event registration?",
    answer:
      "Yes, you can cancel up to 48 hours before the event for a full refund.",
  },
  {
    question: "What are the terms and conditions for events?",
    answer:
      "Terms include non-transferability of tickets and adherence to event guidelines.",
  },
  {
    question: "Do you offer virtual events?",
    answer:
      "Yes, we have a variety of online events you can attend from anywhere.",
  },
  {
    question: "How can I find nearby events?",
    answer: "Use our search filter to find events based on location.",
  },
  {
    question: "Are there any discounts for early bird registrations?",
    answer: "Early bird registrants receive a 20% discount.",
  },
  {
    question: "Can I volunteer for events?",
    answer: "Absolutely! Check our 'Volunteer' section for more details.",
  },
  {
    question: "How to keep track of upcoming events?",
    answer: "Subscribe to our newsletter to stay informed about future events.",
  },
  {
    question: "What is your COVID-19 safety policy for events?",
    answer:
      "We follow all local health guidelines to ensure the safety of attendees.",
  },
  {
    question: "Do you accommodate special dietary needs?",
    answer: "Yes, please inform us in advance to arrange special meals.",
  },
  {
    question: "Is there parking available at event venues?",
    answer:
      "Most venues have parking, detailed information is provided for each event.",
  },
  {
    question: "Can I bring a guest to the event?",
    answer:
      "Some events allow guests, please check the specific event details.",
  },
  {
    question: "How can I sponsor an event?",
    answer:
      "For sponsorship opportunities, please visit our 'Sponsorship' page.",
  },
  {
    question: "What should I do if I lost something at an event?",
    answer: "Contact the event venue’s lost and found department.",
  },
  {
    question: "How can I give feedback about an event?",
    answer:
      "Post-event surveys will be emailed, or leave feedback on our website.",
  },
  {
    question: "What amenities are available at your events?",
    answer:
      "Amenities vary by venue, but generally include food, seating, and restroom facilities.",
  },
];

export default FAQlist;
