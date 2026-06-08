import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import * as Icons from "lucide-react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/industries/$slug")({
  component: IndustryDetail,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Couldn't load industry</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Industry not found</h1>
        <Link to="/industries" className="text-primary underline">Back to industries</Link>
      </div>
    </SiteLayout>
  ),
});

function splitLines(text?: string | null): string[] {
  return (text ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
}

function IndustryDetail() {
  const { slug } = Route.useParams();
  const router = useRouter();

  const { data: ind, isLoading } = useQuery({
    queryKey: ["industry", slug],
    queryFn: async () => {
      const { data } = await supabase.from("industries").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
    staleTime: 5 * 60_000,
  });

  const { data: related } = useQuery({
    queryKey: ["industries-related", slug],
    queryFn: async () => (await supabase.from("industries").select("*").neq("slug", slug).order("sort_order")).data ?? [],
    staleTime: 5 * 60_000,
  });

  if (isLoading) {
    return <SiteLayout><div className="container mx-auto px-4 py-32 text-center text-muted-foreground">Loading…</div></SiteLayout>;
  }
  if (!ind) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Industry not found</h1>
          <Link to="/industries" className="text-primary underline">Back to industries</Link>
        </div>
      </SiteLayout>
    );
  }

  const I = (Icons as any)[ind.icon ? ind.icon.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join("") : "Building"] || Icons.Building;
  const challenges = splitLines(ind.challenges);
  const solutions = splitLines(ind.solutions);
  const services = splitLines(ind.services);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden -mt-20 pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {ind.image_url && (
          <div className="absolute inset-0 opacity-25">
            <img src={ind.image_url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
        )}
        <div className="container relative mx-auto px-4">
          <button onClick={() => router.history.back()} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl glass flex items-center justify-center">
              <I className="h-7 w-7 text-primary" />
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Industry</div>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-5 max-w-4xl">
            {ind.name}
          </h1>
          {ind.tagline && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">{ind.tagline}</p>
          )}
        </div>
      </section>

      {/* OVERVIEW */}
      {ind.overview && (
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
                <span className="h-px w-8 bg-primary" /> Overview
              </div>
              <p className="text-xl leading-relaxed text-foreground/90">{ind.overview}</p>
            </div>
            <aside className="lg:col-span-4 glass rounded-3xl p-6 space-y-4">
              <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">At a glance</div>
              <div className="space-y-3 text-sm">
                {challenges.length > 0 && <div className="flex items-center justify-between"><span className="text-muted-foreground">Key risks</span><span className="font-semibold">{challenges.length}</span></div>}
                {solutions.length > 0 && <div className="flex items-center justify-between"><span className="text-muted-foreground">Capabilities</span><span className="font-semibold">{solutions.length}</span></div>}
                {services.length > 0 && <div className="flex items-center justify-between"><span className="text-muted-foreground">Services</span><span className="font-semibold">{services.length}</span></div>}
              </div>
              <Link to="/contact"><Button className="w-full bg-gradient-accent text-primary-foreground">Talk to an expert<ArrowUpRight className="h-4 w-4 ml-1" /></Button></Link>
            </aside>
          </div>
        </section>
      )}

      {/* CHALLENGES + SOLUTIONS */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.length > 0 && (
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h2 className="font-display text-2xl font-bold">Common challenges</h2>
              </div>
              <ul className="space-y-3">
                {challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="text-destructive font-mono text-xs mt-1">0{i + 1}</span>
                    <span className="text-foreground/90">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {solutions.length > 0 && (
            <div className="glass rounded-3xl p-8 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">Our approach</h2>
              </div>
              <ul className="space-y-3">
                {solutions.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">What we deliver</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 hover:border-primary/40 transition group">
                <div className="text-[10px] font-mono text-primary/60 mb-2">SVC / 0{i + 1}</div>
                <p className="text-sm text-foreground/90 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-14">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-gold rounded-full blur-3xl opacity-30" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">Ready to harden your {ind.name.toLowerCase()} operation?</h3>
              <p className="text-muted-foreground">Book a 30-minute discovery call. We'll map your top risks and the fastest path to a measurable security baseline.</p>
            </div>
            <div className="flex md:justify-end gap-3">
              <Link to="/contact"><Button size="lg" className="bg-gradient-accent text-primary-foreground">Start a project</Button></Link>
              <Link to="/services"><Button size="lg" variant="outline">See all services</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related && related.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Other industries</h3>
            <Link to="/industries" className="text-sm text-primary hover:underline inline-flex items-center gap-1">View all <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.slice(0, 4).map((r: any) => {
              const RI = (Icons as any)[r.icon ? r.icon.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join("") : "Building"] || Icons.Building;
              return (
                <Link key={r.id} to="/industries/$slug" params={{ slug: r.slug }} className="group glass rounded-2xl p-5 hover:border-primary/40 hover:-translate-y-1 transition">
                  <RI className="h-7 w-7 text-primary mb-3 group-hover:scale-110 transition" />
                  <div className="font-display font-bold uppercase tracking-wide text-sm mb-1">{r.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{r.tagline}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
