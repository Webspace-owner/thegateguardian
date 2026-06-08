import { Link } from "@tanstack/react-router";
import { ShieldCheck, Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/gallery", label: "Projects" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ phone, logoUrl }: { phone?: string; whatsapp?: string; logoUrl?: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong" : "bg-transparent"}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          {logoUrl ? (
            <img src={logoUrl} alt="The Gate Guardian" className="h-10 w-auto object-contain" />
          ) : (
            <>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-gold blur-md opacity-60 group-hover:opacity-100 transition" />
                <div className="relative h-9 w-9 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Gate <span className="text-gradient-gold">Guardian</span>
              </span>
            </>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm px-4 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition"
              activeProps={{ className: "text-primary-foreground bg-gradient-gold !hover:bg-gradient-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {phone && (
            <a href={`tel:${phone}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
              <Phone className="h-4 w-4" /> {phone}
            </a>
          )}
          <Button asChild size="sm" className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full font-semibold shadow-glow">
            <Link to="/contact">Get Started <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <button className="lg:hidden p-2 rounded-lg glass" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-border/30 px-4 py-4 space-y-1 animate-fade-in">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg hover:bg-foreground/5 text-sm">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="block pt-2">
            <Button className="w-full bg-gradient-gold text-primary-foreground rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
