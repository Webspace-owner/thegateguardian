import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Gate Guardian" },
      { name: "description", content: "Extensive experience in consulting, training, coaching and project management for large-scale projects." },
      { property: "og:title", content: "About — The Gate Guardian" },
    ],
  }),
  component: About,
});

function About() {
  const { data: settings } = useQuery({ queryKey: ["site_settings"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id",1).maybeSingle()).data });
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">ABOUT US</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">{settings?.about_title}</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-3xl whitespace-pre-line">{settings?.about_body}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            "End-to-end project management for complex deployments",
            "Independent consulting backed by certified expertise",
            "Tailored training and coaching programs",
            "Vendor-neutral guidance with strategic partnerships",
          ].map((p) => (
            <Card key={p} className="p-5 flex items-start gap-3 bg-card/60">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm">{p}</p>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
