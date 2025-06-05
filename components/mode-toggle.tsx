"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-action-primary/20 hover:border-action-primary/30 hover:bg-action-primary/5"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-chart-3 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-chart-1 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-surface-base/90 backdrop-blur-sm border-borderColor-subtle/20"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="font-body hover:bg-action-primary/10 cursor-pointer"
        >
          <Sun className="h-4 w-4 mr-2 text-chart-3" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="font-body hover:bg-action-primary/10 cursor-pointer"
        >
          <Moon className="h-4 w-4 mr-2 text-chart-1" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="font-body hover:bg-action-primary/10 cursor-pointer"
        >
          <span className="mr-2">💻</span> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
