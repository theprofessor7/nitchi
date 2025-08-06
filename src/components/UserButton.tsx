"use client"

import { useSession } from "@/app/(main)/SessionProvider"
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
import { Monitor, Sun, UserIcon, Moon, Check } from "lucide-react";
import { logout } from "@/app/(auth)/action";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface UserButtonProps {
    className?: string
}

export default function UserButton({className}:UserButtonProps) {
    const { user } = useSession();

    const {theme, setTheme} = useTheme();

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
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 size-4" />
                        Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={ () => setTheme("system") }>
                                <Monitor className="mr-2 size-4" />
                                System Default
                                { theme === "system" && <Check className="ms-2 size-4" />} 
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={ () => setTheme("light") }>
                                <Sun className="mr-2 size-4" />
                                Light
                                { theme === "light" && <Check className="ms-2 size-4" />} 
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={ () => setTheme("dark") }>
                                <Moon className="mr-2 size-4" />
                                Dark
                                { theme === "dark" && <Check className="ms-2 size-4" />} 
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={ ()=> {
                        logout();
                    }}
                >
                Logout
                </DropdownMenuItem> 
            </DropdownMenuContent>
        </DropdownMenu>
    );
}