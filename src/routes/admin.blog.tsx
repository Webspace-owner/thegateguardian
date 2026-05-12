import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/blog")({ component: () => (
  <CrudList table="blog_posts" title="Blog Posts" orderBy="created_at" fields={[
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug (e.g. my-post)" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "cover_image", label: "Cover image URL" },
    { key: "published", label: "Published", type: "checkbox" },
    { key: "published_at", label: "Published at (ISO)" },
  ]} />
) });
