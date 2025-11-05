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
          url="https://public.tableau.com/views/overall_gender_analysis/Overalldashboard?:embed=y&:showVizHome=no"
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
        {/* Viz 1 */}
        <div className="relative w-full min-h-[720px]">
          <TableauEmbed
            url="https://public.tableau.com/views/agecharts/Demographic?:embed=y&:showVizHome=no"
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
            url="https://public.tableau.com/views/overall_gender_analysis/GenderDashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Gender Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground">
              Add gender description here.
            </p>
          </div>
        </div>

        {/* Viz 2 */}
        <div className="relative w-full min-h-[720px]">
          <TableauEmbed
            url="https://public.tableau.com/views/RaceDistributionvsMortalityRatebyState/RaceDistributionandMortalityRateByState?:embed=y&:showVizHome=no"
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
            url=""
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
        {/* <div className="flex items-center justify-center min-h-[400px] rounded-lg border-2 border-dashed border-border bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Laws & Legislation Visualization</h3>
            <p className="text-muted-foreground max-w-md">

              This interactive dashboard visualizes the evolution and distribution of firearm-related legislation across the United States, alongside 
            </p>
          </div>
        

        </div> */}
        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gunlaws_with_gun_data/Dashboard1?:?:embed=y&:showVizHome=no"
            title="Gun Laws with Gun Death Dashboard"
          />
        </div>


        <TableauEmbed
          url="https://public.tableau.com/views/gunlaws_17622635731760/GunlawsimplementationDashboard?:embed=y&:showVizHome=no"
          title="Gun Law Scorecard Dashboard"
        />
        <div>
          {/* <p>This interactive dashboard visualizes the evolution and distribution of firearm-related legislation across the United States.
Timeline for Number of Laws: The top line chart tracks how gun-related laws have changed over time, categorized by the type of legislative action—Implement, Modify, or Repeal—to reveal trends in policy momentum and reform periods.
Number of Laws Implemented by State: The treemap in the center highlights each state’s contribution to total legislative activity. Larger blocks indicate states with a higher count of enacted or amended laws.
Type of Gun Law Implementation by State: The bottom stacked bar chart breaks down the composition of law types—such as background checks, open carry, registration, and waiting periods—implemented in each state.
Together, these visuals allow users to explore how actively each state has legislated on firearms, what kinds of regulations dominate, and when major policy shifts occurred.
Clicking a state dynamically filters the other charts, enabling deeper exploration of state-specific legislative patterns and focus areas.</p> */}
        </div>
        <div></div>
        <TableauEmbed
          url="https://public.tableau.com/views/lobbying_17622618963790/Amountspentlobbyingbyinterest?:embed=y&:showVizHome=no"
          title="Gun Violence Lobbying Amounts by Interest"
        />

        <div>
          <p>This chart showcases the amount spent by various interest groups on gun violence prevention and legislation efforts.</p>
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
