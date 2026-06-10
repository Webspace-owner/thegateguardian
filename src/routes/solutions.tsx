import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/solutions";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Our Solutions — The Gate Guardian" },
      { name: "description", content: "Digital Transformation, Security, Automation, and Efficiency — our four core solution pillars." },
      { property: "og:title", content: "Our Solutions — The Gate Guardian" },
      { property: "og:description", content: "Simplifying IT for a complex world across four solution pillars." },
    ],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">OUR SOLUTIONS</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">Simplifying IT for a complex world.</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
          Four pillars that address the business challenges every modern enterprise faces — transformation, security, automation, and efficiency.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="block group"
              >
                <Card className="p-8 h-full bg-card/60 border-border/60 hover:border-primary/60 transition relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-1 text-sm text-primary/80">{s.tagline}</p>
                  <p className="mt-4 text-muted-foreground text-sm">{s.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
