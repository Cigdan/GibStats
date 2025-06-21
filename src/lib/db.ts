"use server";
import { sql } from "@vercel/postgres";
import { getUserData, getToken } from "@/lib/auth";
import { fetchPlayerData } from "@/lib/faceitApi";
import { FavouritesRow } from "./Types";
import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";

export async function addFavourite(playerId: string) {
  try {
    const token = await getToken();
    if (token && token.value) {
      const userData = await getUserData();
      if (userData.guid) {
        const playerDataFetch = await fetchPlayerData(playerId);
        if (playerDataFetch.ok) {
          const playerData = await playerDataFetch.json();
          const { rows } =
            await sql`INSERT INTO favourites (userid, favouriteuserid, nickname) VALUES (${userData.guid}, ${playerId}, ${playerData.nickname}) RETURNING *`;
          logger.info(
            `${userData.nickname} added ${playerData.nickname} to their favourites`,
          );
          return rows;
        }
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
  return null;
}

export async function getFavourites() {
  try {
    const token = await getToken();
    if (token && token.value) {
      const userData = await getUserData();
      if (userData && userData.guid) {
        const {
          rows,
        }: {
          rows: FavouritesRow[];
        } =
          await sql`SELECT userid,favouriteuserid,nickname FROM favourites WHERE userid = ${userData.guid}`;
        logger.info(`Successfully fetched favourites of ${userData.nickname}`);
        return rows;
      } else {
        redirect("/");
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
  return null;
}

export async function removeFavourite(playerId: string) {
  try {
    const token = await getToken();
    if (token && token.value) {
      const userData = await getUserData();
      if (userData && userData.guid) {
        const { rows } =
          await sql`DELETE FROM favourites WHERE userid = ${userData.guid} AND favouriteuserid = ${playerId} RETURNING *`;
        logger.info(
          `Successfully removed ${playerId} from ${userData.nickname}'s favourites`,
        );
        return rows;
      } else {
        redirect("/");
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
  return null;
}

export async function checkIfFavourite(playerId: string) {
  try {
    const token = await getToken();
    if (token && token.value) {
      const userData = await getUserData();
      if (userData && userData.guid) {
        const { rows } =
          await sql`SELECT * FROM favourites WHERE userid = ${userData.guid} AND favouriteuserid = ${playerId}`;
        logger.info(
          `Successfully checked if ${playerId} is favourited by ${userData.nickname}`,
        );
        return rows.length > 0;
      } else {
        redirect("/");
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
  return null;
}

export async function editFavouriteNickname(
  favouriteId: string,
  nickname: string,
) {
  try {
    const token = await getToken();
    if (token && token.value) {
      const userData = await getUserData();
      if (userData && userData.guid) {
        const { rows } =
          await sql`UPDATE Favourites SET nickname = ${nickname} WHERE userid LIKE ${userData.guid} AND favouriteuserid LIKE ${favouriteId}`;
        logger.info(
          `${userData.nickname} successfully changed his preferred nickname of ${favouriteId} to ${nickname}`,
        );
        return rows.length > 0;
      } else {
        redirect("/");
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }

  return null;
}
