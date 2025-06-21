import { StatCardProgress } from "@/components/StatCardProgress";
import { GameStats } from "@/lib/Types";

type StatsCardsProps = {
  stats: GameStats;
};

export function StatsCards(props: StatsCardsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCardProgress
          max={100}
          title="Win Rate"
          value={Math.round(parseFloat(props.stats["Win Rate %"]))}
          suffix="%"
        />
        <StatCardProgress
          max={2}
          suffix=""
          title="Avg. K/D"
          value={parseFloat(props.stats["Average K/D Ratio"])}
        />
        <StatCardProgress
          max={100}
          title="Headshot %"
          value={parseFloat(props.stats["Average Headshots %"])}
          suffix="%"
        />
        <StatCardProgress
          max={150}
          title="ADR"
          suffix=""
          value={Math.round(parseFloat(props.stats.ADR))}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </>
  );
}
