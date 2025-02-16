"use client"

import React from 'react';

interface FAQQuestion {
  q: string;
  a: string;
}

interface FAQProps {
  questions: FAQQuestion[];
}

const FAQ: React.FC<FAQProps> = ({ questions }) => {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-bold text-lg mb-2">{question.q}</h4>
          <p className="text-gray-700">{question.a}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
