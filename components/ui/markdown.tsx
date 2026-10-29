'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="mb-2 mt-3 text-base font-semibold text-foreground" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="mb-1 mt-2 text-sm font-semibold text-foreground" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-1 text-sm text-foreground/90" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="mb-1 ml-4 list-disc space-y-1 text-sm text-foreground/90" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="mb-1 ml-4 list-decimal space-y-1 text-sm text-foreground/90" {...props} />
        ),
        li: ({ node, ...props }) => <li {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

