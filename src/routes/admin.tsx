import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Shield, LayoutDashboard, Settings, Inbox, Image, MessageSquare, FileText, Building2, ListOrdered, Users, LogOut, Layers, Search } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/pages", label: "Pages (Builder)", icon: Layers },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/industries", label: "Industries", icon: Building2 },
  { to: "/admin/scope", label: "Scope of Work", icon: ListOrdered },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
  { to: "/admin/users", label: "Users & Roles", icon: Users, adminOnly: true },
];

function AdminLayout() {
  const { user, isStaff, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <Shield className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Admin access</h1>
          <p className="text-muted-foreground">Please sign in to manage the website.</p>
          <Button asChild className="bg-gradient-accent text-primary-foreground"><Link to="/auth">Go to sign in</Link></Button>
        </div>
      </div>
    );
  }
  if (!isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">No access</h1>
          <p className="text-muted-foreground">Your account doesn't have admin or editor rights yet. Ask an existing admin to grant you a role.</p>
          <Button onClick={async () => { await signOut(); nav({ to: "/auth" }); }} variant="outline">Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar isAdmin={isAdmin} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border/50 flex items-center px-4 gap-4">
            <SidebarTrigger />
            <div className="font-display font-semibold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Admin</div>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{user.email}</span>
              <Button size="sm" variant="ghost" onClick={async () => { await signOut(); nav({ to: "/" }); }}><LogOut className="h-4 w-4" /></Button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-background"><Outlet /></main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AdminSidebar({ isAdmin }: { isAdmin: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.filter((i) => !i.adminOnly || isAdmin).map((i) => {
                const active = i.exact ? path === i.to : path.startsWith(i.to);
                return (
                  <SidebarMenuItem key={i.to}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={i.to} className="flex items-center gap-2">
                        <i.icon className="h-4 w-4" />
                        {!collapsed && <span>{i.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
