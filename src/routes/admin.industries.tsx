import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/industries")({ component: () => (
  <CrudList table="industries" title="Industries" fields={[
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug (e.g. data-centers)" },
    { key: "icon", label: "Lucide icon name (e.g. server, factory)" },
    { key: "sort_order", label: "Sort order", type: "number" },
    { key: "tagline", label: "Tagline / short pitch" },
    { key: "image_url", label: "Hero image", type: "image" },
    { key: "overview", label: "Overview paragraph", type: "textarea" },
    { key: "challenges", label: "Challenges (one per line)", type: "textarea" },
    { key: "solutions", label: "Our approach (one per line)", type: "textarea" },
    { key: "services", label: "Services delivered (one per line)", type: "textarea" },
    { key: "meta_title", label: "SEO · Meta title" },
    { key: "meta_description", label: "SEO · Meta description", type: "textarea" },
    { key: "og_image", label: "SEO · Social share image", type: "image" },
  ]} />
) });
