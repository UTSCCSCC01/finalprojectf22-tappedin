import React from "react";
import Accordion from "../../../components/Accordion";

const faqData = [
    {
        question: "Question 1",
        answer: "Answer 1"
    },
    {
        question: "Question 2",
        answer: "Answer 2"
    },
    {
        question: "Question 3",
        answer: "Answer 3"
    },
];

export default function FAQ() 
{
    return (
        <section className="section">
            <div className="container mx-auto py-24 xl">
                <div>
                    <h1 className="font-bold pb-3">FAQ</h1>                    
                    <div className="accordion">
                        <h2>
                            {faqData.map(({ question, answer }) => (
                                <Accordion key={question} title={question} content={answer} />
                            ))}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}