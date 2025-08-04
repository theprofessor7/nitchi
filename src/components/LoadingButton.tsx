// src/app/components/LoadingButton.tsx

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

// Récupère automatiquement toutes les props que Button accepte,
// y compris `disabled`, `onClick`, `className`, etc.
type LoadingButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  loading: boolean;
};

export default function LoadingButton({
  loading,
  disabled,
  className,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
}
