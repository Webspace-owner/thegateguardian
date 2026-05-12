import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import dataCenter from "@/assets/ind-data-center.jpg";
import manufacturing from "@/assets/ind-manufacturing.jpg";
import mall from "@/assets/ind-mall.jpg";
import education from "@/assets/ind-education.jpg";
import training from "@/assets/ind-training.jpg";
import oilgas from "@/assets/ind-oilgas.jpg";

const defaultGallery = [
  { image_url: dataCenter, caption: "Data Centers" },
  { image_url: manufacturing, caption: "Industrial" },
  { image_url: mall, caption: "Shopping Malls" },
  { image_url: education, caption: "Educational Facilities" },
  { image_url: training, caption: "Training Programs" },
  { image_url: oilgas, caption: "Oil & Gas" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — The Gate Guardian" },
      { name: "description", content: "From data centers to shopping malls and educational facilities — projects across diverse industries." },
      { property: "og:title", content: "Industries — The Gate Guardian" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { data: items } = useQuery({
    queryKey: ["gallery_items"],
    queryFn: async () => (await supabase.from("gallery_items").select("*").order("sort_order")).data ?? [],
  });
  const list = items && items.length > 0 ? items : defaultGallery;
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-20">
        <div className="text-xs tracking-widest text-primary font-semibold mb-2">SUCCESS STORIES</div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">We've got you industry-connected</h1>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">A snapshot of the environments we've helped secure and deliver.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {list.map((g, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border/50 shadow-card">
              <img src={g.image_url} alt={g.caption ?? ""} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {g.caption && <div className="absolute bottom-4 left-4 font-display font-semibold">{g.caption}</div>}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
