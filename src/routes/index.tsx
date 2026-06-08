import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShieldCheck, Award, Users, Zap, Quote, Sparkles, CheckCircle2, Star } from "lucide-react";
import * as Icons from "lucide-react";
import heroImg from "@/assets/hero-cyber.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gate Guardian — Guarding Your Data, Safeguarding Your Future" },
      { name: "description", content: "Premium consulting, training, and end-to-end delivery for security and infrastructure programs across manufacturing, finance, government, oil & gas, and beyond." },
      { property: "og:title", content: "The Gate Guardian" },
      { property: "og:description", content: "Empowering Security. Ensuring Trust." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: settings } = useQuery({ queryKey: ["site_settings"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle()).data });
  const { data: industries } = useQuery({ queryKey: ["industries"], queryFn: async () => (await supabase.from("industries").select("*").order("sort_order")).data ?? [] });
  const { data: testimonials } = useQuery({ queryKey: ["testimonials"], queryFn: async () => (await supabase.from("testimonials").select("*").order("sort_order")).data ?? [] });

  const headlineParts = (settings?.tagline || "Guarding Your Data, Safeguarding Your Future").split(",");

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden -mt-20 pt-20">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-violet rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-gold rounded-full blur-3xl opacity-20 animate-float-delayed" />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="container relative mx-auto px-4 pt-20 pb-32 md:pt-28 md:pb-40">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-7 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted by Fortune-500 security teams worldwide
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] tracking-tight">
                {headlineParts[0]}
                <br />
                <span className="text-gradient-gold">{headlineParts[1]?.trim() || "Safeguarding Tomorrow"}</span>
              </h1>

              <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {settings?.hero_subtitle || "Empowering Security. Ensuring Trust."} — strategic expertise, accountable delivery, and outcomes you can measure.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full font-semibold shadow-glow text-base h-14 px-8">
                  <Link to="/contact">Start a Project <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full glass border-border/50 hover:bg-foreground/5 text-base h-14 px-8">
                  <Link to="/services">Explore Solutions</Link>
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {["ISO-aligned", "24/7 advisory", "Global delivery"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-violet blur-3xl opacity-30 rounded-full" />
              <div className="relative glass-strong rounded-3xl p-3 shadow-glow">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={settings?.hero_image_url || heroImg} alt="Security operations" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE MONITORING
                    </div>
                    <div className="glass rounded-full h-9 w-9 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 glass-strong rounded-2xl p-4">
                    <div className="text-xs text-muted-foreground mb-1">Active Engagements</div>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-display font-bold text-gradient-gold">120+</div>
                      <div className="text-xs text-emerald-400 flex items-center gap-1">↗ 18% YoY</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating stat chip */}
              <div className="absolute -left-6 top-12 glass-strong rounded-2xl p-4 hidden md:block animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-violet flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold">15+</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee strip */}
          <div className="mt-20 glass rounded-2xl py-4 px-6 flex items-center gap-8 overflow-hidden">
            <div className="text-xs uppercase tracking-[0.2em] text-primary shrink-0">Trusted By</div>
            <div className="flex items-center gap-12 text-muted-foreground/70 font-display font-semibold text-lg whitespace-nowrap">
              {["AETHER", "VANTRA", "NORDISK", "HELIX", "OBSIDIAN", "MERIDIAN", "QUANTUM", "STELLAR"].map((n) => (
                <span key={n} className="hover:text-primary transition">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-3xl overflow-hidden glass">
          {[
            { value: "120+", label: "Projects Delivered" },
            { value: "15+", label: "Years Experience" },
            { value: "30+", label: "Industries Served" },
            { value: "98%", label: "Client Retention" },
          ].map((s) => (
            <div key={s.label} className="bg-background/60 p-8 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / SOLUTIONS */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Our Solutions
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
              {settings?.about_title || "The Gate Guardian Group"}
            </h2>
          </div>
          <div>
            <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed">{settings?.about_body}</p>
            <Button asChild variant="link" className="px-0 mt-6 text-primary group">
              <Link to="/about">Discover our story <ArrowUpRight className="ml-1 h-4 w-4 group-hover:rotate-45 transition" /></Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {[
            { icon: Award, title: "Proven Expertise", body: "Decades of cross-industry consulting with a track record of measurable outcomes.", tone: "gold" },
            { icon: Users, title: "Trusted Partnerships", body: "Direct alliances with leading global technology vendors and certified specialists.", tone: "violet" },
            { icon: Zap, title: "Outcome-Driven", body: "We cut complexity, maximize ROI, and accelerate your time-to-value.", tone: "gold" },
          ].map((f) => (
            <div key={f.title} className="group relative glass rounded-3xl p-8 hover:bg-foreground/[0.04] transition-all duration-500 hover:-translate-y-1">
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none ${f.tone === "gold" ? "shadow-glow" : "shadow-violet"}`} />
              <div className={`relative h-14 w-14 rounded-2xl ${f.tone === "gold" ? "bg-gradient-gold" : "bg-gradient-violet"} flex items-center justify-center mb-6`}>
                <f.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="relative font-display text-2xl font-bold mb-3">{f.title}</h3>
              <p className="relative text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mesh pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Served Industries
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Specialists across the sectors that matter most.</h2>
            <p className="text-muted-foreground text-lg">Tailored consulting and training for your operating context — wherever risk meets opportunity.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries?.map((ind, i) => {
              const I = (Icons as any)[ind.icon ? ind.icon.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join("") : "Building"] || Icons.Building;
              return (
                <Link
                  key={ind.id}
                  to="/industries/$slug"
                  params={{ slug: (ind as any).slug ?? "" }}
                  className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 bg-gradient-gold opacity-0 group-hover:opacity-20 blur-2xl transition" />
                  <div className="relative">
                    <div className="text-[10px] font-mono text-primary/60 mb-3">0{i + 1}</div>
                    <I className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition" />
                    <div className="font-display font-bold uppercase tracking-wide text-sm">{ind.name}</div>
                    <ArrowUpRight className="absolute top-0 right-0 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
                <span className="h-px w-8 bg-primary" /> Client Voices
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Loved by teams that <span className="text-gradient-violet">don't compromise</span>.</h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
              <span className="text-sm text-muted-foreground ml-2">4.9 / 5 average</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`relative glass rounded-3xl p-7 hover:-translate-y-1 transition-all duration-500 ${i === 1 ? "md:translate-y-6" : ""}`}>
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-foreground/90 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30" />
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-gradient-gold flex items-center justify-center font-display font-bold text-primary-foreground">
                      {t.name?.[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-gold" />
          <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-violet rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-background rounded-full blur-3xl opacity-30" />

          <div className="relative">
            <Sparkles className="h-10 w-10 text-primary-foreground mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
              Don't wait for opportunity.<br />Create it.
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg">
              Talk to our team about your next security, infrastructure, or training initiative — we'll meet you where you are.
            </p>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-full font-semibold h-14 px-10 text-base">
              <Link to="/contact">Talk to an Expert <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
