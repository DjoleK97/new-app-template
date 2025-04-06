"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  variant = "outline",
  className = "",
  children = "Odjavi se",
}: LogoutButtonProps) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        const { signOutAction } = await import("@/app/actions");
        await signOutAction();
        router.push("/sign-in");
      }}
    >
      <Button type="submit" variant={variant} className={className}>
        {children}
      </Button>
    </form>
  );
}
