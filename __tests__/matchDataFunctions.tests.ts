import {
  getWinrate,
  getHsRate,
  getAces,
  getMultiKills,
  getMvps,
  getAssists,
  getTotalKills,
  getMostPlayedMap,
} from "@/lib/matchDataFunctions";
import { MatchItem, PlayerData } from "@/lib/Types";

describe("Match Data Functions", () => {
  const sampleMatches: MatchItem[] = [
    {
      stats: {
        Result: "1",
        "K/D Ratio": "1.5",
        Headshots: "10",
        Kills: "20",
        Assists: "5",
        "Penta Kills": "1",
        "Double Kills": "3",
        "Triple Kills": "2",
        "Quadro Kills": "1",
        MVPs: "4",
        Region: "",
        "Match Id": "",
        "Game Mode": "",
        Team: "",
        "K/R Ratio": "",
        Map: "",
        "Competition Id": "",
        "Overtime score": "",
        "Created At": "",
        "Final Score": "",
        "First Half Score": "",
        Score: "",
        "Player Id": "",
        "Headshots %": "",
        "Match Round": "",
        Winner: "",
        "Updated At": "",
        Rounds: "",
        Deaths: "",
        Game: "",
        "Best Of": "",
        Nickname: "",
        "Second Half Score": "",
        "Match Finished At": 0,
      },
    },
    {
      stats: {
        Result: "0",
        "K/D Ratio": "1.0",
        Headshots: "8",
        Kills: "16",
        Assists: "3",
        "Penta Kills": "0",
        "Double Kills": "2",
        "Triple Kills": "1",
        "Quadro Kills": "0",
        MVPs: "2",
        Region: "",
        "Match Id": "",
        "Game Mode": "",
        Team: "",
        "K/R Ratio": "",
        Map: "",
        "Competition Id": "",
        "Overtime score": "",
        "Created At": "",
        "Final Score": "",
        "First Half Score": "",
        Score: "",
        "Player Id": "",
        "Headshots %": "",
        "Match Round": "",
        Winner: "",
        "Updated At": "",
        Rounds: "",
        Deaths: "",
        Game: "",
        "Best Of": "",
        Nickname: "",
        "Second Half Score": "",
        "Match Finished At": 0,
      },
    },
  ];

  const playerData: PlayerData = {
    player_id: "123",
    game_id: "csgo",
    lifetime: {
      "K/D Ratio": "",
      "Total Damage": "",
      "Total Sniper Kills": "",
      "1v2 Win Rate": "",
      "Flash Success Rate": "",
      "Total Enemies Flashed": "",
      "Entry Rate": "",
      Matches: "",
      "Total Rounds with extended stats": "",
      "Total 1v1 Count": "",
      "Utility Damage per Round": "",
      "Longest Win Streak": "",
      "Total 1v1 Wins": "",
      Wins: "",
      "Total Flash Count": "",
      "Utility Usage per Round": "",
      "Current Win Streak": "",
      ADR: "",
      "Total Utility Successes": "",
      "Total Kills with extended stats": "",
      "Total 1v2 Wins": "",
      "Total Utility Count": "",
      "Total Matches": "",
      "Average K/D Ratio": "",
      "Utility Damage Success Rate": "",
      "Recent Results": [],
      "Enemies Flashed per Round": "",
      "Total Entry Wins": "",
      "Total 1v2 Count": "",
      "Total Flash Successes": "",
      "Sniper Kill Rate per Round": "",
      "Sniper Kill Rate": "",
      "Win Rate %": "",
      "Total Headshots %": "",
      "Utility Success Rate": "",
      "Average Headshots %": "",
      "Total Utility Damage": "",
      "Total Entry Count": "",
      "Entry Success Rate": "",
      "1v1 Win Rate": "",
      "Flashes per Round": "",
    },
    segments: [
      {
        label: "Mirage",
        stats: { Matches: "15" },
        type: "map",
        mode: "competitive",
        img_small: "",
        img_regular: "",
      },
      {
        label: "Inferno",
        stats: { Matches: "10" },
        type: "map",
        mode: "competitive",
        img_small: "",
        img_regular: "",
      },
    ],
  };

  test("getWinrate calculates win percentage correctly", () => {
    expect(getWinrate(sampleMatches)).toBe(50);
  });

  test("getHsRate calculates headshot rate correctly", () => {
    expect(getHsRate(sampleMatches)).toBe(50);
  });

  test("getAces calculates total penta kills correctly", () => {
    expect(getAces(sampleMatches)).toBe(1);
  });

  test("getMultiKills calculates total multi-kills correctly", () => {
    expect(getMultiKills(sampleMatches)).toBe(10);
  });

  test("getMvps calculates total MVPs correctly", () => {
    expect(getMvps(sampleMatches)).toBe(6);
  });

  test("getAssists calculates total assists correctly", () => {
    expect(getAssists(sampleMatches)).toBe(8);
  });

  test("getTotalKills calculates total kills correctly", () => {
    expect(getTotalKills(sampleMatches)).toBe(36);
  });

  test("getMostPlayedMap identifies the most played map correctly", () => {
    expect(getMostPlayedMap(playerData)).toEqual({
      map: "Mirage",
      matches: 15,
    });
  });
});
