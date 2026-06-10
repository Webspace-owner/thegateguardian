import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { getSolution, solutions } from "@/lib/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.solution;
    return {
      meta: s
        ? [
            { title: `${s.title} — The Gate Guardian` },
            { name: "description", content: s.description },
            { property: "og:title", content: `${s.title} — The Gate Guardian` },
            { property: "og:description", content: s.description },
          ]
        : [{ title: "Solution — The Gate Guardian" }],
    };
  },
  errorComponent: () => (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
      </section>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Solution not found</h1>
        <Button asChild className="mt-6"><Link to="/solutions">Back to Solutions</Link></Button>
      </section>
    </SiteLayout>
  ),
  component: SolutionPage,
});

function SolutionPage() {
  const { solution: s } = Route.useLoaderData();
  const Icon = s.icon;
  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <Link to="/solutions" className="text-xs tracking-widest text-primary font-semibold">← OUR SOLUTIONS</Link>
        <div className="flex items-start gap-5 mt-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow shrink-0">
            <Icon className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{s.title}</h1>
            <p className="mt-2 text-primary/80">{s.tagline}</p>
          </div>
        </div>
        <p className="mt-6 text-muted-foreground text-lg max-w-3xl">{s.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          {s.highlights.map((h) => (
            <Card key={h.title} className="p-6 bg-card/60 border-border/60">
              <h3 className="font-display font-semibold text-lg">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl font-semibold">Capabilities</h2>
            <p className="mt-2 text-sm text-muted-foreground">What we deliver under this pillar.</p>
          </div>
          <ul className="md:col-span-2 space-y-3">
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 rounded-2xl p-8 md:p-12 glass-strong flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-semibold">Ready to explore {s.title.toLowerCase()}?</h3>
            <p className="text-muted-foreground mt-2">Talk to our team about a tailored engagement.</p>
          </div>
          <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground rounded-full">
            <Link to="/contact">Get in touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold mb-4">Explore other solutions</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link key={o.slug} to="/solutions/$slug" params={{ slug: o.slug }} className="block">
                <Card className="p-5 bg-card/60 border-border/60 hover:border-primary/60 transition">
                  <div className="font-display font-semibold">{o.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{o.tagline}</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
