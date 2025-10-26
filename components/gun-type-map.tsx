"use client"

import { useEffect, useRef } from "react"

export function GunTypeMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ""

    const html = `
      <div class="gun-type-map-wrapper">
        <style>
          .gun-type-map-wrapper {
            font-family: Arial, sans-serif;
            background: #fafafa;
            color: #222;
            padding: 12px;
          }

          .gun-type-map-wrapper header h2 { margin: 0; font-size: 20px; }
          .gun-type-map-wrapper header .subtitle { margin: 4px 0 12px 0; color: #555; font-size: 13px; }

          .gun-type-map-wrapper #controls { display:flex; gap:18px; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; }
          .gun-type-map-wrapper .control-block { display:flex; flex-direction:column; gap:6px; }
          .gun-type-map-wrapper label.inline { display:flex; align-items:center; gap:6px; }
          .gun-type-map-wrapper label.small { font-size:12px; color:#444; }

          .gun-type-map-wrapper main#wrap { display:flex; gap:12px; align-items:flex-start; }

          .gun-type-map-wrapper #map-area {
            flex: 1 1 auto;
            min-width: 700px;
            background: white;
            border: 1px solid #e0e0e0;
            padding: 8px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .gun-type-map-wrapper .map-inner {
            display: block;
            width: 100%;
            text-align: center;
          }

          .gun-type-map-wrapper #map {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
          }

          .gun-type-map-wrapper #legend {
            margin-top: 10px;
            font-size: 12px;
            position: absolute;
            left: 12px;
            right: 12px;
            bottom: 8px;
            background: rgba(255,255,255,0.95);
            padding: 8px;
            border-radius: 6px;
            border: 1px solid #e6e6e6;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }
          .gun-type-map-wrapper #legend-gradient {
            height: 10px;
            background: linear-gradient(to right, #fff5f0, #fee0d2, #fcbba1, #fc9272, #fb6a4a, #de2d26, #a50f15);
            border: 1px solid #ddd;
            margin: 6px 0;
          }
          .gun-type-map-wrapper .legend-labels { display:flex; justify-content:space-between; color:#444; font-size:12px; }

          .gun-type-map-wrapper #side {
            width: 500px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .gun-type-map-wrapper .side-panel {
            background: #fff;
            border: 1px solid #e0e0e0;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          }
          
          .gun-type-map-wrapper #bar { width: 100%; }
          .gun-type-map-wrapper #treemap { width: 100%; }
          .gun-type-map-wrapper .side-panel .hint { font-size:12px; color:#666; margin-top:8px; }
          .gun-type-map-wrapper .side-panel h3 { margin: 0 0 8px 0; font-size: 16px; }

          .gun-type-map-wrapper .filter-badge {
            display: inline-block;
            background: #4679b8;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            margin-left: 8px;
            cursor: pointer;
          }
          .gun-type-map-wrapper .filter-badge:hover {
            background: #365a8f;
          }
          .gun-type-map-wrapper .treemap-cell {
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .gun-type-map-wrapper .treemap-cell.dimmed {
            opacity: 0.3;
          }
          .gun-type-map-wrapper .treemap-cell.active {
            stroke: #222 !important;
            stroke-width: 3px !important;
          }

          .gun-type-map-wrapper #tooltip {
            position: absolute;
            pointer-events: none;
            display: none;
            background: rgba(255,255,255,0.98);
            padding: 8px 10px;
            border-radius: 6px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            font-size: 13px;
            max-width: 360px;
            z-index: 9999;
          }

          .gun-type-map-wrapper .labels-layer text.label {
            fill: #111;
            stroke: none;
            font-weight: 600;
            paint-order: stroke;
            text-shadow: 0 0 2px rgba(255,255,255,0.8);
          }

          @media (max-width: 1200px) {
            .gun-type-map-wrapper main#wrap { flex-direction: column; }
            .gun-type-map-wrapper #map-area { min-width: auto; width: 100%; }
            .gun-type-map-wrapper #side { width: 100%; }
          }
        </style>

        <header>
          <h2>Gun Type Map</h2>
          <p class="subtitle">
            Click any visualization to filter others. Click state/gun type again to clear filter.
            <span id="activeFilters"></span>
          </p>
        </header>

        <div id="controls">
          <div class="control-block">
            <label for="gunTypeSelect"><strong>Gun type (multi-select)</strong></label>
            <select id="gunTypeSelect" multiple size="8" title="Hold Ctrl/Cmd to select multiple"></select>
          </div>

          <div class="control-block">
            <label for="stateSelect"><strong>State</strong></label>
            <select id="stateSelect">
              <option value="All States">All States</option>
            </select>
            <label class="inline small">
              <input type="checkbox" id="showLabels" />
              Show counts on map
            </label>
            <label class="inline small">
              <input type="checkbox" id="excludeUnknown" />
              Exclude Unknown
            </label>
            <button id="resetZoom">Reset Zoom</button>
          </div>
        </div>

        <main id="wrap">
          <section id="map-area">
            <div class="map-inner">
              <svg id="map" width="960" height="600" aria-label="US map"></svg>
            </div>

            <div id="legend">
              <strong>Legend (color = count)</strong>
              <div id="legend-gradient"></div>
              <div class="legend-labels">
                <span id="legend-min">0</span>
                <span id="legend-mid">—</span>
                <span id="legend-max">—</span>
              </div>
            </div>
          </section>

          <aside id="side">
            <div class="side-panel">
              <h3 id="side-title">Top states</h3>
              <svg id="bar" width="460" height="420" aria-label="Top states bar chart"></svg>
              <p class="hint">Click a row to highlight a state (no zoom). Click again to clear highlight.</p>
            </div>
            
            <div class="side-panel">
              <h3>Gun Type Distribution</h3>
              <svg id="treemap" width="460" height="300" aria-label="Gun type treemap"></svg>
              <p class="hint">Treemap shows relative proportions of gun types.</p>
            </div>
          </aside>
        </main>

        <div id="tooltip" role="dialog" aria-hidden="true"></div>
      </div>
    `

    containerRef.current.innerHTML = html

    // Load D3 and TopoJSON
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    // Initialize the visualization
    const initVisualization = async () => {
      // Load D3 and TopoJSON if not already loaded
      if (!(window as any).d3) {
        await loadScript("https://unpkg.com/d3@7")
      }
      if (!(window as any).topojson) {
        await loadScript("https://unpkg.com/topojson-client@3")
      }

      const d3 = (window as any).d3
      const topojson = (window as any).topojson

      // Load data
      let data
      try {
        data = await d3.json("/data/agg_by_state_full_array.json")
      } catch (e) {
        console.error("Failed to load data:", e)
        return
      }

      const gunTypesSet = new Set()
      data.forEach((d: any) =>
        Object.keys(d).forEach((k) => {
          if (k !== "state") gunTypesSet.add(k)
        }),
      )
      const gunTypes = Array.from(gunTypesSet)
        .filter((k) => k !== "nan")
        .sort() as string[]
      gunTypes.unshift("All")

      const gunSelect = d3.select("#gunTypeSelect")
      const stateSelect = d3.select("#stateSelect")
      const showLabelsCheckbox = d3.select("#showLabels")
      const excludeUnknownCheckbox = d3.select("#excludeUnknown")
      const resetZoomBtn = d3.select("#resetZoom")
      const tooltip = d3.select("#tooltip")

      const stateNames = data.map((d: any) => d.state).sort()
      stateSelect
        .selectAll("option.state-option")
        .data(stateNames)
        .enter()
        .append("option")
        .attr("class", "state-option")
        .attr("value", (d: string) => d)
        .text((d: string) => d)

      const dataMap = new Map()
      data.forEach((d: any) => dataMap.set(d.state, Object.assign({}, d)))

      let activeStateFilter: string | null = null
      let activeGunTypeFilter: string | null = null

      function updateActiveFilters() {
        const container = d3.select("#activeFilters")
        container.selectAll("*").remove()

        if (activeStateFilter) {
          container
            .append("span")
            .attr("class", "filter-badge")
            .text(`State: ${activeStateFilter}`)
            .on("click", () => {
              activeStateFilter = null
              stateSelect.property("value", "All States")
              updateAllVisualizations()
            })
        }

        if (activeGunTypeFilter) {
          container
            .append("span")
            .attr("class", "filter-badge")
            .text(`Gun Type: ${activeGunTypeFilter}`)
            .on("click", () => {
              activeGunTypeFilter = null
              updateAllVisualizations()
            })
        }
      }

      function getSelectedTypes() {
        const opts = Array.from(gunSelect.node().selectedOptions).map((o: any) => o.value)
        return opts.length === 0 || opts.includes("All") ? ["All"] : opts
      }

      function computeAll(row: any, selectedTypes: string[], filterState?: string | null) {
        if (!row) return 0
        const excludeUnknown = excludeUnknownCheckbox.property("checked")

        // If we have a state filter and this isn't that state, return 0
        if (filterState && row.state !== filterState) return 0

        let s = 0
        Object.keys(row).forEach((k) => {
          if (k === "state") return
          if (excludeUnknown && k === "Unknown") return

          // Apply gun type filter
          if (activeGunTypeFilter && k !== activeGunTypeFilter) return

          if (!selectedTypes || selectedTypes.includes("All") || selectedTypes.includes(k)) s += +(row[k] || 0)
        })
        return s
      }

      function computeGunTypeBreakdown(selectedTypes: string[], filterState?: string | null) {
        const excludeUnknown = excludeUnknownCheckbox.property("checked")
        const breakdown: Record<string, number> = {}

        data.forEach((row: any) => {
          // If we have a state filter, only include that state
          if (filterState && row.state !== filterState) return

          Object.keys(row).forEach((k) => {
            if (k === "state") return
            if (excludeUnknown && k === "Unknown") return
            if (!selectedTypes || selectedTypes.includes("All") || selectedTypes.includes(k)) {
              breakdown[k] = (breakdown[k] || 0) + +(row[k] || 0)
            }
          })
        })

        return Object.entries(breakdown)
          .filter(([_, value]) => value > 0)
          .map(([key, value]) => ({ name: key, value }))
      }

      const idToState: Record<number, string> = {
        1: "Alabama",
        2: "Alaska",
        4: "Arizona",
        5: "Arkansas",
        6: "California",
        8: "Colorado",
        9: "Connecticut",
        10: "Delaware",
        11: "District of Columbia",
        12: "Florida",
        13: "Georgia",
        15: "Hawaii",
        16: "Idaho",
        17: "Illinois",
        18: "Indiana",
        19: "Iowa",
        20: "Kansas",
        21: "Kentucky",
        22: "Louisiana",
        23: "Maine",
        24: "Maryland",
        25: "Massachusetts",
        26: "Michigan",
        27: "Minnesota",
        28: "Mississippi",
        29: "Missouri",
        30: "Montana",
        31: "Nebraska",
        32: "Nevada",
        33: "New Hampshire",
        34: "New Jersey",
        35: "New Mexico",
        36: "New York",
        37: "North Carolina",
        38: "North Dakota",
        39: "Ohio",
        40: "Oklahoma",
        41: "Oregon",
        42: "Pennsylvania",
        44: "Rhode Island",
        45: "South Carolina",
        46: "South Dakota",
        47: "Tennessee",
        48: "Texas",
        49: "Utah",
        50: "Vermont",
        51: "Virginia",
        53: "Washington",
        54: "West Virginia",
        55: "Wisconsin",
        56: "Wyoming",
      }

      const color = d3.scaleSequential(d3.interpolateOrRd).domain([0, 1])

      const svg = d3.select("#map").attr("preserveAspectRatio", "xMidYMid meet")
      const width = +svg.attr("width"),
        height = +svg.attr("height")
      const projection = d3
        .geoAlbersUsa()
        .translate([width / 2 + 25, height / 2])
        .scale(1000)
      const path = d3.geoPath().projection(projection)

      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event: any) => {
          g.attr("transform", event.transform)
          labelsG.attr("transform", event.transform)
        })

      svg.call(zoom as any)

      const g = svg.append("g").attr("class", "map-layer")
      const labelsG = svg.append("g").attr("class", "labels-layer")

      const topo = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      const states = topojson.feature(topo, topo.objects.states)

      let highlightedState: string | null = null
      function highlightState(name: string | null) {
        if (!name || name === "All States") {
          highlightedState = null
          statePaths.transition().duration(300).attr("stroke", "#999").attr("stroke-width", 0.6).attr("opacity", 1)
          return
        }
        highlightedState = name
        statePaths.transition().duration(300).attr("stroke", "#999").attr("stroke-width", 0.6).attr("opacity", 0.6)
        statePaths
          .filter((d: any) => idToState[d.id] === name)
          .transition()
          .duration(300)
          .attr("stroke", "#222")
          .attr("stroke-width", 2)
          .attr("opacity", 1)
      }

      function placeTooltip(event: any, html: string) {
        const padding = 10,
          cursorX = event.pageX,
          cursorY = event.pageY
        const t = tooltip.html(html).style("display", "block").style("opacity", 1)
        const bbox = t.node().getBoundingClientRect()
        let left = cursorX + 12
        if (left + bbox.width + padding > window.innerWidth) left = Math.max(padding, cursorX - bbox.width - 12)
        let top = cursorY + 12
        if (top + bbox.height + padding > window.innerHeight) top = Math.max(padding, cursorY - bbox.height - 12)
        t.style("left", left + "px")
          .style("top", top + "px")
          .attr("aria-hidden", "false")
      }
      function hideTooltip() {
        tooltip.style("display", "none").attr("aria-hidden", "true")
      }

      // Modified to handle active state filter
      function drawLabels(selectedTypes: string[], show: boolean) {
        labelsG.selectAll("text.label").remove()
        if (!show) return
        const items = states.features.map((f: any) => {
          const row = dataMap.get(idToState[f.id])
          return { feature: f, val: computeAll(row, selectedTypes, activeStateFilter) }
        })
        labelsG
          .selectAll("text.label")
          .data(items.filter((d: any) => d.val > 0))
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .text((d: any) => d.val)
          .attr("transform", (d: any) => {
            const c = path.centroid(d.feature)
            if (!isFinite(c[0]) || !isFinite(c[1])) return "translate(-9999,-9999)"
            return `translate(${c[0]},${c[1]})`
          })
          .style("pointer-events", "none")
      }

      const barSvg = d3.select("#bar"),
        barW = +barSvg.attr("width") - 80,
        barH = +barSvg.attr("height") - 80
      const barG = barSvg.append("g").attr("transform", "translate(50,20)")

      function updateBar(selectedTypes: string[]) {
        let arr = states.features
          .map((f: any) => {
            const row = dataMap.get(idToState[f.id])
            return { state: idToState[f.id], value: computeAll(row, selectedTypes, null) }
          })
          .filter((d: any) => d.value > 0)
          .sort((a: any, b: any) => b.value - a.value)

        // If state filter is active, show only that state
        if (activeStateFilter) {
          arr = arr.filter((d: any) => d.state === activeStateFilter)
        } else {
          arr = arr.slice(0, 18)
        }

        const x = d3
          .scaleLinear()
          .domain([0, d3.max(arr, (d: any) => d.value) || 1])
          .range([0, barW])
        const y = d3
          .scaleBand()
          .domain(arr.map((d: any) => d.state))
          .range([0, barH])
          .padding(0.12)
        barG.selectAll("*").remove()
        barG.append("g").call(d3.axisLeft(y).tickSize(0)).selectAll("text").style("font-size", "12px")
        barG.append("g").attr("transform", `translate(0,${barH})`).call(d3.axisBottom(x).ticks(4))

        const rows = barG
          .selectAll(".bar-row")
          .data(arr)
          .enter()
          .append("g")
          .attr("class", "bar-row")
          .style("cursor", "pointer")
          .on("click", (event: any, d: any) => {
            if (activeStateFilter === d.state) {
              activeStateFilter = null
              stateSelect.property("value", "All States")
            } else {
              activeStateFilter = d.state
              stateSelect.property("value", d.state)
            }
            highlightState(activeStateFilter)
            updateAllVisualizations()
          })
          .on("mousemove", (event: any, d: any) =>
            placeTooltip(event, `<strong>${d.state}</strong><br/>Count: ${d.value}`),
          )
          .on("mouseout", hideTooltip)

        rows
          .append("rect")
          .attr("y", (d: any) => y(d.state)!)
          .attr("height", y.bandwidth())
          .attr("x", 0)
          .attr("width", 0)
          .transition()
          .duration(600)
          .attr("width", (d: any) => x(d.value))
          .attr("fill", "#4679b8")

        rows
          .append("text")
          .attr("x", (d: any) => x(d.value) + 8)
          .attr("y", (d: any) => y(d.state)! + y.bandwidth() / 2)
          .attr("dy", "0.35em")
          .text((d: any) => d.value)
          .style("font-size", "11px")
          .style("opacity", 0)
          .transition()
          .duration(600)
          .style("opacity", 1)
      }

      const treemapSvg = d3.select("#treemap"),
        treemapW = +treemapSvg.attr("width"),
        treemapH = +treemapSvg.attr("height")
      const treemapG = treemapSvg.append("g")

      const treemapColor = d3.scaleOrdinal(d3.schemeSet3)

      function updateTreemap(selectedTypes: string[]) {
        const breakdown = computeGunTypeBreakdown(selectedTypes, activeStateFilter)

        const root = d3
          .hierarchy({ children: breakdown })
          .sum((d: any) => d.value)
          .sort((a: any, b: any) => b.value - a.value)

        d3.treemap().size([treemapW, treemapH]).padding(2)(root)

        const nodes = treemapG.selectAll("g").data(root.leaves(), (d: any) => d.data.name)

        nodes.exit().transition().duration(400).style("opacity", 0).remove()

        const entering = nodes.enter().append("g").style("opacity", 0)

        entering
          .append("rect")
          .attr("class", "treemap-cell")
          .attr("fill", (d: any) => treemapColor(d.data.name))
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .style("cursor", "pointer")

        entering
          .append("text")
          .attr("font-size", 11)
          .attr("fill", "#000")
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .style("pointer-events", "none")

        const allNodes = entering.merge(nodes as any)

        allNodes.transition().duration(600).style("opacity", 1)

        allNodes
          .select("rect")
          .classed("active", (d: any) => d.data.name === activeGunTypeFilter)
          .classed("dimmed", (d: any) => activeGunTypeFilter && d.data.name !== activeGunTypeFilter)
          .on("click", (event: any, d: any) => {
            if (activeGunTypeFilter === d.data.name) {
              activeGunTypeFilter = null
            } else {
              activeGunTypeFilter = d.data.name
            }
            updateAllVisualizations()
          })
          .on("mousemove", (event: any, d: any) =>
            placeTooltip(event, `<strong>${d.data.name}</strong><br/>Count: ${d.data.value}<br/>(Click to filter)`),
          )
          .on("mouseout", hideTooltip)
          .transition()
          .duration(600)
          .attr("x", (d: any) => d.x0)
          .attr("y", (d: any) => d.y0)
          .attr("width", (d: any) => d.x1 - d.x0)
          .attr("height", (d: any) => d.y1 - d.y0)

        allNodes
          .select("text")
          .transition()
          .duration(600)
          .attr("x", (d: any) => (d.x0 + d.x1) / 2)
          .attr("y", (d: any) => (d.y0 + d.y1) / 2)
          .text((d: any) => {
            const width = d.x1 - d.x0
            const height = d.y1 - d.y0
            if (width > 60 && height > 30) {
              return d.data.name.length > 12 ? d.data.name.substring(0, 12) + "..." : d.data.name
            }
            return ""
          })
      }

      const statePaths = g
        .selectAll("path")
        .data(states.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#eee")
        .attr("stroke", "#999")
        .attr("stroke-width", 0.6)
        .style("cursor", "pointer")
        .on("mousemove", (event: any, d: any) => {
          const name = idToState[d.id]
          const row = dataMap.get(name)
          placeTooltip(event, `<strong>${name}</strong><br/>Count: ${computeAll(row, getSelectedTypes(), null)}`)
        })
        .on("mouseout", hideTooltip)
        .on("click", (event: any, d: any) => {
          const stateName = idToState[d.id]
          if (activeStateFilter === stateName) {
            activeStateFilter = null
            stateSelect.property("value", "All States")
          } else {
            activeStateFilter = stateName
            stateSelect.property("value", stateName)
          }
          highlightState(activeStateFilter)
          updateAllVisualizations()
        })

      resetZoomBtn.on("click", () => {
        activeStateFilter = null
        activeGunTypeFilter = null
        stateSelect.property("value", "All States")
        highlightState(null)
        svg
          .transition()
          .duration(750)
          .call(zoom.transform as any, d3.zoomIdentity)
        updateAllVisualizations()
      })

      function updateMap(selectedTypes: string[]) {
        const vals = states.features.map((f: any) => computeAll(dataMap.get(idToState[f.id]), selectedTypes, null))
        const maxv = d3.max(vals) || 1
        color.domain([0, maxv])
        d3.select("#legend-min").text(0)
        d3.select("#legend-mid").text(Math.round(maxv / 2))
        d3.select("#legend-max").text(maxv)

        statePaths
          .transition()
          .duration(600)
          .attr("fill", (d: any) => {
            const val = computeAll(dataMap.get(idToState[d.id]), selectedTypes, null)
            return val ? color(val) : "#eee"
          })
          .attr("opacity", (d: any) => {
            if (!activeStateFilter) return 1
            return idToState[d.id] === activeStateFilter ? 1 : 0.3
          })

        drawLabels(selectedTypes, showLabelsCheckbox.property("checked"))
        updateBar(selectedTypes)
        updateTreemap(selectedTypes)
      }

      function updateAllVisualizations() {
        updateMap(getSelectedTypes())
        updateActiveFilters()
      }

      gunSelect.on("change", () => updateAllVisualizations())
      stateSelect.on("change", () => {
        const selectedState = stateSelect.node().value
        activeStateFilter = selectedState === "All States" ? null : selectedState
        highlightState(activeStateFilter)
        updateAllVisualizations()
      })
      showLabelsCheckbox.on("change", () => drawLabels(getSelectedTypes(), showLabelsCheckbox.property("checked")))
      excludeUnknownCheckbox.on("change", () => updateAllVisualizations())

      Array.from(gunSelect.node().options).forEach((opt: any) => (opt.selected = opt.value === "All"))
      excludeUnknownCheckbox.property("checked", false)
      updateMap(["All"])
    }

    initVisualization()
  }, [])

  return <div ref={containerRef} className="w-full" />
}
