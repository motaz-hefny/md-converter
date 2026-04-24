"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div className="toast flex items-center gap-2">
      {type === "success" ? (
        <CheckCircle size={18} className="text-green-500" />
      ) : (
        <XCircle size={18} className="text-red-500" />
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
}
