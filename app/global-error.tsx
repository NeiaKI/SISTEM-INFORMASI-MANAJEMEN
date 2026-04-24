"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col items-center justify-center bg-white px-4" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex flex-col items-center gap-5 text-center max-w-sm">
          {/* Icon */}
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#ef4444", fontSize: 24, fontWeight: 700 }}>!</span>
          </div>

          {/* Title */}
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: 0 }}>
              Aplikasi Bermasalah
            </h1>
            <p style={{ marginTop: 8, fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
              Terjadi kesalahan kritis pada aplikasi.<br />
              Silakan muat ulang halaman.
            </p>
            {error?.digest && (
              <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af", fontFamily: "monospace", background: "#f3f4f6", padding: "2px 8px", borderRadius: 4, display: "inline-block" }}>
                Kode: {error.digest}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#1d4ed8", color: "#fff", fontSize: 14, fontWeight: 500, borderRadius: 8, textDecoration: "none" }}
            >
              Kembali ke Beranda
            </a>
            <button
              onClick={reset}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 500, borderRadius: 8, cursor: "pointer" }}
            >
              Muat Ulang
            </button>
          </div>

          {/* Support */}
          <div style={{ width: "100%", paddingTop: 8, borderTop: "1px solid #e5e7eb", marginTop: 4 }}>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 16 }}>
              Jika masalah berlanjut, hubungi tim dukungan kami.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
