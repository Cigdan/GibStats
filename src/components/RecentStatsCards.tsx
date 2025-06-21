import { StatCardProgress } from "@/components/StatCardProgress";
import { MatchItem } from "@/lib/Types";
import {
  getWinrate,
  getHsRate,
  getTotalKills, getDeaths,
} from "@/lib/matchDataFunctions";

type StatsCardsProps = {
  matches: MatchItem[];
};

export function RecentStatsCards({ matches }: StatsCardsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCardProgress
          max={100}
          title="Win Rate"
          value={Math.round(getWinrate(matches))}
          suffix="%"
        />
        <StatCardProgress
          max={2}
          suffix=""
          title="Avg. K/D"
          value={Math.round((getTotalKills(matches) / getDeaths(matches)) * 100) / 100}
        />
        <StatCardProgress
          max={100}
          title="Headshot %"
          value={Math.round(getHsRate(matches))}
          suffix="%"
        />
        <StatCardProgress
          max={35}
          title="Avg. Kills"
          suffix=""
          value={Math.round(getTotalKills(matches) / matches.length)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </>
  );
}
