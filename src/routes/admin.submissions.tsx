import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/submissions")({ component: Submissions });

function Submissions() {
  const { data, refetch } = useQuery({ queryKey: ["submissions"], queryFn: async () => (await supabase.from("contact_submissions").select("*").order("created_at",{ascending:false})).data ?? [] });
  const toggleRead = async (id: string, read: boolean) => { await supabase.from("contact_submissions").update({ read }).eq("id", id); refetch(); };
  const del = async (id: string) => { if (!confirm("Delete?")) return; const { error } = await supabase.from("contact_submissions").delete().eq("id", id); if (error) toast.error(error.message); else refetch(); };
  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-3xl font-bold">Contact Submissions</h1>
      {data?.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
      {data?.map((s) => (
        <Card key={s.id} className={`p-5 ${!s.read ? "border-primary/50" : ""}`}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{s.name}</span>
                <a href={`mailto:${s.email}`} className="text-sm text-primary flex items-center gap-1"><Mail className="h-3 w-3" />{s.email}</a>
                {s.phone && <span className="text-sm text-muted-foreground">· {s.phone}</span>}
                {!s.read && <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">New</span>}
              </div>
              {s.subject && <div className="text-sm font-medium mt-1">{s.subject}</div>}
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{s.message}</p>
              <div className="text-xs text-muted-foreground mt-2">{new Date(s.created_at).toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" onClick={()=>toggleRead(s.id, !s.read)}>{s.read ? "Mark unread" : "Mark read"}</Button>
              <Button size="sm" variant="ghost" onClick={()=>del(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
