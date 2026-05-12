import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/gallery")({ component: () => (
  <CrudList table="gallery_items" title="Gallery" fields={[
    { key: "image_url", label: "Image URL" },
    { key: "caption", label: "Caption" },
    { key: "sort_order", label: "Sort order", type: "number" },
  ]} />
) });
