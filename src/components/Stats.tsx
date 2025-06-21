"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCards } from "@/components/StatsCards";
import { StatsTable } from "@/components/StatsTable";
import MatchTable from "@/components/MatchTable";
import { RecentStatsCards } from "@/components/RecentStatsCards";
import { RecentStatsTable } from "@/components/RecentStatsTable";
import PlayerInfo from "@/components/PlayerInfo";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MatchItem, Player, PlayerData } from "@/lib/Types";
import MapCard from "@/components/MapCard";
import ErrorCard from "@/components/ErrorCard";

interface StatsProps {
  playerStats: PlayerData;
  matches: MatchItem[];
  playerData: Player;
  token: string;
}

export function Stats({ playerStats, matches, playerData, token }: StatsProps) {
  if (!playerStats) {
    return (
      <ErrorCard
        title={"No CS2 Data"}
        description={"No CS2 Data was found for this user."}
      />
    );
  }
  return (
    <>
      <div className="container mx-auto p-4 space-y-4 bg-background/[0.65] z-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className={"flex flex-row gap-4 items-center"}>
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={playerData.avatar}
                  alt={playerData.nickname}
                />
                <AvatarFallback>
                  {playerData.nickname.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* ---- Link to Faceit Profile ---- */}
              <Button variant={"outline"} className={"p-2 z-40 hidden md:flex"}>
                <Link
                  href={
                    "https://www.faceit.com/en/players/" + playerData.nickname
                  }
                >
                  <Image
                    src="/images/faceit.webp"
                    alt="Faceit logo"
                    width={20}
                    height={20}
                  />
                </Link>
              </Button>
            </div>
            <div className={"flex flex-col gap-2"}>
              {/* ---- Amount of CS2 Matches ---- */}
              <Badge
                title="CSGO Matches not included"
                variant="secondary"
                className="text-xl px-4 py-2"
              >
                {playerStats.lifetime["Total Matches"]} Matches*
              </Badge>

              {/* ---- Recent Results ----*/}
              <div
                className={"flex flex-row gap-1 items-center justify-center"}
              >
                {playerStats.lifetime["Recent Results"].map(
                  (result: string, index: number) => {
                    return (
                      <Badge
                        className={"px-1.5"}
                        key={index}
                        variant={result === "1" ? "default" : "destructive"}
                      >
                        {result === "1" ? "W" : "L"}
                      </Badge>
                    );
                  },
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PlayerInfo playerData={playerData} token={token} />
          </CardContent>
        </Card>

        {/* Recent or all-time stats selector */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Stats</TabsTrigger>
            <TabsTrigger value="alltime">All-Time Stats</TabsTrigger>
          </TabsList>

          {/* Recent Statistics */}
          <TabsContent value="recent" className="space-y-4">
            <RecentStatsCards matches={matches} />
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Extended Recent Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecentStatsTable matches={matches} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* All-Time Statistics */}
          <TabsContent value="alltime" className="space-y-4">
            <StatsCards stats={playerStats.lifetime} />
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Extended All-Time Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StatsTable data={playerStats} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Map Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              All Time Maps Stats
            </CardTitle>
          </CardHeader>
          <CardContent className={"flex flex-row gap-4 flex-wrap"}>
            {playerStats.segments
              .filter((segment) => segment.type === "Map")
              .sort(
                (a, b) =>
                  parseInt(b.stats.Matches || "0") -
                  parseInt(a.stats.Matches || "0"),
              ) // Sort by number of matches in descending order
              .map((segment) => {
                return <MapCard key={segment.label} map={segment} />;
              })}
          </CardContent>
        </Card>

        {/* Recent Matches Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <MatchTable matches={matches} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
