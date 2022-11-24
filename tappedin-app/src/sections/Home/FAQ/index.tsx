import React from "react";
import Accordion from "../../../components/Accordion/Accordion";

const faqData = [
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer malesuada nunc vel risus commodo viverra. Cursus mattis molestie a iaculis at. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Venenatis cras sed felis eget. Aliquet enim tortor at auctor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Donec ultrices tincidunt arcu non sodales neque sodales ut. ",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer malesuada nunc vel risus commodo viverra. Cursus mattis molestie a iaculis at. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Venenatis cras sed felis eget. Aliquet enim tortor at auctor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Donec ultrices tincidunt arcu non sodales neque sodales ut. ",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer malesuada nunc vel risus commodo viverra. Cursus mattis molestie a iaculis at. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Venenatis cras sed felis eget. Aliquet enim tortor at auctor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Donec ultrices tincidunt arcu non sodales neque sodales ut. ",
    },
];

export default function FAQ() 
{
    return (
        <section className="section px-4">
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
