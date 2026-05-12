import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Solutions & Scope of Work — The Gate Guardian" },
      { name: "description", content: "Our complete scope of work for consulting, design, supervision, and project delivery." },
      { property: "og:title", content: "Solutions — The Gate Guardian" },
    ],
  }),
  component: Services,
});

function Services() {
  const { data: items } = useQuery({ queryKey: ["scope_items"], queryFn: async () => (await supabase.from("scope_items").select("*").order("sort_order")).data ?? [] });
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">OUR SOLUTIONS</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">Scope of Work</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">A complete service framework — from initial objectives through final acceptance and knowledge transfer.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {items?.map((it, idx) => (
            <Card key={it.id} className="p-6 bg-card/60 border-border/60 hover:border-primary/50 transition group">
              <div className="text-3xl font-display font-bold text-primary/40 group-hover:text-primary transition">{String(idx + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display font-semibold">{it.title}</h3>
              {it.description && <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>}
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
