import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/testimonials")({ component: () => (
  <CrudList table="testimonials" title="Testimonials" fields={[
    { key: "name", label: "Name" },
    { key: "role", label: "Role / Company" },
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "avatar_url", label: "Avatar URL" },
    { key: "sort_order", label: "Sort order", type: "number" },
  ]} />
) });
