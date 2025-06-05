"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  AppWindowIcon as Apps,
  Link2,
  Settings,
  Wrench,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Apps",
    href: "/apps",
    icon: Apps,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: Link2,
  },
  {
    title: "Actions",
    href: "/actions",
    icon: Wrench,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-sidebar custom-scrollbar md:block">
      <div className="p-4">
        <h1 className="font-display text-lg font-semibold text-sidebar-foreground mb-6">
          Composio Dashboard
        </h1>
        <nav className="grid gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                pathname === item.href &&
                  "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                <span className="font-body">{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
