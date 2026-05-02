"use client";

import { X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[400px] bg-mhs-surface border border-mhs-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h3 className="text-[16px] font-semibold text-mhs-text">{title}</h3>
          <button onClick={onCancel} className="text-mhs-muted hover:text-mhs-text transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <p className="text-[13px] text-mhs-muted leading-relaxed mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-mhs-card border border-mhs-border text-mhs-muted hover:text-mhs-text hover:border-mhs-muted px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => { onConfirm(); }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all text-white ${
                danger
                  ? "bg-mhs-rose hover:bg-mhs-rose/80"
                  : "bg-mhs-teal hover:bg-mhs-teal/80"
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
