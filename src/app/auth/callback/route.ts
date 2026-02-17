import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const providerToken = data.session.provider_token;
      if (providerToken) {
        await supabase
          .from("profiles")
          .update({ github_access_token: providerToken })
          .eq("id", data.session.user.id);
      }

      return NextResponse.redirect(`${origin}/streak`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
