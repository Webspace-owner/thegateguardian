import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";
export const Route = createFileRoute("/admin/industries")({ component: () => (
  <CrudList table="industries" title="Industries" fields={[
    { key: "name", label: "Name" },
    { key: "icon", label: "Lucide icon name (e.g. server, factory)" },
    { key: "sort_order", label: "Sort order", type: "number" },
  ]} />
) });
