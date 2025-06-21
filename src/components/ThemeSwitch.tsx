"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { setTheme } = useTheme();

  if (typeof window === "undefined") {
  } else if (localStorage.getItem("theme") === "dark") {
    return (
      <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
        <Sun className="h-5 w-5 text-secondary-foreground" />
      </Button>
    );
  }
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
      <Moon className="h-5 w-5 text-secondary-foreground" />
    </Button>
  );
}
