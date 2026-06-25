import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, ExternalLink, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages")({ component: PagesList });

function PagesList() {
  const nav = useNavigate();
  const { data, refetch } = useQuery({
    queryKey: ["admin_pages"],
    queryFn: async () => (await supabase.from("pages").select("*").order("sort_order")).data ?? [],
  });
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const create = async () => {
    if (!title || !slug) return toast.error("Title and slug required");
    const { data: row, error } = await supabase.from("pages").insert({ title, slug }).select().single();
    if (error) return toast.error(error.message);
    nav({ to: "/admin/pages/$id", params: { id: row.id } });
  };

  const togglePublish = async (id: string, published: boolean) => {
    const { error } = await supabase.from("pages").update({ published: !published }).eq("id", id);
    if (error) toast.error(error.message); else refetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this page and all its sections?")) return;
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) toast.error(error.message); else { refetch(); toast.success("Deleted"); }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground text-sm">Build custom pages with the section builder. Live at /p/&lt;slug&gt;.</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
          <Input placeholder="Page title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Slug (e.g. about-us)" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-z0-9-]/g, "-").toLowerCase())} />
          <Button onClick={create} className="bg-gradient-accent text-primary-foreground"><Plus className="h-4 w-4 mr-1" />Create</Button>
        </div>
      </Card>

      <div className="space-y-2">
        {data?.map((p) => (
          <Card key={p.id} className="p-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-muted-foreground">/p/{p.slug} {p.published ? "· Published" : "· Draft"}</div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => togglePublish(p.id, p.published)}>
              {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            {p.published && <Button size="sm" variant="ghost" asChild><a href={`/p/${p.slug}`} target="_blank" rel="noopener"><ExternalLink className="h-4 w-4" /></a></Button>}
            <Button size="sm" variant="ghost" asChild><Link to="/admin/pages/$id" params={{ id: p.id }}><Pencil className="h-4 w-4" /></Link></Button>
            <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </Card>
        ))}
        {(!data || data.length === 0) && <p className="text-muted-foreground text-sm">No pages yet. Create one above.</p>}
      </div>
    </div>
  );
}
