"use server";
import { cookies } from "next/headers";
import { logger } from "@/lib/logger";

export async function generateCodeChallenge(
  codeVerifier: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function logout() {
  "use server";
  cookies().set("token", "", { maxAge: 0, path: "/", httpOnly: true });
}

// Retrieve auth token from cookies
export async function getToken() {
  const cookieStore = cookies();
  return cookieStore.get("token");
}

// Fetch userdata like GUID and Username using the auth token
export async function getUserData(token?: string) {
  if (!token) {
    const tokenResponse = await getToken();
    token = tokenResponse?.value || "";
  }
  const response = await fetch(
    "https://api.faceit.com/auth/v1/resources/userinfo",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${token}`,
      },
    },
  );
  if (!response.ok) {
    logger.error(
      `Could not fetch user data, ${response.status}: ${response.statusText}`,
    );
    logout().then(() => {
      return null;
    });
  }
  return await response.json();
}
