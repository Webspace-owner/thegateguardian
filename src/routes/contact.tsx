import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Gate Guardian" },
      { name: "description", content: "Get in touch with The Gate Guardian — let's discuss your project." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message required").max(2000),
});

function Contact() {
  const { data: settings } = useQuery({ queryKey: ["site_settings"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id",1).maybeSingle()).data });
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
    } else {
      toast.success("Thanks! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const wa = settings?.whatsapp?.replace(/\D/g, "");
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">GET IN TOUCH</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">Let's talk about your project</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">Tell us a bit about what you need. Our team will follow up within one business day.</p>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="space-y-4">
            {settings?.phone && (
              <Card className="p-5 bg-card/60 flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div><div className="text-sm text-muted-foreground">Phone</div><a href={`tel:${settings.phone}`} className="font-semibold">{settings.phone}</a></div>
              </Card>
            )}
            {settings?.contact_email && (
              <Card className="p-5 bg-card/60 flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div><div className="text-sm text-muted-foreground">Email</div><a href={`mailto:${settings.contact_email}`} className="font-semibold">{settings.contact_email}</a></div>
              </Card>
            )}
            {wa && (
              <Card className="p-5 bg-card/60 flex items-start gap-4">
                <MessageCircle className="h-5 w-5 text-primary mt-1" />
                <div><div className="text-sm text-muted-foreground">WhatsApp</div><a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="font-semibold">Message us</a></div>
              </Card>
            )}
            {settings?.address && (
              <Card className="p-5 bg-card/60 flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div><div className="text-sm text-muted-foreground">Address</div><div className="font-semibold">{settings.address}</div></div>
              </Card>
            )}
          </div>

          <Card className="p-8 bg-card/60 lg:col-span-2">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Name *</Label><Input id="name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} maxLength={100} required /></div>
                <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} maxLength={255} required /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} maxLength={50} /></div>
                <div><Label htmlFor="subject">Subject</Label><Input id="subject" value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} maxLength={150} /></div>
              </div>
              <div><Label htmlFor="message">Message *</Label><Textarea id="message" rows={6} value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} maxLength={2000} required /></div>
              <Button type="submit" disabled={submitting} className="bg-gradient-accent text-primary-foreground shadow-glow">
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
