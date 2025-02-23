import React from 'react';

interface QAProps {
  question: string;
  children: React.ReactNode;
}

export function QA({ question, children }: QAProps) {
  return (
    <div className="space-y-4 my-6 p-6 bg-muted/50 rounded-lg">
      <div className="font-medium text-lg">
        <span className="text-primary mr-2">Q:</span>
        {question}
      </div>
      <div className="pl-6 border-l-2">
        <span className="text-primary font-medium mr-2">A:</span>
        {children}
      </div>
    </div>
  );
}