import { VisualizationSection } from "@/components/visualization-section"
import { TableauEmbed } from "@/components/tableau-embed"
import { D3TimelineChart } from "@/components/d3-timeline-chart"
import { GunTypeMap } from "@/components/gun-type-map"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
              Gun Violence in America
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed md:text-xl">
              An in-depth analysis of gun violence statistics, trends, and patterns across the United States. Explore
              interactive data visualizations to understand the scope and impact of this critical issue.
            </p>
          </div>
        </div>
      </section>

      {/* Tableau Visualization Section */}
      <VisualizationSection
        title="US Overview of Gun Violence"
        description="Comprehensive statistics on gun violence incidents across all 50 states, including temporal trends and geographic distribution patterns."
      >
        <TableauEmbed
          url="https://public.tableau.com/shared/CXBMPRFF8?:embed=y&:showVizHome=no"
          title="Gun Violence US Overview Dashboard"
        />
        {/* <div className="flex items-center justify-center min-h-[400px] rounded-lg border-2 border-dashed border-border bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">US Overview of Gun Violence Visualization</h3>
            <p className="text-muted-foreground max-w-md">
              Add your Tableau or D3.js visualizations here to display gun violence statistics and trends.
            </p>
          </div>
        </div> */}
      </VisualizationSection>

      {/* Demographics Section */}
      <VisualizationSection
        title="Demographics"
        description="Analysis of gun violence incidents across demographic factors including age, income, race, and gender. Understanding the human impact through data."
        variant="muted"
      >
        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gun_violence_visualization_update/Genderdashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Age Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground">
              Add age description here.
            </p>
          </div>
        </div>

        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gun_violence_visualization_update/Genderdashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Gender Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground">
              Add gender description here.
            </p>
          </div>
        </div>

        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gun_violence_visualization_update/Genderdashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Race Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground">
              Add race description here.
            </p>
          </div>
        </div>

        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gun_violence_visualization_update/Genderdashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Income Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground">
              Add income description here.
            </p>
          </div>
        </div>

        {/* <div className="flex items-center justify-center min-h-[400px] rounded-lg border-2 border-dashed border-border bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Demographics Visualization</h3>
            <p className="text-muted-foreground max-w-md">
              Add your Tableau or D3.js visualizations here to display demographic breakdowns by age, income, race, and
              gender.
            </p>
          </div>
        </div> */}
      </VisualizationSection>

      {/* Gun Type Analysis Section */}
      <VisualizationSection
        title="Gun Type Analysis"
        description="Interactive map showing gun violence incidents by gun type across all US states. Multi-select gun types, click states to highlight, and explore the data through multiple coordinated views."
      >
        <GunTypeMap />
      </VisualizationSection>

      {/* Laws & Legislation Section */}
      <VisualizationSection
        title="Laws & Legislation"
        description="Examining the relationship between gun legislation and violence rates across different states and jurisdictions."
        variant="muted"
      >
        <div className="flex items-center justify-center min-h-[400px] rounded-lg border-2 border-dashed border-border bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Laws & Legislation Visualization</h3>
            <p className="text-muted-foreground max-w-md">
              Add your Tableau or D3.js visualizations here to display gun law data and correlations with violence
              statistics.
            </p>
          </div>
        </div>
      </VisualizationSection>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data sources and methodology available upon request. This visualization project aims to inform public
              discourse through accurate, transparent data analysis.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
