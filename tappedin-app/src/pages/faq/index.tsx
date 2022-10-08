// faq.html
import React from 'react'
import Accordion from '../../components/Accordion'

const faqData = [
    {
        question: 'Question 1',
        answer: 'Answer 1'
    },
    {
        question: 'Question 2',
        answer: 'Answer 2'
    },
    {
        question: 'Question 3',
        answer: 'Answer 3'
    },
];

export default function FaqPage() 
{
    return (
        <div>
          <h1>FAQ</h1>
          <div className="accordion">
            {faqData.map(({ question, answer }) => (
              <Accordion key={question} title={question} content={answer} />
            ))}
          </div>
        </div>
    );
}