import { VisualizationSection } from "@/components/visualization-section"
import { TableauEmbed } from "@/components/tableau-embed"
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
              This website contains an in-depth analysis of gun violence statistics, trends, and patterns across the United States (US). We would be analysing various aspects of gun violence including demographics, gun types, and legislations through interactive visualizations, touching on how they might influence gun violence rates in the US.
            </p>
          </div>
        </div>
      </section>

      {/* Tableau Visualization Section */}
      <VisualizationSection
        title="US Overview of Gun Violence"
        description="Comprehensive statistics on gun violence incidents across all 50 states."
      >
        <TableauEmbed
          url="https://public.tableau.com/views/overall_gender_analysis/Overalldashboard?:embed=y&:showVizHome=no"
          title="Gun Violence US Overview Dashboard"
        />
        <div className="py-4">
          <p className="text-muted-foreground text-xl">
            Dashboard that takes a look at the high level view of gun violence in the different US states from 2014 to 2017, including <b>geographic distribution patterns, mortality rates, trends, and projected trends in gun violence.</b>
          </p>
          <p className="text-muted-foreground text-xl">
            Some notable states that have a high number of incidents include California, Illinois, Florida, and Texas, which could be attributed to their larger populations. However, number of incidents alone does not provide a complete picture of gun violence, as states like Arizona and Texas have the highest mortality rates despite not having the highest number of incidents. This suggests that the severity of gun violence varies across states, with some experiencing more lethal incidents than others.
          </p>
          <p className="text-muted-foreground text-xl">
            The trend lines highlight an increasing trend in gun violence incidents over the years, with projections indicating a continued rise if current patterns persist. This underscores the urgent need for effective interventions and policies to address the escalating issue of gun violence in the US.
          </p>
        </div>
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
        description="Analysis of gun violence incidents across demographic factors including age, income, race, and gender, shedding light on how these factors intersect and influence gun violence patterns."
        variant="muted"
      >
        {/* Viz 1 */}
        <div className="relative w-full min-h-[720px]">
          <TableauEmbed        
            url="https://public.tableau.com/views/Demographics_17625944165220/Demographic?:embed=y&:showVizHome=no"
            title="Gun Violence Demographics Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground text-xl">
              Dashboard presenting visualizations across three key analyses: <b>Firearm Possessor Age Distribution, Firearm Possessor vs Mortality Rate, and Median Income vs Mortality Rate.</b></p>
              <p className="text-muted-foreground text-xl ">The dashboard collectively explores how demographic and socioeconomic factors such as age and income, relate to patterns of firearm ownership and mortality across U.S. states from 2014 to 2017.</p>
          </div>
        </div>

        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/overall_gender_analysis/GenderDashboard?:embed=y&:showVizHome=no"
            title="Gun Violence Gender Breakdown Dashboard"
          />
          <div className="py-4">
            <p className="text-muted-foreground text-xl">
              Dashboard comprising of visualizations comparing firearm mortality patterns by <b>suspect and victim gender across states and over time</b>.
            </p>
            <p className="text-muted-foreground text-xl">
              The dashboard shows that incidents involving male suspects are far more prevalent, with males also making up the majority of victims nationwide. However, it is interesting to note that the mortality rates of incidents involving female suspects are higher, particularly in Nevada and Arizona.
            </p>
            <p className="text-muted-foreground text-xl">
              The variance of the gender breakdown across the years highlights the evolving nature of gun violence and its impact on different demographic groups. Males have a higher variability in their involvement as victims in gun violence incidents compared to females, indicating that males are more susceptible to fluctuations in gun violence trends over time.
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
            <p className="text-muted-foreground text-xl">
              This visualization depicts the <b>racial composition of firearm-related mortality across U.S. states,</b> combining pie charts to illustrate race distribution and choropleth shading to represent average mortality rates. Darker shades indicate states with higher firearm mortality, while the pie chart segments reveal demographic variation across racial groups. The visualisation highlights how racial composition and regional disparities jointly shape patterns of firearm-related deaths.
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
        description="Exploring the distribution and impact of different gun types used in violent incidents across the US."
      >
        <GunTypeMap />
        <div className="py-4">
          <p className="text-muted-foreground text-xl">
            This visualization presents the <b>distribution of gun types used across different states in the United States</b> through an interactive map, bar chart and treemap. The map displays the national landscape, where darker shades of red indicate a higher number of injuries or deaths. The bar chart states in descending order based on total incidents, while the treemap breaks down the count by gun type. All charts are interactive and integrated with filters that allow users to view numerical counts on the map and exclude unknown values. Together, these visualizations reveal how different types of firearms contribute to varying levels of injuries or fatalities across states, emphasizing the importance of effective gun control policies.
          </p>
        </div>
      </VisualizationSection>

      {/* Laws & Legislation Section */}
      <VisualizationSection
        title="Laws & Legislation"
        description="Examining the relationship between gun legislation and violence rates across different states and jurisdictions."
        variant="muted"
      >

        <div>
          <TableauEmbed
            url="https://public.tableau.com/views/gunlaws_with_gun_data/Dashboard1?:?:embed=y&:showVizHome=no"
            title="Gun Laws with Gun Death Dashboard"
          />
        </div>
         <div className="flex justify-center rounded-lg  bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Laws & Legislation Visualization</h3>
            <p className="text-muted-foreground max-w-md">

              This interactive dashboard visualizes the evolution and distribution of firearm-related legislation across the United State, alongside the specific categories of legislation implemented.
            </p>
          </div>
        <div>

        </div>

        </div> 

        <TableauEmbed
          url="https://public.tableau.com/views/gunlaws_17622635731760/GunlawsimplementationDashboard?:embed=y&:showVizHome=no"
          title="Gun Law Scorecard Dashboard"
        />
         <div className="flex justify-center rounded-lg  bg-muted/50">
          <div className="text-center px-4">
            <h3 className="text-xl font-semibold text-foreground mb-2">Laws & Legislation Visualization</h3>
            <p className="text-muted-foreground ">

              This interactive dashboard visualizes the evolution and distribution of firearm-related legislation across the United States.
Timeline for Number of Laws: The top line chart tracks how gun-related laws have changed over time, categorized by the type of legislative action—Implement, Modify, or Repeal—to reveal trends in policy momentum and reform periods.
Number of Laws Implemented by State: The treemap in the center highlights each state’s contribution to total legislative activity. Larger blocks indicate states with a higher count of enacted or amended laws.
Type of Gun Law Implementation by State: The bottom stacked bar chart breaks down the composition of law types—such as background checks, open carry, registration, and waiting periods—implemented in each state.
Together, these visuals allow users to explore how actively each state has legislated on firearms, what kinds of regulations dominate, and when major policy shifts occurred.
Clicking a state dynamically filters the other charts, enabling deeper exploration of state-specific legislative patterns and focus areas.
            </p>
          </div>
        <div>

        </div>

        </div> 

        <div></div>
        <TableauEmbed
          url="https://public.tableau.com/views/lobbying_17622618963790/Amountspentlobbyingbyinterest?:embed=y&:showVizHome=no"
          title="Gun Violence Lobbying Amounts by Interest"
        />
        <div className="py-4">
          <p className="text-muted-foreground text-xl">This chart showcases the amount spent by various interest groups on gun violence prevention and legislation efforts.</p>
        </div>

        {/* </div>  */}
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
