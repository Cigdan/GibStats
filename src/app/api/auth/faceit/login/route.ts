import { NextResponse } from "next/server";
import { generateCodeChallenge } from "@/lib/auth";

export async function GET() {
  const CLIENT_ID = process.env.AUTH_FACEIT_ID;
  const REDIRECT_URI = process.env.FACEIT_REDIRECT_URI;
  const AUTH_URL = `https://accounts.faceit.com`;

  const codeVerifier: string = process.env.CODE_VERIFIER || "";
  const codeChallenge: string = await generateCodeChallenge(codeVerifier);

  if (REDIRECT_URI) {
    const response = NextResponse.redirect(
      `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&redirect_popup=true&scope=openid profile email&code_challenge=${codeChallenge}&code_challenge_method=S256`,
    );

    response.cookies.set("code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
