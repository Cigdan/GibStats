import { Stats } from "@/components/Stats";
import {
  fetchPlayerStats,
  fetchMatches,
  fetchPlayerData,
} from "@/lib/faceitApi";
import { MatchData, Player, PlayerData } from "@/lib/Types";
import { logger } from "@/lib/logger";
import React from "react";
import Image from "next/image";
import { getToken } from "@/lib/auth";
import { getMostPlayedMap } from "@/lib/matchDataFunctions";
import ErrorCard from "@/components/ErrorCard";

export default async function UserStatsPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  let error: {
    title: string;
    description: string | null;
  } | null = null;

  let playerStats: PlayerData | null = null;
  let matches: MatchData | null = null;
  let playerData: Player | null = null;

  const token = await getToken();

  try {
    const playerDataResponse = await fetchPlayerData(userId);
    if (!playerDataResponse.ok) {
      if (playerDataResponse.status === 404) {
        error = {
          title: "This User does not Exist",
          description:
            "We couldn't find any Counter-Strike 2 data for this user.",
        };
      } else {
        error = {
          title: playerDataResponse.statusText,
          description: "",
        };
      }
    } else {
      playerData = await playerDataResponse.json();
    }

    if (!error) {
      const playerStatsResponse = await fetchPlayerStats(userId);
      if (!playerStatsResponse.ok) {
        if (playerStatsResponse.status === 404) {
          error = {
            title: "This User does not Exist",
            description:
              "We couldn't find any Counter-Strike 2 data for this user.",
          };
        } else {
          error = {
            title: playerDataResponse.statusText,
            description: "",
          };
        }
      } else {
        playerStats = await playerStatsResponse.json();
      }
    }

    if (!error) {
      const matchesResponse = await fetchMatches(userId);
      if (!matchesResponse.ok) {
        error = {
          title: matchesResponse.statusText,
          description: "",
        };
      } else {
        matches = await matchesResponse.json();
      }
    }
  } catch (err) {
    logger.error(err);
    error = {
      title: "Fetching Error",
      description: "An unknown problem occurred while fetching data",
    };
  }

  // Wait for favouriteMap to be determined before rendering the image
  if (playerStats && matches && playerData && !error) {
    const map = getMostPlayedMap(playerStats)?.map?.toLowerCase() || "mirage";
    const mapImage = `/images/maps/loading_image/de_${map}.png`;

    return (
      <div className="flex flex-col xl:flex-row">
        <Image
          src={mapImage}
          width={1920}
          height={1080}
          alt={"Most Played Map Map"}
          sizes="100vw"
          className="w-screen h-screen object-cover fixed z-0"
        />
        <div className="z-10 w-full bg-blend-multiply pb-0">
          <Stats
            playerStats={playerStats}
            matches={matches?.items || []}
            playerData={playerData}
            token={token?.value || ""}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={"w-screen flex justify-center p-12"}>
        <ErrorCard title={error.title} description={error.description} />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-4">
      <ErrorCard
        title={"No CS2 Data Found"}
        description={
          "We couldn't find any Counter-Strike 2 data for this user."
        }
      />
    </div>
  );
}
