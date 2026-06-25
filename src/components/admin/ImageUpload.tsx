import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

export function ImageUpload({ value, onChange, label }: { value?: string | null; onChange: (url: string) => void; label?: string }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Uploaded");
    } catch (e: any) { toast.error(e.message ?? "Upload failed"); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-2">
      {label && <div className="text-xs text-muted-foreground">{label}</div>}
      <div className="flex gap-2">
        <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="https://… or upload" />
        <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => ref.current?.click()}>
          <Upload className="h-4 w-4" />
        </Button>
        {value && <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}><X className="h-4 w-4" /></Button>}
        <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
      </div>
      {value && <img src={value} alt="" className="h-20 rounded border object-cover" />}
    </div>
  );
}
