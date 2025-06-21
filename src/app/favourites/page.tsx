import { redirect } from "next/navigation";
import { getFavourites } from "@/lib/db";
import { getToken } from "@/lib/auth";
import FavouriteCard from "@/components/FavouriteCard";
import { FavouritesRow } from "@/lib/Types";
import { fetchPlayerData } from "@/lib/faceitApi";
import ErrorCard from "@/components/ErrorCard";
import React from "react";

export default async function Favourites() {
  const token = await getToken();
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    return redirect("/");
  }

  const favourites: FavouritesRow[] | null = await getFavourites();
  if (favourites && favourites.length > 0) {
    return (
      <div className={"p-8"}>
        <span
          className={
            "text-2xl font-bold hidden md:inline-block text-secondary-foreground"
          }
        >
          Favourite Accounts
        </span>
        <div
          className={
            "flex flex-row gap-4 py-8 flex-wrap md:justify-start justify-center"
          }
        >
          {favourites.map(async (favourite) => {
            const playerData = await fetchPlayerData(favourite.favouriteuserid);
            return (
              <FavouriteCard
                key={favourite.nickname}
                favourite={favourite}
                token={token?.value}
                playerData={await playerData.json()}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={"w-screen flex justify-center p-12"}>
        <ErrorCard
          title={"You have no Favourites"}
          description={
            "Once you add a Player to your favourites, they will appear here."
          }
        />
      </div>
    );
  }
}
