"use client";
import React, { useEffect, useState } from "react";
import { Star, LoaderCircle } from "lucide-react";
import { getUserData } from "@/lib/auth";
import { addFavourite, checkIfFavourite, removeFavourite } from "@/lib/db";
import { Player } from "@/lib/Types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FavouriteIconType = {
  playerData: Player;
  token: string | undefined;
};

function FavouriteIcon({ playerData, token }: FavouriteIconType) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getUserData()
        .then((userData) => {
          if (userData) {
            checkIfFavourite(playerData.player_id)
              .then((isFavourite) => {
                setIsFavourite(isFavourite || false);
              })
              .catch((err) => {
                toast.error(`Error checking favourite status: ${err.message}`);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        })
        .catch((err) => {
          toast.error(`Error fetching user data: ${err.message}`);
          setIsLoading(false);
          router.refresh();
        });
    }
  }, [token, playerData.player_id]);

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  if (token && playerData) {
    return (
      <Star
        onClick={async (e) => {
          e.stopPropagation();
          if (token) {
            const userData = await getUserData().catch((err) => {
              toast.error(`Error fetching user data: ${err.message}`);
              setIsLoading(false);
            });
            if (!userData) {
              router.refresh();
            } // If userData fetching fails, stop further execution

            setIsLoading(true);
            try {
              if (isFavourite) {
                await removeFavourite(playerData.player_id);
                setIsFavourite(false);
                toast.success(
                  `Removed ${playerData.nickname} from your favourites`,
                );
              } else {
                await addFavourite(playerData.player_id);
                setIsFavourite(true);
                toast.success(
                  `Added ${playerData.nickname} to your favourites`,
                );
              }
            } catch (error) {
              // Improve error handling with more specific error messages
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "Something went wrong!";
              toast.error(`Error: ${errorMessage}`);
            } finally {
              setIsLoading(false);
            }
          }
        }}
        className={`cursor-pointer transition-all hover:scale-110 ${isFavourite && "fill-primary hover:fill-destructive hover:text-destructive"}`}
      />
    );
  }

  return null; // Return null if neither token nor playerData is available
}

export default FavouriteIcon;
