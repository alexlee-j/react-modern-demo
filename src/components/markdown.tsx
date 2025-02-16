'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownProps {
  children: string;
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
