import { Link } from "@tanstack/react-router";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export function Footer({ settings }: { settings?: { phone?: string; contact_email?: string; address?: string | null; whatsapp?: string } }) {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <Shield className="h-6 w-6 text-primary" />
            The Gate <span className="text-gradient">Guardian</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Consulting, training, coaching and project management for large-scale security and infrastructure projects across diverse industries.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Solutions</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Industries</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {settings?.phone && <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{settings.phone}</li>}
            {settings?.contact_email && <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{settings.contact_email}</li>}
            {settings?.address && <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{settings.address}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Gate Guardian. All rights reserved.
      </div>
    </footer>
  );
}
