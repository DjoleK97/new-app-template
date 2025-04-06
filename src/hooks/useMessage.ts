"use client";

import { useEffect, useState } from "react";
import { getMessages, clearMessages } from "@/app/message-actions";
import { usePathname, useSearchParams } from "next/navigation";

export function useMessage() {
  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      const { successMessage, errorMessage } = await getMessages();

      if (!isMounted) return;

      if (successMessage) {
        setMessage({ type: "success", content: successMessage });
        await clearMessages();
      } else if (errorMessage) {
        setMessage({ type: "error", content: errorMessage });
        await clearMessages();
      }
    };

    fetchMessages();

    // Clear message when navigating to a new page
    return () => {
      isMounted = false;
      setMessage(null);
    };
  }, [pathname, searchParams]); // Re-run when route changes

  const clearMessage = () => setMessage(null);

  return { message, clearMessage };
}
