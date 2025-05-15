
import { useState, useEffect, useCallback } from "react";

type ToastPosition = "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";
type ToastType = "default" | "success" | "error" | "warning" | "info" | "destructive";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
  onClose?: () => void;
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

const DEFAULT_TOAST_DURATION = 5000;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "default", duration = DEFAULT_TOAST_DURATION, onClose }: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        id,
        title,
        description,
        variant,
        duration,
        onClose,
      };

      setToasts((prev) => [...prev, newToast]);

      return id;
    },
    []
  );

  // Auto-dismiss toasts after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((t) => {
      if (t.duration !== Infinity) {
        const timer = setTimeout(() => {
          removeToast(t.id);
          if (t.onClose) {
            t.onClose();
          }
        }, t.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, removeToast]);

  return {
    toast,
    toasts,
    removeToast,
  };
}
