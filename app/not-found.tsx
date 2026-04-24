import Link from "next/link";
import ReloadButton from "@/components/reload-button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-5 text-center max-w-sm">
        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            404 Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Halaman yang Anda cari tidak ditemukan atau<br />
            mungkin telah dipindahkan.
          </p>
        </div>

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
          <ReloadButton />
        </div>

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
