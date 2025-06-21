"use client";
import { Player } from "@/lib/Types";
import FavouriteIcon from "@/components/FavouriteIcon";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type PlayerInfoType = {
  playerData: Player;
  token: string | undefined;
};

function PlayerInfo({ playerData, token }: PlayerInfoType) {
  return (
    <div className="flex justify-start items-center gap-2">
      <div>
        <div className={"flex flex-row gap-1 items-center"}>
          {/* ---- Faceit Username ---- */}
          <h2 className="text-3xl font-bold">{playerData.nickname}</h2>
          <FavouriteIcon playerData={playerData} token={token} />
        </div>

        {/* ---- Faceit Level ----*/}
        <p className="text-muted-foreground">
          Level {playerData.games.cs2.skill_level} |{" "}
          {playerData.games.cs2.faceit_elo} Elo
        </p>
      </div>
      {/* ---- Link to Faceit Profile ---- */}
      <Button variant={"outline"} className={"p-2 z-40 block md:hidden"}>
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
  );
}

export default PlayerInfo;
