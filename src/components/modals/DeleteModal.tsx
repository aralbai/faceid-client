"use client";

export default function DeleteModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative bg-white rounded-xl p-6 w-100 shadow-card z-10">
        <h2 className="text-lg font-semibold mb-4">
          O'chirishni tasdiqlaysizmi?
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Ushbu elementni o'chirishni xohlaysizmi? Bu amalni ortga qaytarib
          bo'lmaydi.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
          >
            Bekor qilish
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white cursor-pointer"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
}
