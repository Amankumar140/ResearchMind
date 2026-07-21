import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownViewer({ content }) {
  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto px-2 md:px-4 py-2">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-[#f0ebe0] mt-8 mb-4 border-b border-white/10 pb-3 tracking-tight" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold text-[#f0ebe0] mt-7 mb-3.5 tracking-tight" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-medium text-[#f0ebe0] mt-5 mb-2.5" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-[#cdc8bf] leading-relaxed text-sm md:text-base mb-5" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2 text-[#cdc8bf] text-sm md:text-base" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2 text-[#cdc8bf] text-sm md:text-base" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="pl-1" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-[#ff8c32]" {...props} />
          ),
          code: ({ node, inline, ...props }) => (
            <code className="bg-white/5 text-[#ff8c32] px-1.5 py-0.5 rounded font-mono text-xs" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a 
              className="text-[#ff8c32] hover:text-[#ff5a1a] underline transition-colors" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-[#ff8c32] pl-4 py-1 my-5 italic text-[#e8e4dc] bg-white/[0.02] rounded-r-lg" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
