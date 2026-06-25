import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data } = await sb.from("seo_settings").select("robots_txt").eq("id", 1).maybeSingle();
        const body = data?.robots_txt || "User-agent: *\nAllow: /";
        return new Response(body, { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=600" } });
      },
    },
  },
});
