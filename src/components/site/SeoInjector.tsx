import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Applies sitewide SEO settings (verification, analytics, organization JSON-LD)
// to the document head at runtime.
export function SeoInjector() {
  const { data } = useQuery({
    queryKey: ["seo_settings_public"],
    queryFn: async () => (await supabase.from("seo_settings").select("*").eq("id", 1).maybeSingle()).data,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!data || typeof document === "undefined") return;
    const created: HTMLElement[] = [];
    const add = (el: HTMLElement) => { document.head.appendChild(el); created.push(el); };

    if (data.google_site_verification) {
      const m = document.createElement("meta");
      m.name = "google-site-verification";
      m.content = data.google_site_verification;
      add(m);
    }

    if (data.org_jsonld) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "org";
      s.text = typeof data.org_jsonld === "string" ? data.org_jsonld : JSON.stringify(data.org_jsonld);
      add(s);
    }

    if (data.google_analytics_id) {
      const id = data.google_analytics_id;
      const g1 = document.createElement("script");
      g1.async = true;
      g1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      add(g1);
      const g2 = document.createElement("script");
      g2.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
      add(g2);
    }

    return () => { created.forEach((el) => el.remove()); };
  }, [data]);

  return null;
}
