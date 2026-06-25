import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data: seo } = await sb.from("seo_settings").select("canonical_base_url").eq("id", 1).maybeSingle();
        const base = (seo?.canonical_base_url || "https://thegateguardian.lovable.app").replace(/\/$/, "");

        const staticPaths = ["/", "/about", "/services", "/solutions", "/industries", "/gallery", "/blog", "/contact"];
        const [{ data: pages }, { data: industries }, { data: posts }] = await Promise.all([
          sb.from("pages").select("slug, updated_at").eq("published", true),
          sb.from("industries").select("slug"),
          sb.from("blog_posts").select("slug, updated_at").eq("published", true),
        ]);

        const urls: { loc: string; lastmod?: string }[] = [
          ...staticPaths.map((p) => ({ loc: `${base}${p}` })),
          ...(pages ?? []).filter((p) => p.slug).map((p) => ({ loc: `${base}/p/${p.slug}`, lastmod: p.updated_at })),
          ...(industries ?? []).filter((i) => i.slug).map((i) => ({ loc: `${base}/industries/${i.slug}` })),
          ...(posts ?? []).filter((p) => p.slug).map((p) => ({ loc: `${base}/blog/${p.slug}`, lastmod: p.updated_at })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=600" } });
      },
    },
  },
});
