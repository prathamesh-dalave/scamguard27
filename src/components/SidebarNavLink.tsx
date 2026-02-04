import { NavLink as RouterNavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  collapsed?: boolean;
}

export function SidebarNavLink({ to, icon: Icon, children, collapsed }: SidebarNavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
            : "text-sidebar-muted"
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{children}</span>}
    </RouterNavLink>
  );
}
