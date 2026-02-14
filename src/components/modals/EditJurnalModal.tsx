"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

export default function EditJurnalModal({
  onClose,
  jurnalData,
}: {
  onClose: () => void;
  jurnalData: any;
}) {
  const [jurnal, setJurnal] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Modal ochilganda inputlarni to‘ldirish
  useEffect(() => {
    if (jurnalData) {
      setJurnal({
        name: jurnalData.name || "",
        date: jurnalData.date
          ? jurnalData.date.slice(0, 10) // yyyy-MM-dd
          : "",
        startTime: jurnalData.startTime || "",
        endTime: jurnalData.endTime || "",
      });
    }
  }, [jurnalData]);

  // 🔹 UPDATE
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!jurnalData?._id) return;

    setLoading(true);

    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/jurnal/${jurnalData._id}`,
        jurnal,
      )
      .then((res) => {
        toast.success("Jurnal muvaffaqiyatli yangilandi");
        onClose();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data || "Jurnalni yangilashda xatolik yuz berdi",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[80%] lg:w-[20%] h-screen bg-white overflow-y-auto">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Jurnalni tahrirlash</h2>

          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tadbir nomi
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={jurnal.name}
              onChange={(e) => setJurnal({ ...jurnal, name: e.target.value })}
              required
            />
          </div>

          {/* DATE */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sana</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={jurnal.date}
              onChange={(e) => setJurnal({ ...jurnal, date: e.target.value })}
              required
            />
          </div>

          {/* START TIME */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Boshlanish vaqti
            </label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={jurnal.startTime}
              onChange={(e) =>
                setJurnal({ ...jurnal, startTime: e.target.value })
              }
              required
            />
          </div>

          {/* END TIME */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Tugash vaqti
            </label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={jurnal.endTime}
              onChange={(e) =>
                setJurnal({ ...jurnal, endTime: e.target.value })
              }
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`text-white px-4 py-2 rounded cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green"
            }`}
          >
            {loading ? "Yangilanmoqda..." : "Yangilash"}
          </button>
        </form>
      </div>
    </div>
  );
}
