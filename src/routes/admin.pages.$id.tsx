import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SECTION_TYPES, SECTION_MAP, type SectionDef, type SectionField } from "@/lib/sections";
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, Plus, Eye, EyeOff, ExternalLink, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages/$id")({ component: Editor });

function Field({ field, value, onChange }: { field: SectionField; value: any; onChange: (v: any) => void }) {
  if (field.type === "textarea") return <Textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  if (field.type === "image") return <ImageUpload value={value} onChange={onChange} />;
  if (field.type === "checkbox") return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {field.label}</label>;
  if (field.type === "select") return (
    <Select value={value ?? ""} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
      <SelectContent>{field.options?.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );
  return <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
}

function SectionEditor({ section, def, onChange, onDelete, onMove, onToggle }: {
  section: any; def: SectionDef;
  onChange: (data: any) => void; onDelete: () => void;
  onMove: (dir: -1 | 1) => void; onToggle: () => void;
}) {
  const data = section.data ?? {};
  const updateField = (key: string, v: any) => onChange({ ...data, [key]: v });
  const items: any[] = data.items ?? [];
  const updateItem = (i: number, patch: any) => {
    const next = [...items]; next[i] = { ...next[i], ...patch };
    onChange({ ...data, items: next });
  };
  const addItem = () => onChange({ ...data, items: [...items, {}] });
  const removeItem = (i: number) => onChange({ ...data, items: items.filter((_, j) => j !== i) });
  const moveItem = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= items.length) return;
    const next = [...items]; [next[i], next[j]] = [next[j], next[i]];
    onChange({ ...data, items: next });
  };

  return (
    <Card className={`p-4 ${section.visible ? "" : "opacity-60"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-display font-semibold">{def.label} <span className="text-xs text-muted-foreground">· {section.type}</span></div>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={() => onMove(-1)}><ArrowUp className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={() => onMove(1)}><ArrowDown className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={onToggle}>{section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
          <Button size="sm" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {def.fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
            <Label className="text-xs">{f.label}</Label>
            <Field field={f} value={data[f.key]} onChange={(v) => updateField(f.key, v)} />
          </div>
        ))}
      </div>

      {def.items && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">{def.items.label}s</div>
            <Button size="sm" variant="outline" onClick={addItem}><Plus className="h-4 w-4 mr-1" />Add {def.items.label}</Button>
          </div>
          <div className="space-y-2">
            {items.map((it, i) => (
              <Card key={i} className="p-3 bg-muted/30">
                <div className="flex justify-between mb-2">
                  <div className="text-xs text-muted-foreground">#{i + 1}</div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => moveItem(i, -1)}><ArrowUp className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => moveItem(i, 1)}><ArrowDown className="h-3 w-3" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => removeItem(i)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {def.items!.fields.map((f) => (
                    <div key={f.key} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
                      <Label className="text-xs">{f.label}</Label>
                      <Field field={f} value={it[f.key]} onChange={(v) => updateItem(i, { [f.key]: v })} />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            {items.length === 0 && <p className="text-xs text-muted-foreground">No items yet.</p>}
          </div>
        </div>
      )}
    </Card>
  );
}

function Editor() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const { data: page, refetch: refetchPage } = useQuery({
    queryKey: ["admin_page", id],
    queryFn: async () => (await supabase.from("pages").select("*").eq("id", id).maybeSingle()).data,
  });
  const { data: sections, refetch: refetchSections } = useQuery({
    queryKey: ["admin_page_sections", id],
    queryFn: async () => (await supabase.from("page_sections").select("*").eq("page_id", id).order("sort_order")).data ?? [],
  });

  const [pageForm, setPageForm] = useState<any>({});
  useEffect(() => { if (page) setPageForm(page); }, [page]);
  const [newType, setNewType] = useState("hero");

  const savePage = async () => {
    const { json_ld, ...rest } = pageForm;
    let parsed: any = null;
    if (json_ld) { try { parsed = typeof json_ld === "string" ? JSON.parse(json_ld) : json_ld; } catch { return toast.error("Invalid JSON-LD"); } }
    const { error } = await supabase.from("pages").update({ ...rest, json_ld: parsed }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Page saved"); refetchPage(); }
  };

  const addSection = async () => {
    const sort_order = (sections?.length ?? 0) * 10;
    const { error } = await supabase.from("page_sections").insert({ page_id: id, type: newType, sort_order, data: {} });
    if (error) toast.error(error.message); else refetchSections();
  };

  const updateSection = async (sid: string, patch: any) => {
    const { error } = await supabase.from("page_sections").update(patch).eq("id", sid);
    if (error) toast.error(error.message); else qc.invalidateQueries({ queryKey: ["admin_page_sections", id] });
  };

  const deleteSection = async (sid: string) => {
    if (!confirm("Delete section?")) return;
    const { error } = await supabase.from("page_sections").delete().eq("id", sid);
    if (error) toast.error(error.message); else refetchSections();
  };

  const moveSection = async (sid: string, dir: -1 | 1) => {
    if (!sections) return;
    const i = sections.findIndex((s) => s.id === sid); const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const a = sections[i], b = sections[j];
    await supabase.from("page_sections").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("page_sections").update({ sort_order: a.sort_order }).eq("id", b.id);
    refetchSections();
  };

  if (!page) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="ghost"><Link to="/admin/pages"><ArrowLeft className="h-4 w-4" /></Link></Button>
          <h1 className="text-2xl font-bold">{pageForm.title}</h1>
          <span className="text-xs text-muted-foreground">/p/{pageForm.slug}</span>
        </div>
        {pageForm.published && <Button size="sm" variant="outline" asChild><a href={`/p/${pageForm.slug}`} target="_blank" rel="noopener"><ExternalLink className="h-4 w-4 mr-1" />View</a></Button>}
      </div>

      <Tabs defaultValue="sections">
        <TabsList>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="settings">Page settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <Card className="p-4 flex items-end gap-3">
            <div className="flex-1">
              <Label className="text-xs">Add section</Label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SECTION_TYPES.map((s) => <SelectItem key={s.type} value={s.type}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button onClick={addSection} className="bg-gradient-accent text-primary-foreground"><Plus className="h-4 w-4 mr-1" />Add</Button>
          </Card>

          {sections?.map((s) => {
            const def = SECTION_MAP[s.type]; if (!def) return null;
            return (
              <SectionEditor key={s.id} section={s} def={def}
                onChange={(data) => updateSection(s.id, { data })}
                onDelete={() => deleteSection(s.id)}
                onMove={(d) => moveSection(s.id, d)}
                onToggle={() => updateSection(s.id, { visible: !s.visible })} />
            );
          })}
          {(!sections || sections.length === 0) && <p className="text-sm text-muted-foreground">No sections yet — add one above.</p>}
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 space-y-4 max-w-2xl">
            <div><Label>Title</Label><Input value={pageForm.title ?? ""} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={pageForm.slug ?? ""} onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })} /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!pageForm.published} onChange={(e) => setPageForm({ ...pageForm, published: e.target.checked })} /> Published</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!pageForm.show_in_nav} onChange={(e) => setPageForm({ ...pageForm, show_in_nav: e.target.checked })} /> Show in main navigation</label>
            <div><Label>Nav sort order</Label><Input type="number" value={pageForm.sort_order ?? 0} onChange={(e) => setPageForm({ ...pageForm, sort_order: Number(e.target.value) })} /></div>
            <Button onClick={savePage} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save</Button>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card className="p-6 space-y-4 max-w-2xl">
            <div><Label>Meta title</Label><Input value={pageForm.meta_title ?? ""} onChange={(e) => setPageForm({ ...pageForm, meta_title: e.target.value })} placeholder="Falls back to page title" /></div>
            <div><Label>Meta description</Label><Textarea rows={3} value={pageForm.meta_description ?? ""} onChange={(e) => setPageForm({ ...pageForm, meta_description: e.target.value })} /></div>
            <div><Label>OG image</Label><ImageUpload value={pageForm.og_image} onChange={(v) => setPageForm({ ...pageForm, og_image: v })} /></div>
            <div><Label>Canonical URL</Label><Input value={pageForm.canonical_url ?? ""} onChange={(e) => setPageForm({ ...pageForm, canonical_url: e.target.value })} placeholder="Defaults to /p/<slug>" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!pageForm.noindex} onChange={(e) => setPageForm({ ...pageForm, noindex: e.target.checked })} /> noindex (hide from search engines)</label>
            <div><Label>JSON-LD structured data</Label><Textarea rows={6} value={typeof pageForm.json_ld === "object" ? JSON.stringify(pageForm.json_ld, null, 2) : (pageForm.json_ld ?? "")} onChange={(e) => setPageForm({ ...pageForm, json_ld: e.target.value })} placeholder='{"@context":"https://schema.org","@type":"FAQPage"}' /></div>
            <Button onClick={savePage} className="bg-gradient-accent text-primary-foreground"><Save className="h-4 w-4 mr-1" />Save SEO</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
