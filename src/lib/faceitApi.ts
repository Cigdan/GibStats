"use server";

const FACEIT_API_URL = "https://open.faceit.com/data/v4/players";
const FACEIT_API_KEY = process.env.FACEIT_API_KEY;

// Fetch Playerstats like K/D or total Matches played
export async function fetchPlayerStats(userId: string) {
  const url = `${FACEIT_API_URL}/${userId}/stats/cs2`;
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${FACEIT_API_KEY}`,
    },
  });
}

// Fetch list of all played matches of user
export async function fetchMatches(userId: string) {
  const url = `${FACEIT_API_URL}/${userId}/games/cs2/stats?limit=20`;
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${FACEIT_API_KEY}`,
    },
  });
}

// Fetch playerdata like username using guid
export async function fetchPlayerData(userId: string) {
  const url = `${FACEIT_API_URL}/${userId}`;
  return await fetch(url, {
    method: "GET",
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${FACEIT_API_KEY}`,
    },
  });
}
