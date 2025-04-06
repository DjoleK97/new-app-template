"use client";

import { useMessage } from "@/hooks/useMessage";
import SuccessMessage from "./success-message";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export default function GlobalMessage() {
  const { message } = useMessage();

  if (!message) return null;

  if (message.type === "success") {
    return <SuccessMessage message={message.content} />;
  }

  if (message.type === "error") {
    return (
      <div className="fixed top-20 right-4 z-50 max-w-md animate-in fade-in slide-in-from-top-5 duration-500">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message.content}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
}
