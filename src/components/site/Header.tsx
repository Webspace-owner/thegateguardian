import { Link } from "@tanstack/react-router";
import { Shield, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Solutions" },
  { to: "/gallery", label: "Industries" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <Shield className="h-6 w-6 text-primary" />
          <span>The Gate <span className="text-gradient">Guardian</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {phone && (
            <a href={`tel:${phone}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Phone className="h-4 w-4" /> {phone}
            </a>
          )}
          <Button asChild size="sm" className="bg-gradient-accent text-primary-foreground shadow-glow">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/50 px-4 py-3 space-y-2">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 text-sm">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)}>
            <Button className="w-full bg-gradient-accent text-primary-foreground">Contact Us</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
