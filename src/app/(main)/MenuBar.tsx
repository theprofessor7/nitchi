import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string
}

export default function MenuBar({ className }: MenuBarProps) {
  const label = "hidden lg:inline font-[520]";

  return (
    <div className={className}>
      <Button variant="ghost" className="flex items-center justify-start gap-3" title="Home" asChild>
        <Link href="/">
          <Home className="size-5" />
          <span className={label}>Home</span>
        </Link>
      </Button>

      <Button variant="ghost" className="flex items-center justify-start gap-3" title="Notifications" asChild>
        <Link href="/notifications">
          <Bell className="size-5" />
          <span className={label}>Notifications</span>
        </Link>
      </Button>

      <Button variant="ghost" className="flex items-center justify-start gap-3" title="Messages" asChild>
        <Link href="/messages">
          <Mail className="size-5" />
          <span className={label}>Messages</span>
        </Link>
      </Button>

      <Button variant="ghost" className="flex items-center justify-start gap-3" title="Bookmarks" asChild>
        <Link href="/bookmarks">
          <Bookmark className="size-5" />
          <span className={label}>Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
