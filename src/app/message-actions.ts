"use server";

import { cookies } from "next/headers";

export async function getMessages() {
  const cookieStore = cookies();
  const successMessage = cookieStore.get("successMessage")?.value;
  const errorMessage = cookieStore.get("errorMessage")?.value;

  return {
    successMessage,
    errorMessage,
  };
}

export async function clearMessages() {
  const cookieStore = cookies();
  cookieStore.delete("successMessage");
  cookieStore.delete("errorMessage");
}
