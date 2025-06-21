import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getUserData } from "@/lib/auth";

interface TokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 },
    );
  }

  // Generate Auth Header
  const authHeader = Buffer.from(
    `${process.env.AUTH_FACEIT_ID}:${process.env.AUTH_FACEIT_SECRET}`,
    "utf-8",
  ).toString("base64");

  const codeVerifier = process.env.CODE_VERIFIER;

  // Add relevant auth information to form
  const formData = new URLSearchParams();
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");
  formData.append("code_verifier", codeVerifier || "");

  // Fetch Auth Token from Faceit using the auth headers and the above generated form
  try {
    const tokenResponse = await fetch(
      "https://api.faceit.com/auth/v1/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
        body: formData,
      },
    );

    // Return Error 500 if the token cannot be fetched
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      logger.error(`Token exchange failed: ${errorData}`);
      return NextResponse.json(
        { error: "Failed to exchange token" },
        { status: 500 },
      );
    }

    const tokenData: TokenResponse = await tokenResponse.json();

    // Redirect the User to / when the login succeeded
    const response = NextResponse.redirect(new URL("/", req.nextUrl.origin));

    // Add the retrieved token to the cookies of the user
    response.cookies.set("token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 12 * 60 * 60,
    });

    // Fetch userdata using the token, for logging purposes
    const userData = await getUserData(tokenData.access_token);
    if (userData && userData.nickname) {
      logger.info(`Successfully logged in as ${userData.nickname}`);
    }
    return response;
  } catch (error) {
    logger.error(`Error during token exchange ${error}`);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
