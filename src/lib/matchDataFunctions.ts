import { MapStats, MapStatsCustom, MatchItem } from "@/lib/Types";

export const getWinrate = (matches: MatchItem[]) => {
  const wonMatches: number = matches.reduce((acc, match: MatchItem) => {
    return acc + parseInt(match.stats.Result);
  }, 0);
  return (100 / matches.length) * wonMatches;
};

export const getHsRate = (matches: MatchItem[]) => {
  const cumHs = matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats["Headshots"]);
  }, 0);
  const cumKills = matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats["Kills"]);
  }, 0);
  return Math.round((100 / cumKills) * cumHs);
};

export const getAces = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return acc + parseInt(match.stats["Penta Kills"]);
  }, 0);
};

export const getMultiKills = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return (
      acc +
      parseInt(match.stats["Double Kills"] || "0") +
      parseInt(match.stats["Triple Kills"] || "0") +
      parseInt(match.stats["Quadro Kills"] || "0") +
      parseInt(match.stats["Penta Kills"] || "0")
    );
  }, 0);
};

export const getMvps = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats.MVPs);
  }, 0);
};
export const getAssists = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats.Assists);
  }, 0);
};
export const getDeaths = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats.Deaths);
  }, 0);
};

export const getTotalKills = (matches: MatchItem[]) => {
  return matches.reduce((acc, match: MatchItem) => {
    return acc + parseFloat(match.stats.Kills);
  }, 0);
};

export const getMostPlayedMap = (playerStats: {
  segments: MapStats[];
}): MapStatsCustom | null => {
  if (
    !playerStats ||
    !playerStats.segments ||
    playerStats.segments.length === 0
  ) {
    return null; // Return null if no segments are available
  }

  // Reduce the segments to find the most played map
  const mostPlayedMap = playerStats.segments.reduce<MapStatsCustom | null>(
    (mostPlayed, segment) => {
      const mapName = segment.label;
      const matches = parseInt(segment.stats?.Matches || "0", 10);

      if (!mostPlayed || matches > mostPlayed.matches) {
        return { map: mapName, matches };
      }
      return mostPlayed;
    },
    null,
  );

  return mostPlayedMap;
};