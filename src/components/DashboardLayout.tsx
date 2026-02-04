import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  UserPlus,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { SidebarNavLink } from "@/components/SidebarNavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Family Dashboard" },
  { to: "/threats", icon: AlertTriangle, label: "Threat Monitor" },
  { to: "/add-member", icon: UserPlus, label: "Add Member" },
  { to: "/awareness", icon: BookOpen, label: "Awareness" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative min-h-screen bg-sidebar sidebar-glow transition-all duration-300 shrink-0",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              {!collapsed && (
                <span className="text-lg font-bold text-sidebar-foreground">
                  ScamGuard
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <SidebarNavLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                collapsed={collapsed}
              >
                {item.label}
              </SidebarNavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-3 space-y-1">
            <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>

          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-card shadow-md hover:bg-accent z-10"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">
              Welcome back,
            </h2>
            <h1 className="text-lg font-semibold">Admin User</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2 pl-3 border-l">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
