import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — The Gate Guardian" },
      { name: "description", content: "Articles on cybersecurity, infrastructure, and project delivery." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const { data: posts } = useQuery({
    queryKey: ["blog_posts_public"],
    queryFn: async () => (await supabase.from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false })).data ?? [],
  });
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">OUR BLOG</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">Insights & articles</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">Check our articles to discover more.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {(!posts || posts.length === 0) && (
            <p className="text-muted-foreground col-span-full">No published posts yet.</p>
          )}
          {posts?.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }}>
              <Card className="overflow-hidden bg-card/60 border-border/60 hover:border-primary/50 transition h-full">
                {p.cover_image && <img src={p.cover_image} alt={p.title} loading="lazy" className="w-full aspect-video object-cover" />}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {p.published_at && new Date(p.published_at).toLocaleDateString()}
                  </div>
                  <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
