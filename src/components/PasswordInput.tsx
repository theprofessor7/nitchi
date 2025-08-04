"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import type { ComponentPropsWithoutRef } from "react";

type PasswordInputProps = ComponentPropsWithoutRef<typeof Input>;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn("pr-10", className)}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        title={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {show ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
