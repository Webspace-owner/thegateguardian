import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Field = { key: string; label: string; type?: "text" | "textarea" | "number" | "checkbox" | "image" };

export function CrudList({ table, title, fields, orderBy = "sort_order" }: { table: string; title: string; fields: Field[]; orderBy?: string }) {
  const { data, refetch } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data } = await (supabase.from(table as any) as any).select("*").order(orderBy);
      return (data ?? []) as any[];
    },
  });
  const [draft, setDraft] = useState<any>({});

  const add = async () => {
    const { error } = await (supabase.from(table as any) as any).insert(draft);
    if (error) return toast.error(error.message);
    setDraft({}); refetch(); toast.success("Added");
  };
  const update = async (id: string, patch: any) => {
    const { error } = await (supabase.from(table as any) as any).update(patch).eq("id", id);
    if (error) toast.error(error.message); else refetch();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
    if (error) toast.error(error.message); else { refetch(); toast.success("Deleted"); }
  };

  const renderField = (f: Field, value: any, onChange: (v: any) => void) => {
    if (f.type === "textarea") return <textarea className="w-full p-2 rounded border bg-input text-sm" rows={3} value={value ?? ""} onChange={(e)=>onChange(e.target.value)} placeholder={f.label} />;
    if (f.type === "checkbox") return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!value} onChange={(e)=>onChange(e.target.checked)} /> {f.label}</label>;
    if (f.type === "number") return <Input type="number" value={value ?? ""} onChange={(e)=>onChange(e.target.value === "" ? null : Number(e.target.value))} placeholder={f.label} />;
    if (f.type === "image") return <ImageUpload label={f.label} value={value} onChange={onChange} />;
    return <Input value={value ?? ""} onChange={(e)=>onChange(e.target.value)} placeholder={f.label} />;
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Card className="p-4">
        <div className="grid md:grid-cols-2 gap-3">
          {fields.map((f) => <div key={f.key}>{renderField(f, draft[f.key], (v)=>setDraft({...draft,[f.key]:v}))}</div>)}
        </div>
        <Button onClick={add} className="mt-3 bg-gradient-accent text-primary-foreground"><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </Card>
      <div className="space-y-3">
        {data?.map((row) => (
          <Card key={row.id} className="p-4">
            <div className="grid md:grid-cols-2 gap-3">
              {fields.map((f) => <div key={f.key}>{renderField(f, row[f.key], (v)=>update(row.id,{[f.key]:v}))}</div>)}
            </div>
            <div className="flex justify-end mt-3">
              <Button size="sm" variant="ghost" onClick={()=>remove(row.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </Card>
        ))}
        {(!data || data.length === 0) && <p className="text-muted-foreground text-sm">No items yet.</p>}
      </div>
    </div>
  );
}
