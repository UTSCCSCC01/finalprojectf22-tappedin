import React from "react";
import Accordion from "../../../components/Accordion/Accordion";

const faqData = [
    {
        question:
            "Why should I use TappedIn over other social-media & networking platform (e.g., Instagram, LinkedIn, Facebook)?",
        answer: "Well, you shouldn't! TappedIn is an application which builds on top of your existing social media platform you're already using. It is a way to easily share all of your social media platform with others through the use of Near Field Communication (NFC) and a publicly exposed URL. We've also included the added functionality to share posts with other people and a fully-integrated-friendship system to share your favorite moments with quickly.",
    },
    {
        question:
            "How do I enable NFC capabilities with my account?",
        answer: "It's extremely easy! All accounts built with our platform, already has a public-facing URL attached to them. Here are the steps., 1) Create an account with our platform. 2) Configure your account to your preferences. 3) Purchase an NFC tag from any retailer (e.g., Amazon). 4) Download an application (e.g., NFC Tools) to write your public-facing URL (i.e., the link on your profile page) onto the NFC tag. Ta-da, you're done!",
    },
    {
        question:
            "Great! Now, how do I sign up?",
        answer: "Go through our easy set up process and sign up using the 'Sign Up' button on the top section. Welcome to TappedIn!",
    },
];

export default function FAQ() 
{
    return (
        <section className="section px-4" id="Faq">
            <div className="px-4 md:px-10 py-8 xl">
                <div>
                    <h1 className="font-bold pb-6">FAQ</h1>
                    <div className="accordion">
                        <h2>
                            {faqData.map(({ question, answer }) => (
                                <Accordion
                                    key={question}
                                    title={question}
                                    content={answer}
                                />
                            ))}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
