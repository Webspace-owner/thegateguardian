import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Inbox, FileText, Image, MessageSquare, Building2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function useCount(table: any, filter?: { column: string; value: any }) {
  return useQuery({
    queryKey: ["count", table, filter],
    queryFn: async () => {
      let q: any = supabase.from(table).select("*", { count: "exact", head: true });
      if (filter) q = q.eq(filter.column, filter.value);
      const { count } = await q;
      return (count ?? 0) as number;
    },
  });
}

function Dashboard() {
  const subs = useCount("contact_submissions");
  const unread = useCount("contact_submissions", { column: "read", value: false });
  const posts = useCount("blog_posts");
  const gal = useCount("gallery_items");
  const tst = useCount("testimonials");
  const ind = useCount("industries");

  const stats = [
    { label: "Submissions", value: subs.data, link: "/admin/submissions", icon: Inbox, sub: `${unread.data ?? 0} unread` },
    { label: "Blog Posts", value: posts.data, link: "/admin/blog", icon: FileText },
    { label: "Gallery", value: gal.data, link: "/admin/gallery", icon: Image },
    { label: "Testimonials", value: tst.data, link: "/admin/testimonials", icon: MessageSquare },
    { label: "Industries", value: ind.data, link: "/admin/industries", icon: Building2 },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your site content.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.link as any}>
            <Card className="p-6 hover:border-primary/50 transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="text-3xl font-bold mt-2">{s.value ?? "—"}</div>
                  {s.sub && <div className="text-xs text-primary mt-1">{s.sub}</div>}
                </div>
                <s.icon className="h-6 w-6 text-primary" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
