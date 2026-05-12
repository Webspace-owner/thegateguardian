import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Award, Users, Zap, Quote } from "lucide-react";
import * as Icons from "lucide-react";
import heroImg from "@/assets/hero-cyber.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gate Guardian — Guarding Your Data, Safeguarding Your Future" },
      { name: "description", content: "Consulting, training, coaching and project management for security and infrastructure across manufacturing, finance, government, oil & gas, real estate, data centers, and more." },
      { property: "og:title", content: "The Gate Guardian" },
      { property: "og:description", content: "Empowering Security, Ensuring Trust." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: settings } = useQuery({ queryKey: ["site_settings"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id",1).maybeSingle()).data });
  const { data: industries } = useQuery({ queryKey: ["industries"], queryFn: async () => (await supabase.from("industries").select("*").order("sort_order")).data ?? [] });
  const { data: testimonials } = useQuery({ queryKey: ["testimonials"], queryFn: async () => (await supabase.from("testimonials").select("*").order("sort_order")).data ?? [] });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={settings?.hero_image_url || heroImg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="container relative mx-auto px-4 py-32 md:py-44 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
            <Shield className="h-3.5 w-3.5" /> Trusted Security & Infrastructure Partner
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto">
            {settings?.tagline?.split(",")[0] || "Guarding Your Data"},<br />
            <span className="text-gradient">{settings?.tagline?.split(",")[1]?.trim() || "Safeguarding Your Future"}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {settings?.hero_subtitle || "Empowering Security, Ensuring Trust"} — for organizations that demand expertise, accountability, and measurable outcomes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-gradient-accent text-primary-foreground shadow-glow">
              <Link to="/contact">Start a Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions intro */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">OUR SOLUTIONS</div>
        <h2 className="text-3xl md:text-5xl font-bold max-w-3xl">{settings?.about_title || "The Gate Guardian Group"}</h2>
        <p className="mt-6 text-muted-foreground max-w-3xl text-lg whitespace-pre-line">{settings?.about_body}</p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Award, title: "Proven Expertise", body: "Decades of cross-industry consulting and project delivery." },
            { icon: Users, title: "Trusted Partnerships", body: "Direct alliances with leading global technology vendors." },
            { icon: Zap, title: "Outcome-Driven", body: "Cut complexity, maximize ROI, accelerate time-to-market." },
          ].map((f) => (
            <Card key={f.title} className="p-6 bg-card/60 border-border/60 hover:border-primary/50 transition shadow-card">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-card/40 border-y border-border/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-xs tracking-widest text-primary font-semibold mb-2">SERVED INDUSTRIES</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Specialists across the sectors that matter</h2>
          <p className="text-muted-foreground max-w-2xl">Consulting and training solutions tailored to your operating context — regardless of industry.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10">
            {industries?.map((ind) => {
              const I = (Icons as any)[ind.icon ? ind.icon.split("-").map((s: string) => s[0].toUpperCase() + s.slice(1)).join("") : "Building"] || Icons.Building;
              return (
                <Card key={ind.id} className="p-6 bg-background/60 border-border/60 hover:border-primary/50 hover:shadow-glow transition group">
                  <I className="h-7 w-7 text-primary mb-3 group-hover:scale-110 transition" />
                  <div className="font-display font-semibold uppercase tracking-wide">{ind.name}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-xs tracking-widest text-primary font-semibold mb-2">TESTIMONIALS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">What our clients say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6 bg-card/60 border-border/60 shadow-card">
                <Quote className="h-6 w-6 text-primary mb-3" />
                <p className="text-sm text-muted-foreground mb-4">{t.quote}</p>
                <div className="flex items-center gap-3">
                  {t.avatar_url && <img src={t.avatar_url} alt={t.name} className="h-10 w-10 rounded-full object-cover" />}
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="p-12 text-center bg-gradient-accent text-primary-foreground shadow-glow border-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't wait for opportunity. Create it.</h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-6">Let's discuss your next project — security, infrastructure, training, or end-to-end delivery.</p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Talk to an Expert <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>
    </SiteLayout>
  );
}
