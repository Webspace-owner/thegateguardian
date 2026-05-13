import { Link } from "@tanstack/react-router";
import { ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Facebook } from "lucide-react";

export function Footer({ settings }: { settings?: { phone?: string; contact_email?: string; address?: string | null; whatsapp?: string; logo_url?: string | null } }) {
  return (
    <footer className="relative mt-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-mesh pointer-events-none" />

      <div className="relative container mx-auto px-4 pt-20 pb-10">
        {/* CTA banner */}
        <div className="relative glass-strong rounded-3xl p-10 md:p-14 mb-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-violet rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-gold rounded-full blur-3xl opacity-20" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Let's collaborate</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Ready to build a <span className="text-gradient-gold">safer tomorrow?</span>
              </h3>
            </div>
            <Link to="/contact" className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-4 rounded-full font-semibold shadow-glow hover:scale-105 transition">
              Talk to an expert <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="The Gate Guardian" className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <div className="h-9 w-9 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-display font-bold text-lg">Gate <span className="text-gradient-gold">Guardian</span></span>
                </>
              )}
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Strategic consulting, training, and end-to-end project delivery for security and infrastructure programs across the world's most demanding industries.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[Linkedin, Twitter, Facebook].map((I, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-primary/80">Explore</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition">Solutions</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition">Insights</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-primary/80">Reach Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {settings?.phone && <li className="flex items-center gap-3"><span className="h-8 w-8 rounded-full glass flex items-center justify-center"><Phone className="h-3.5 w-3.5 text-primary" /></span>{settings.phone}</li>}
              {settings?.contact_email && <li className="flex items-center gap-3"><span className="h-8 w-8 rounded-full glass flex items-center justify-center"><Mail className="h-3.5 w-3.5 text-primary" /></span>{settings.contact_email}</li>}
              {settings?.address && <li className="flex items-start gap-3"><span className="h-8 w-8 rounded-full glass flex items-center justify-center shrink-0"><MapPin className="h-3.5 w-3.5 text-primary" /></span><span>{settings.address}</span></li>}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} The Gate Guardian. Crafted with precision.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">Privacy</a>
            <a href="#" className="hover:text-primary transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
