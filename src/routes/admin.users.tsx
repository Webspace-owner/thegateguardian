import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: Users });

function Users() {
  const { data, refetch } = useQuery({
    queryKey: ["users_with_roles"],
    queryFn: async () => {
      const [{ data: profiles }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("user_roles").select("*"),
      ]);
      return (profiles ?? []).map((p) => ({ ...p, roles: (roles ?? []).filter(r => r.user_id === p.id).map(r => r.role) }));
    },
  });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");

  const grantByEmail = async () => {
    const { data: prof } = await supabase.from("profiles").select("id").eq("email", email).maybeSingle();
    if (!prof) return toast.error("No user found with that email (they must sign up first)");
    const { error } = await supabase.from("user_roles").insert({ user_id: prof.id, role });
    if (error) toast.error(error.message); else { toast.success("Role granted"); setEmail(""); refetch(); }
  };
  const revoke = async (user_id: string, role: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("user_id", user_id).eq("role", role as any);
    if (error) toast.error(error.message); else refetch();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold">Users & Roles</h1>
      <Card className="p-6 space-y-3">
        <h2 className="font-semibold">Grant role by email</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2"><Label>User email</Label><Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="user@example.com" /></div>
          <div>
            <Label>Role</Label>
            <select className="w-full p-2 rounded border bg-input" value={role} onChange={(e)=>setRole(e.target.value as any)}>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <Button onClick={grantByEmail} className="bg-gradient-accent text-primary-foreground">Grant role</Button>
        <p className="text-xs text-muted-foreground">The user must sign up first via the /auth page; then you can grant them a role here.</p>
      </Card>

      <div className="space-y-3">
        {data?.map((u: any) => (
          <Card key={u.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.full_name || u.email}</div>
              <div className="text-xs text-muted-foreground">{u.email}</div>
            </div>
            <div className="flex gap-2">
              {u.roles.map((r: string) => (
                <button key={r} onClick={()=>revoke(u.id, r)} className="text-xs px-2 py-1 rounded bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive transition" title="Click to revoke">{r} ✕</button>
              ))}
              {u.roles.length === 0 && <span className="text-xs text-muted-foreground">no roles</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
