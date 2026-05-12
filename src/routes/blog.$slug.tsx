import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  component: Post,
});

function Post() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog_post", slug],
    queryFn: async () => (await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle()).data,
  });
  return (
    <SiteLayout>
      <article className="container mx-auto px-4 py-20 max-w-3xl">
        {isLoading ? <p>Loading…</p> : !post ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/blog"><Button>Back to blog</Button></Link>
          </div>
        ) : (
          <>
            {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full aspect-video object-cover rounded-lg mb-8" />}
            <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            {post.published_at && <p className="text-sm text-muted-foreground mt-3">{new Date(post.published_at).toLocaleDateString()}</p>}
            <div className="mt-8 prose prose-invert max-w-none whitespace-pre-line text-muted-foreground">{post.content}</div>
          </>
        )}
      </article>
    </SiteLayout>
  );
}
