import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownViewer({ content }) {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-syne prose-headings:text-[#f0ebe0] prose-[#ff8c32] prose-p:text-[#cdc8bf] prose-p:leading-relaxed prose-li:text-[#cdc8bf] prose-strong:text-[#f0ebe0] prose-code:text-[#ff8c32] prose-code:font-mono">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
