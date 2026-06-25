import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageRenderer } from "@/components/site/PageRenderer";

export const Route = createFileRoute("/p/$slug")({
  component: PublicPage,
  head: ({ params }) => ({
    meta: [{ title: params.slug }],
    links: [{ rel: "canonical", href: `https://thegateguardian.lovable.app/p/${params.slug}` }],
  }),
  errorComponent: ({ error }) => <div className="p-10 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Page not found</div>,
});

function PublicPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["page", slug],
    queryFn: async () => {
      const { data: page } = await supabase.from("pages").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      if (!page) return null;
      const { data: sections } = await supabase.from("page_sections").select("*").eq("page_id", page.id).order("sort_order");
      return { page, sections: sections ?? [] };
    },
  });

  if (isLoading) return <SiteLayout><div className="p-20 text-center text-muted-foreground">Loading…</div></SiteLayout>;
  if (!data) return <SiteLayout><div className="p-20 text-center"><h1 className="text-3xl font-bold">Page not found</h1></div></SiteLayout>;

  return (
    <SiteLayout>
      <PageRenderer sections={data.sections as any} />
    </SiteLayout>
  );
}
