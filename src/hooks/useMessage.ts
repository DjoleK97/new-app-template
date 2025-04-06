"use client";

import { useEffect, useState } from "react";
import { getMessages, clearMessages } from "@/app/message-actions";

export function useMessage() {
  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { successMessage, errorMessage } = await getMessages();

      if (successMessage) {
        setMessage({ type: "success", content: successMessage });
        await clearMessages();
      } else if (errorMessage) {
        setMessage({ type: "error", content: errorMessage });
        await clearMessages();
      }
    };

    fetchMessages();
  }, []);

  const clearMessage = () => setMessage(null);

  return { message, clearMessage };
}
