export type GameStats = {
  "K/D Ratio": string;
  "Total Damage": string;
  "Total Sniper Kills": string;
  "1v2 Win Rate": string;
  "Flash Success Rate": string;
  "Total Enemies Flashed": string;
  "Entry Rate": string;
  Matches: string;
  "Total Rounds with extended stats": string;
  "Total 1v1 Count": string;
  "Utility Damage per Round": string;
  "Longest Win Streak": string;
  "Total 1v1 Wins": string;
  Wins: string;
  "Total Flash Count": string;
  "Utility Usage per Round": string;
  "Current Win Streak": string;
  ADR: string;
  "Total Utility Successes": string;
  "Total Kills with extended stats": string;
  "Total 1v2 Wins": string;
  "Total Utility Count": string;
  "Total Matches": string;
  "Average K/D Ratio": string;
  "Utility Damage Success Rate": string;
  "Recent Results": string[];
  "Enemies Flashed per Round": string;
  "Total Entry Wins": string;
  "Total 1v2 Count": string;
  "Total Flash Successes": string;
  "Sniper Kill Rate per Round": string;
  "Sniper Kill Rate": string;
  "Win Rate %": string;
  "Total Headshots %": string;
  "Utility Success Rate": string;
  "Average Headshots %": string;
  "Total Utility Damage": string;
  "Total Entry Count": string;
  "Entry Success Rate": string;
  "1v1 Win Rate": string;
  "Flashes per Round": string;
};

export type MapStats = {
  label: string;
  img_small: string;
  img_regular: string;
  stats: {
    "Flash Success Rate"?: string;
    "Total Headshots %"?: string;
    Deaths?: string;
    Assists?: string;
    "Average Deaths"?: string;
    "Average Kills"?: string;
    "Quadro Kills"?: string;
    "Total 1v1 Wins"?: string;
    "Utility Damage per Round"?: string;
    "Flashes per Round"?: string;
    "Total Utility Damage"?: string;
    "Sniper Kill Rate per Round"?: string;
    ADR?: string;
    "Total Enemies Flashed"?: string;
    "Average Triple Kills"?: string;
    "Entry Success Rate"?: string;
    "K/D Ratio"?: string;
    "Average Assists"?: string;
    "Total Flash Successes"?: string;
    "1v2 Win Rate"?: string;
    Rounds?: string;
    "Total Utility Count"?: string;
    "Total Matches"?: string;
    "Total 1v2 Wins"?: string;
    "Total 1v1 Count"?: string;
    "Utility Usage per Round"?: string;
    "Entry Rate"?: string;
    Matches?: string;
    "Average K/R Ratio"?: string;
    "Total Flash Count"?: string;
    "K/R Ratio"?: string;
    Headshots?: string;
    "Average Quadro Kills"?: string;
    "Average Penta Kills"?: string;
    "Total 1v2 Count"?: string;
    "Win Rate %"?: string;
    "Utility Success Rate"?: string;
    "Total Rounds with extended stats"?: string;
    "1v1 Win Rate"?: string;
    "Headshots per Match"?: string;
    "Enemies Flashed per Round"?: string;
    "Penta Kills"?: string;
    Wins?: string;
    "Total Damage"?: string;
    "Average K/D Ratio"?: string;
    MVPs?: string;
    "Total Entry Count"?: string;
    "Total Entry Wins"?: string;
    "Average Headshots %"?: string;
    Kills?: string;
    "Total Sniper Kills"?: string;
    "Triple Kills"?: string;
    "Total Kills with extended stats"?: string;
    "Sniper Kill Rate"?: string;
    "Utility Damage Success Rate"?: string;
    "Average MVPs"?: string;
    "Total Utility Successes"?: string;
  };
  type: string;
  mode: string;
};

export type PlayerData = {
  player_id: string;
  game_id: string;
  lifetime: GameStats;
  segments: MapStats[];
};

// Matches
export type MatchStats = {
  Region: string;
  "Match Id": string;
  "Game Mode": string;
  Team: string;
  "K/R Ratio": string;
  Map: string;
  "Penta Kills": string;
  "Competition Id": string;
  "K/D Ratio": string;
  "Overtime score": string;
  "Created At": string;
  "Final Score": string;
  "Triple Kills": string;
  "First Half Score": string;
  Assists: string;
  Score: string;
  "Double Kills": string;
  "Player Id": string;
  "Headshots %": string;
  "Match Round": string;
  Winner: string;
  "Updated At": string;
  Rounds: string;
  Deaths: string;
  Game: string;
  "Best Of": string;
  Headshots: string;
  Nickname: string;
  "Quadro Kills": string;
  Kills: string;
  MVPs: string;
  Result: string;
  "Second Half Score": string;
  "Match Finished At": number;
};

export type MatchItem = {
  stats: MatchStats;
};

export type MatchData = {
  items: MatchItem[];
  start: number;
  end: number;
};

// Player Data
export interface Player {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  cover_image: string;
  platforms: Platforms;
  games: Games;
  settings: Settings;
  friends_ids: string[];
  new_steam_id: string;
  steam_id_64: string;
  steam_nickname: string;
  memberships: string[];
  faceit_url: string;
  membership_type: string;
  cover_featured_image: string;
  infractions: Record<string, unknown>;
  verified: boolean;
  activated_at: string;
}

interface Platforms {
  steam: string;
}

interface Games {
  csdz: GameDetails;
  csgo: GameDetails;
  krunker: GameDetails;
  cs2: GameDetails;
}

interface GameDetails {
  region: string;
  game_player_id: string;
  skill_level: number;
  faceit_elo: number;
  game_player_name: string;
  skill_level_label: string;
  regions: Record<string, unknown>;
  game_profile_id: string;
}

interface Settings {
  language: string;
}

export type FavouritesRow = {
  userid: string;
  favouriteuserid: string;
  nickname: string;
};

export type MapStatsCustom = {
  map: string;
  matches: number;
};
