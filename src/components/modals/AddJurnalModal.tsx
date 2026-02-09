"use client";

import axios from "axios";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

export default function AddJurnalModal({ onClose }: any) {
  const [jurnal, setJurnal] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/jurnal`, jurnal)
      .then((res) => {
        setJurnal({
          name: "",
          date: new Date().toISOString().split("T")[0],
          startTime: "",
          endTime: "",
        });
        onClose();
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data || "Jurnal qo'shishda xatolik yuz berdi",
        );
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[20%] h-screen bg-white overflow-y-auto">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Yangi tadbir qo'shish</h2>

          {/* form shu yerda */}
          <button onClick={onClose} className="text-sm cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <div>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tadbir nomi
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={jurnal.name}
                onChange={(e) => setJurnal({ ...jurnal, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sana</label>
              <input
                type="date"
                lang="ru"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={jurnal.date}
                onChange={(e) => setJurnal({ ...jurnal, date: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Boshlanish vaqti
              </label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={jurnal.startTime}
                onChange={(e) =>
                  setJurnal({ ...jurnal, startTime: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tugash vaqti
              </label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={jurnal.endTime}
                onChange={(e) =>
                  setJurnal({ ...jurnal, endTime: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green text-white px-4 py-2 rounded cursor-pointer"
            >
              Saqlash
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
