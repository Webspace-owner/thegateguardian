import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/scope")({ component: () => (
  <CrudList table="scope_items" title="Scope of Work" fields={[
    { key: "title", label: "Title" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "sort_order", label: "Sort order", type: "number" },
  ]} />
) });
