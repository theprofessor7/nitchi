"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Monitor, Sun, Moon, UserIcon, Check, Palette } from "lucide-react";
import { logout } from "@/app/(auth)/action";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme(); // theme: "system" | "light" | "dark"
  const [palette, setPalette] = useState<string>("");     // "", "teal", ...

  // Applique l'attribut data-palette sur <html>
  const applyPalette = (p: string) => {
    const root = document.documentElement;
    if (!p) {
      root.removeAttribute("data-palette");
    } else {
      root.setAttribute("data-palette", p);
    }
    localStorage.setItem("palette", p);
    setPalette(p);
  };

  // Charger palette initiale
  useEffect(() => {
    const stored = localStorage.getItem("palette") || "";
    applyPalette(stored);
  }, []);

  const isCurrentPalette = (p: string) => palette === p;
  const isCurrentMode = (m: string) => theme === m;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          Logged in as @{user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        {/* Mode : géré par next-themes (classe "dark") */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Mode
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System Default
                {isCurrentMode("system") && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {isCurrentMode("light") && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {isCurrentMode("dark") && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Palette : via data-palette sur <html> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 size-4" />
            Palette
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => applyPalette("")}>
                Default
                {isCurrentPalette("") && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyPalette("teal")}>
                Teal
                {isCurrentPalette("teal") && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyPalette("rose")}>
                Rose
                {isCurrentPalette("rose") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("pink")}>
                Pink
                {isCurrentPalette("pink") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("amber")}>
                Amber
                {isCurrentPalette("amber") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("lime")}>
                Lime
                {isCurrentPalette("lime") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("emerald")}>
                Emerald
                {isCurrentPalette("emerald") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("teal")}>
                Teal
                {isCurrentPalette("teal") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("cyan")}>
                Cyan
                {isCurrentPalette("cyan") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("blue")}>
                Blue
                {isCurrentPalette("blue") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("indigo")}>
                Indigo
                {isCurrentPalette("indigo") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyPalette("violet")}>
                Violet
                {isCurrentPalette("violet") && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>

            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => { logout(); }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
