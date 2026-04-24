"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Terjadi Kesalahan
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Terjadi kesalahan yang tidak terduga.<br />
            Silakan coba lagi atau kembali ke beranda.
          </p>
          {error?.digest && (
            <p className="mt-2 text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
              Kode: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Coba Lagi
          </button>
        </div>

        {/* Divider + support */}
        <div className="w-full pt-2">
          <hr className="border-gray-200" />
          <p className="mt-4 text-xs text-gray-400">
            Jika masalah berlanjut, hubungi tim dukungan kami.
          </p>
        </div>
      </div>
    </div>
  );
}
