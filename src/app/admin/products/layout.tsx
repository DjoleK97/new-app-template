import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export const metadata: Metadata = {
  title: "Upravljanje proizvodima - Seoska Korpa",
  description: "Admin panel za upravljanje proizvodima",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Supabase client
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is logged in, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
  }

  // Check if the user has admin role
  const { data: userData, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  // If there's an error or the user is not an admin, redirect to home page
  if (error || userData?.role !== "admin") {
    redirect("/");
  }

  // If the user is an admin, render the admin layout with its children
  return <>{children}</>;
}
