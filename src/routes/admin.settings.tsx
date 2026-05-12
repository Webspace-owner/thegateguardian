import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  const { data, refetch } = useQuery({ queryKey: ["site_settings_admin"], queryFn: async () => (await supabase.from("site_settings").select("*").eq("id",1).maybeSingle()).data });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  const save = async () => {
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    if (error) toast.error(error.message); else { toast.success("Saved"); refetch(); }
  };
  const F = (k: string, label: string, type: "input"|"textarea" = "input") => (
    <div><Label>{label}</Label>
      {type === "textarea"
        ? <Textarea rows={5} value={form[k] ?? ""} onChange={(e)=>setForm({...form,[k]:e.target.value})} />
        : <Input value={form[k] ?? ""} onChange={(e)=>setForm({...form,[k]:e.target.value})} />}
    </div>
  );
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      <Card className="p-6 space-y-4">
        {F("company_name","Company Name")}
        {F("tagline","Tagline (Hero title)")}
        {F("hero_subtitle","Hero subtitle")}
        {F("hero_image_url","Hero image URL (optional)")}
        {F("about_title","About title")}
        {F("about_body","About body","textarea")}
        <div className="grid md:grid-cols-2 gap-4">
          {F("phone","Phone")}
          {F("whatsapp","WhatsApp number")}
          {F("contact_email","Contact email")}
          {F("address","Address")}
        </div>
        {F("logo_url","Logo URL (optional)")}
        <Button onClick={save} className="bg-gradient-accent text-primary-foreground">Save changes</Button>
      </Card>
    </div>
  );
}
