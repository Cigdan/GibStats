import { NextResponse } from "next/server";
import { PlayerData } from "@/lib/Types";
import { logger } from "@/lib/logger";

const FACEIT_API_URL = "https://open.faceit.com/data/v4/players";
const FACEIT_API_KEY = process.env.FACEIT_API_KEY;

type ResponseBody = {
  playerData: PlayerData | null;
  response: Response;
};

async function fetchPlayerId(nickname: string) {
  const url = `${FACEIT_API_URL}?nickname=${nickname}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${FACEIT_API_KEY}`,
      },
    });

    const playerData = await response.json();
    return {
      playerData: playerData,
      response: response,
    };
  } catch (error) {
    throw error;
  }
}

export async function GET(
  request: Request,
  { params }: { params: { nickname: string } },
) {
  const { nickname } = params;

  if (!nickname) {
    return NextResponse.json(
      { error: "Nickname is required" },
      { status: 400 },
    );
  }
  const body: ResponseBody = await fetchPlayerId(nickname);
  if (body.response.ok && body.playerData) {
    logger.info(`Fetched player id: ${body.playerData.player_id}`);
    return NextResponse.json(body.playerData.player_id);
  }
  switch (body.response.status) {
    case 404:
      logger.log({
        level: "warn",
        message: `Queried user doesn't exist: ${nickname}`,
      });
      return NextResponse.json(
        { error: "This User does not exist" },
        { status: 404 },
      );
    default:
      logger.log({
        level: "error",
        message: `Couldn't query user id of: ${nickname}, ERROR: ${body.response.statusText}`,
      });
      return NextResponse.json(
        { error: body.response.statusText },
        { status: 500 },
      );
  }
}
