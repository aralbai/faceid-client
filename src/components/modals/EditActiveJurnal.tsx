"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditActiveJurnal({ onClose }: { onClose: () => void }) {
  const [validJurnals, setValidJurnals] = useState([]);
  const [selectedJurnal, setSelectedJurnal] = useState("");

  useEffect(() => {
    const fetchValidJurnals = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/jurnal/valid`)
        .then((res) => {
          setValidJurnals(res.data);
        })
        .catch((err) => {
          toast.error(
            err.response?.data || "Jurnal qo'shishda xatolik yuz berdi",
          );
        });
    };

    fetchValidJurnals();
  }, []);

  const handleChange = async () => {
    const newActiveJurnal = validJurnals.find(
      (jurnal: any) => jurnal._id === selectedJurnal,
    );

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/active-jurnal`, newActiveJurnal)
      .then((res) => {
        toast.success(res.data);
        onClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data);
      });
  };

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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tadbir nomi</label>

          <select
            name=""
            id=""
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedJurnal}
            onChange={(e) => setSelectedJurnal(e.target.value)}
          >
            <option value="">Tadbirni tanlang</option>
            {validJurnals.map((jurnal: any) => (
              <option key={jurnal._id} value={jurnal._id}>
                {jurnal.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
          >
            Bekor qilish
          </button>

          <button
            onClick={handleChange}
            className="px-4 py-2 rounded-md bg-green text-white cursor-pointer"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
