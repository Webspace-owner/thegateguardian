import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/seo")({ component: SeoAdmin });

function SeoAdmin() {
  const { data, refetch } = useQuery({
    queryKey: ["seo_settings_admin"],
    queryFn: async () => (await supabase.from("seo_settings").select("*").eq("id", 1).maybeSingle()).data,
  });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = async () => {
    let org = form.org_jsonld;
    if (typeof org === "string") { try { org = JSON.parse(org); } catch { return toast.error("Invalid Organization JSON-LD"); } }
    const { error } = await supabase.from("seo_settings").update({ ...form, org_jsonld: org }).eq("id", 1);
    if (error) toast.error(error.message); else { toast.success("Saved"); refetch(); }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SEO</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild><a href="/sitemap.xml" target="_blank" rel="noopener"><ExternalLink className="h-4 w-4 mr-1" />sitemap.xml</a></Button>
          <Button size="sm" variant="outline" asChild><a href="/robots.txt" target="_blank" rel="noopener"><ExternalLink className="h-4 w-4 mr-1" />robots.txt</a></Button>
        </div>
      </div>

      <Tabs defaultValue="meta">
        <TabsList>
          <TabsTrigger value="meta">Meta defaults</TabsTrigger>
          <TabsTrigger value="social">Social / OG</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="crawlers">Robots & sitemap</TabsTrigger>
          <TabsTrigger value="verify">Verification & analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="meta">
          <Card className="p-6 space-y-4">
            <div><Label>Default meta title</Label><Input value={form.default_meta_title ?? ""} onChange={(e) => setForm({ ...form, default_meta_title: e.target.value })} /></div>
            <div><Label>Default meta description</Label><Textarea rows={3} value={form.default_meta_description ?? ""} onChange={(e) => setForm({ ...form, default_meta_description: e.target.value })} /></div>
            <div><Label>Canonical base URL</Label><Input value={form.canonical_base_url ?? ""} onChange={(e) => setForm({ ...form, canonical_base_url: e.target.value })} /></div>
            <Button onClick={save} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="p-6 space-y-4">
            <div><Label>Default OG image (shown when sharing)</Label><ImageUpload value={form.default_og_image} onChange={(v) => setForm({ ...form, default_og_image: v })} /></div>
            <div><Label>Twitter handle (e.g. @gateguardian)</Label><Input value={form.twitter_handle ?? ""} onChange={(e) => setForm({ ...form, twitter_handle: e.target.value })} /></div>
            <div><Label>Twitter card type</Label><Input value={form.twitter_card ?? ""} onChange={(e) => setForm({ ...form, twitter_card: e.target.value })} placeholder="summary_large_image" /></div>
            <Button onClick={save} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>

        <TabsContent value="schema">
          <Card className="p-6 space-y-4">
            <div>
              <Label>Organization JSON-LD (sitewide)</Label>
              <Textarea rows={12} className="font-mono text-xs"
                value={typeof form.org_jsonld === "object" ? JSON.stringify(form.org_jsonld, null, 2) : (form.org_jsonld ?? "")}
                onChange={(e) => setForm({ ...form, org_jsonld: e.target.value })} />
            </div>
            <p className="text-xs text-muted-foreground">Article and FAQ schema can be added per-page from the page editor → SEO tab.</p>
            <Button onClick={save} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>

        <TabsContent value="crawlers">
          <Card className="p-6 space-y-4">
            <div>
              <Label>robots.txt</Label>
              <Textarea rows={10} className="font-mono text-xs" value={form.robots_txt ?? ""} onChange={(e) => setForm({ ...form, robots_txt: e.target.value })} />
              <p className="text-xs text-muted-foreground mt-2">Served at <code>/robots.txt</code>. The sitemap auto-includes all published pages, industries and blog posts.</p>
            </div>
            <Button onClick={save} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card className="p-6 space-y-4">
            <div><Label>Google site verification token</Label><Input value={form.google_site_verification ?? ""} onChange={(e) => setForm({ ...form, google_site_verification: e.target.value })} placeholder="abc123..." /></div>
            <div><Label>Google Analytics measurement ID</Label><Input value={form.google_analytics_id ?? ""} onChange={(e) => setForm({ ...form, google_analytics_id: e.target.value })} placeholder="G-XXXXXXXXXX" /></div>
            <Button onClick={save} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
