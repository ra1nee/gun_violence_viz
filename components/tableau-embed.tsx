"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface TableauEmbedProps {
  url: string
  title: string
}

export function TableauEmbed({ url, title }: TableauEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
    script.type = "module"
    script.async = true

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script)
    }

    return () => {
      // Keep script loaded for other visualizations
    }
  }, [])

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <tableau-viz
        id={`tableau-viz-${title.replace(/\s+/g, "-").toLowerCase()}`}
        src={url}
        width="100%"
        height="800"
        hide-tabs="false"
        toolbar="bottom"
        className="w-full"
      />
    </div>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      tableauViz: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          width?: string
          height?: string
          hideTabs?: string
          toolbar?: string
        },
        HTMLElement
      >
    }
  }
}
