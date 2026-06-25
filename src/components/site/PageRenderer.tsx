import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = { id: string; type: string; visible: boolean; data: any };

function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && (Icons as any)[name]) || Icons.Sparkles;
  return <C className={className} />;
}

export function PageRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.filter((s) => s.visible).map((s) => {
        const d = s.data ?? {};
        switch (s.type) {
          case "hero":
            return (
              <section key={s.id} className="relative overflow-hidden">
                {d.image && <div className="absolute inset-0"><img src={d.image} alt="" className="w-full h-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" /></div>}
                <div className={`container mx-auto px-4 py-24 md:py-32 relative ${d.align === "center" ? "text-center" : ""}`}>
                  {d.eyebrow && <p className="text-sm uppercase tracking-widest text-primary mb-3">{d.eyebrow}</p>}
                  {d.title && <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">{d.title}</h1>}
                  {d.subtitle && <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl whitespace-pre-line">{d.subtitle}</p>}
                  {(d.cta_label || d.cta2_label) && (
                    <div className={`mt-8 flex flex-wrap gap-3 ${d.align === "center" ? "justify-center" : ""}`}>
                      {d.cta_label && <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground rounded-full"><a href={d.cta_href || "#"}>{d.cta_label}</a></Button>}
                      {d.cta2_label && <Button asChild size="lg" variant="outline" className="rounded-full"><a href={d.cta2_href || "#"}>{d.cta2_label}</a></Button>}
                    </div>
                  )}
                </div>
              </section>
            );
          case "text":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16 md:py-24">
                <div className={`max-w-3xl ${d.align === "center" ? "mx-auto text-center" : ""}`}>
                  {d.title && <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{d.title}</h2>}
                  {d.body && <div className="space-y-4 text-muted-foreground leading-relaxed">{String(d.body).split(/\n\n+/).map((p: string, i: number) => <p key={i}>{p}</p>)}</div>}
                </div>
              </section>
            );
          case "features":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16 md:py-24">
                {d.title && <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">{d.title}</h2>}
                {d.subtitle && <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{d.subtitle}</p>}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(d.items ?? []).map((it: any, i: number) => (
                    <div key={i} className="glass p-6 rounded-2xl">
                      <Icon name={it.icon} className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-display font-semibold text-lg mb-2">{it.title}</h3>
                      <p className="text-sm text-muted-foreground">{it.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          case "gallery":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16 md:py-24">
                {d.title && <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">{d.title}</h2>}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(d.items ?? []).map((it: any, i: number) => (
                    <figure key={i} className="overflow-hidden rounded-2xl group">
                      {it.image && <img src={it.image} alt={it.caption || ""} className="w-full h-64 object-cover group-hover:scale-105 transition" />}
                      {it.caption && <figcaption className="p-3 text-sm text-muted-foreground">{it.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            );
          case "cta":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16">
                <div className="glass-strong rounded-3xl p-10 md:p-16 text-center">
                  {d.title && <h2 className="font-display text-3xl md:text-5xl font-bold">{d.title}</h2>}
                  {d.subtitle && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{d.subtitle}</p>}
                  {d.button_label && <Button asChild size="lg" className="mt-8 bg-gradient-gold text-primary-foreground rounded-full"><a href={d.button_href || "#"}>{d.button_label}</a></Button>}
                </div>
              </section>
            );
          case "testimonials":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16 md:py-24">
                {d.title && <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">{d.title}</h2>}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(d.items ?? []).map((it: any, i: number) => (
                    <blockquote key={i} className="glass p-6 rounded-2xl">
                      <p className="text-muted-foreground italic">“{it.quote}”</p>
                      <footer className="mt-4 text-sm"><span className="font-semibold">{it.name}</span>{it.role && <span className="text-muted-foreground"> · {it.role}</span>}</footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            );
          case "logos":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16">
                {d.title && <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8">{d.title}</h3>}
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                  {(d.items ?? []).map((it: any, i: number) => it.logo
                    ? <img key={i} src={it.logo} alt={it.name} className="h-10 object-contain" />
                    : <span key={i} className="font-display font-semibold text-lg">{it.name}</span>)}
                </div>
              </section>
            );
          case "faq":
            return (
              <section key={s.id} className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
                {d.title && <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">{d.title}</h2>}
                <div className="space-y-4">
                  {(d.items ?? []).map((it: any, i: number) => (
                    <details key={i} className="glass p-5 rounded-xl">
                      <summary className="font-semibold cursor-pointer">{it.q}</summary>
                      <p className="mt-3 text-muted-foreground whitespace-pre-line">{it.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
          case "html":
            return <section key={s.id} className="container mx-auto px-4 py-12" dangerouslySetInnerHTML={{ __html: d.html || "" }} />;
          default:
            return null;
        }
      })}
    </>
  );
}
