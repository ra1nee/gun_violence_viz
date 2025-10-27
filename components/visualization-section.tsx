import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface VisualizationSectionProps {
  title: string
  description: string
  children: ReactNode
  variant?: "default" | "muted"
}

export function VisualizationSection({ title, description, children, variant = "default" }: VisualizationSectionProps) {
  return (
    <section className={cn("border-b border-border", variant === "muted" && "bg-muted/30")}>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-8 max-w-3xl md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">{description}</p>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  )
}
