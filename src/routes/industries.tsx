import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — The Gate Guardian" },
      { name: "description", content: "Specialised security consulting and training across manufacturing, finance, government, oil & gas, real estate, data centers, education and more." },
      { property: "og:title", content: "Industries — The Gate Guardian" },
      { property: "og:description", content: "Tailored security programs for the sectors that matter most." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { data: industries } = useQuery({
    queryKey: ["industries"],
    queryFn: async () => (await supabase.from("industries").select("*").order("sort_order")).data ?? [],
    staleTime: 5 * 60_000,
  });

  return (
    <SiteLayout>
      <section className="relative overflow-hidden -mt-20 pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-gold rounded-full blur-3xl opacity-20" />
        <div className="container relative mx-auto px-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
            <span className="h-px w-8 bg-primary" /> Served Industries
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold max-w-4xl">
            Security built around <span className="text-gradient-violet">your industry</span>.
          </h1>
          <p className="text-muted-foreground text-lg mt-5 max-w-2xl">
            Nine deep verticals. One philosophy: layered, measurable, audit-ready protection delivered by people who have done it before.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries?.map((ind: any, i: number) => {
            const I = (Icons as any)[ind.icon ? ind.icon.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join("") : "Building"] || Icons.Building;
            return (
              <Link
                key={ind.id}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="group relative glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              >
                {ind.image_url && (
                  <div className="relative h-44 overflow-hidden">
                    <img src={ind.image_url} alt={ind.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-[10px] font-mono text-primary/70">0{i + 1}</div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                  </div>
                  <I className="h-8 w-8 text-primary mb-3" />
                  <h2 className="font-display text-xl font-bold uppercase tracking-wide mb-2">{ind.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ind.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
