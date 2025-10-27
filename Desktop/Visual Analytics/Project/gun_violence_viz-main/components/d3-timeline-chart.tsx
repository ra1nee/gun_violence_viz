"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface DataPoint {
  date: Date
  incidents: number
  casualties: number
}

export function D3TimelineChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [chartData, setChartData] = useState<DataPoint[]>([])

  // Sample data - replace with your actual data
  const data: DataPoint[] = [
    { date: new Date(2020, 0, 1), incidents: 45, casualties: 67 },
    { date: new Date(2020, 3, 1), incidents: 52, casualties: 78 },
    { date: new Date(2020, 6, 1), incidents: 61, casualties: 89 },
    { date: new Date(2020, 9, 1), incidents: 58, casualties: 82 },
    { date: new Date(2021, 0, 1), incidents: 63, casualties: 94 },
    { date: new Date(2021, 3, 1), incidents: 71, casualties: 103 },
    { date: new Date(2021, 6, 1), incidents: 68, casualties: 98 },
    { date: new Date(2021, 9, 1), incidents: 74, casualties: 107 },
    { date: new Date(2022, 0, 1), incidents: 79, casualties: 115 },
    { date: new Date(2022, 3, 1), incidents: 83, casualties: 121 },
    { date: new Date(2022, 6, 1), incidents: 88, casualties: 128 },
    { date: new Date(2022, 9, 1), incidents: 91, casualties: 134 },
    { date: new Date(2023, 0, 1), incidents: 86, casualties: 126 },
    { date: new Date(2023, 3, 1), incidents: 93, casualties: 138 },
    { date: new Date(2023, 6, 1), incidents: 97, casualties: 143 },
    { date: new Date(2023, 9, 1), incidents: 95, casualties: 140 },
  ]

  // Initialize chart data
  useEffect(() => {
    setChartData(data)
  }, [])

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: 500,
          })
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Render D3 chart
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render

    const margin = { top: 40, right: 60, bottom: 60, left: 60 }
    const width = dimensions.width - margin.left - margin.right
    const height = dimensions.height - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => d.date) as [Date, Date])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.incidents) as number])
      .nice()
      .range([height, 0])

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(8)
      .tickFormat(d3.timeFormat("%b %Y") as any)

    const yAxis = d3.axisLeft(yScale).ticks(8)

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "white")
      .style("font-size", "12px")

    g.append("g").attr("class", "y-axis").call(yAxis).selectAll("text").attr("fill", "white").style("font-size", "12px")

    // Style axis lines
    g.selectAll(".domain, .tick line").attr("stroke", "hsl(var(--border))")

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => ""),
      )
      .selectAll(".domain")
      .remove()

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.incidents))
      .curve(d3.curveMonotoneX)

    // Draw line with animation
    const path = g
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 3)
      .attr("d", line)

    const pathLength = path.node()?.getTotalLength() || 0
    path
      .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "hsl(var(--popover))")
      .style("color", "hsl(var(--popover-foreground))")
      .style("border", "1px solid hsl(var(--border))")
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .style("z-index", "1000")
      .style("box-shadow", "0 4px 6px -1px rgb(0 0 0 / 0.1)")

    // Data points
    g.selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.incidents))
      .attr("r", 0)
      .attr("fill", "white")
      .attr("stroke", "hsl(var(--background))")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("r", 8)

        tooltip.style("visibility", "visible").html(
          `
            <div style="font-weight: 600; margin-bottom: 8px;">
              ${d3.timeFormat("%B %Y")(d.date)}
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Incidents:</strong> ${d.incidents}</div>
              <div><strong>Casualties:</strong> ${d.casualties}</div>
            </div>
          `,
        )
      })
      .on("mousemove", (event) => {
        tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px")
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 5)
        tooltip.style("visibility", "hidden")
      })
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("r", 5)

    // Labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .text("Time Period")

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "14px")
      .style("font-weight", "500")
      .text("Number of Incidents")

    // Cleanup
    return () => {
      tooltip.remove()
    }
  }, [chartData, dimensions])

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="w-full p-6">
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="w-full" />
      </div>
    </div>
  )
}
