"use client";

import { useEffect, useState } from "react";
import { Toast, ToastProps } from "./toast";
import { createPortal } from "react-dom";

let toastIdCounter = 0;
const toasts: ToastProps[] = [];
const listeners = new Set<(toasts: ToastProps[]) => void>();

function addToast(toast: Omit<ToastProps, "id">) {
  const id = `toast-${++toastIdCounter}`;
  const newToast = { ...toast, id };
  toasts.push(newToast);
  listeners.forEach((listener) => listener([...toasts]));

  // Auto remove after duration
  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }

  return id;
}

function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.splice(index, 1);
    listeners.forEach((listener) => listener([...toasts]));
  }
}

export const toast = {
  success: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "success", duration }),
  error: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "error", duration }),
  warning: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "warning", duration }),
  default: (title: string, description?: string, duration?: number) =>
    addToast({ title, description, variant: "default", duration }),
};

export function Toaster() {
  const [toastList, setToastList] = useState<ToastProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const listener = (newToasts: ToastProps[]) => {
      setToastList(newToasts);
    };
    listeners.add(listener);
    listener(toasts);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-0 z-[100] flex w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto mb-4 animate-in slide-in-from-bottom-full"
        >
          <Toast
            {...toast}
            onClose={() => {
              toast.onClose?.();
              removeToast(toast.id);
            }}
          />
        </div>
      ))}
    </div>,
    document.body
  );
}
