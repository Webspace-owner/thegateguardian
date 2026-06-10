import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShieldCheck, Quote, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import heroImg from "@/assets/hero-cyber.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gate Guardian — Guarding Your Data, Safeguarding Your Future" },
      { name: "description", content: "Consulting, Training, Coaching and Project Management for large scale projects across manufacturing, finance, government, oil & gas, and more." },
      { property: "og:title", content: "The Gate Guardian" },
      { property: "og:description", content: "Protecting What Matters Most — Empowering Security, Ensuring Trust." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: settings } = useQuery({ queryKey: ["site_settings"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle()).data });
  const { data: industries } = useQuery({ queryKey: ["industries"], queryFn: async () => (await supabase.from("industries").select("*").order("sort_order")).data ?? [] });
  const { data: testimonials } = useQuery({ queryKey: ["testimonials"], queryFn: async () => (await supabase.from("testimonials").select("*").order("sort_order")).data ?? [] });
  const { data: scope } = useQuery({ queryKey: ["scope_items"], queryFn: async () => (await supabase.from("scope_items").select("*").order("sort_order")).data ?? [] });
  const { data: gallery } = useQuery({ queryKey: ["gallery_items"], queryFn: async () => (await supabase.from("gallery_items").select("*").order("sort_order")).data ?? [] });

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-violet rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-gradient-gold rounded-full blur-3xl opacity-20 animate-float-delayed" />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="container relative mx-auto px-4 pt-20 pb-32 md:pt-28 md:pb-40">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] tracking-tight">
                Guarding Your Data,
                <br />
                <span className="text-gradient-gold">Safeguarding Your Future</span>
              </h1>

              <p className="mt-7 text-2xl md:text-3xl font-display font-semibold">
                Protecting What Matters Most
              </p>
              <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Empowering Security, Ensuring Trust.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full font-semibold shadow-glow text-base h-14 px-8">
                  <Link to="/contact">Contact Us <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                {settings?.whatsapp && (
                  <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener">
                    <Button size="lg" variant="outline" className="rounded-full glass border-border/50 hover:bg-foreground/5 text-base h-14 px-8">
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-violet blur-3xl opacity-30 rounded-full" />
              <div className="relative glass-strong rounded-3xl p-3 shadow-glow">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src={settings?.hero_image_url || heroImg} alt="The Gate Guardian" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="glass rounded-full h-9 w-9 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTIONS / ABOUT */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
            <span className="h-px w-8 bg-primary" /> Our Solutions
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            {settings?.about_title || "THE GATE GUARDIAN GROUP"}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed text-center">
            {settings?.about_body}
          </p>
        </div>
      </section>

      {/* OUR SERVED INDUSTRIES */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Our Served Industries
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              We are specialists who can provide consultant and training solutions for your challenging needs.
            </h2>
            <p className="text-muted-foreground text-lg">Regardless of your industry.</p>
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

      {/* SCOPE OF WORK */}
      {scope && scope.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Scope Of Work
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">What we deliver, end to end.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scope.map((s, i) => (
              <div key={s.id} className="glass rounded-2xl p-6 flex items-start gap-4 hover:-translate-y-1 transition">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center font-display font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="font-medium">{s.title}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DON'T WAIT CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-gold" />
          <div className="absolute inset-0 grid-pattern opacity-30 mix-blend-overlay" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              DON'T WAIT<br />FOR OPPORTUNITY<br />CREATE MOTIVATIONAL
            </h2>
          </div>
        </div>
      </section>

      {/* OUR SUCCESS STORIES — INDUSTRY CONNECTED GALLERY */}
      {gallery && gallery.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Our Success Stories
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">We've got you industry connected.</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {gallery.map((g) => (
              <div key={g.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass">
                <img src={g.image_url} alt={g.caption ?? ""} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                {g.caption && (
                  <div className="absolute bottom-4 left-4 right-4 font-display font-bold uppercase tracking-wide">
                    {g.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
              <span className="h-px w-8 bg-primary" /> Our Client's Testimonials
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">What our clients say.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div key={t.id} className="relative glass rounded-3xl p-7 hover:-translate-y-1 transition-all duration-500">
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

      {/* PARTNERS */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            <span className="h-px w-8 bg-primary" /> Sample of Our Partners <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Trusted Technology Alliances</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {[
            "Cisco","Diebold Nixdorf","Oracle","Microsoft","Micro Focus","VMware","Kony","UiPath",
            "Forcepoint","Symantec","HID","Extron","ParkHelp","SAS","F5","Dell Technologies",
            "Palo Alto","Citrix","Commvault","Genesys","Schneider Electric","GE","Vertiv","Barco",
            "Crestron","Akamai","Veritas","Veeam","Riverbed","Arbor","Leviton","FireMon",
            "Nominum","AppDynamics","Infoblox","Kaspersky","FireEye","Tenable","Fortinet","Gigamon",
            "Ixia","Sandvine","Sharp","NPT","Splunk","StealthBits","McAfee","Fiorano",
            "VBrick","SEDCO","Quest","Infor","Incorta","OpenText","SailPoint",
          ].map((name) => (
            <div
              key={name}
              className="aspect-[3/2] glass rounded-xl flex items-center justify-center px-2 text-center text-xs md:text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
            >
              {name}
            </div>
          ))}
        </div>
      </section>


      <section className="container mx-auto px-4 pb-24">
        <div className="relative rounded-[2rem] overflow-hidden p-12 md:p-20 text-center glass">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Ready to start your next project?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            We're happy to answer any questions and help you determine which of our services best fit your needs.
          </p>
          <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground rounded-full font-semibold h-14 px-10 text-base">
            <Link to="/contact">Contact Us <ArrowUpRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
