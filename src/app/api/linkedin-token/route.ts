import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/linkedin-callback`,
      client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID ||
        process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY as string,
      client_secret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET ||
        process.env.NEXT_PUBLIC_SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET as string,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("LinkedIn token exchange error:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}
