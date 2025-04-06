"use client";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfile() {
  const supabase = createClient();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminRole() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          // Check if user has admin role in metadata
          const isUserAdmin =
            user.app_metadata?.role === "admin" ||
            user.user_metadata?.role === "admin";

          if (!isUserAdmin) {
            // If not in metadata, check the users table
            const { data: userData } = await supabase
              .from("users")
              .select("role")
              .eq("id", user.id)
              .single();

            setIsAdmin(userData?.role === "admin");
          } else {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
      }
    }

    checkAdminRole();
  }, [supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Moj nalog</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/porudzbine">Moje porudžbine</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/podesavanja">Podešavanja</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin ekran</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              // Use the server action for sign out to ensure message is set
              const { signOutAction } = await import("@/app/actions");
              await signOutAction();
            }}
          >
            <button className="w-full text-left px-2 py-1.5 text-sm">
              Odjavi se
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
