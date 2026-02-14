"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddJurnalModal from "@/components/modals/AddJurnalModal";
import DeleteModal from "@/components/modals/DeleteModal";
import toast from "react-hot-toast";
import EditJurnalModal from "@/components/modals/EditJurnalModal";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export default function Jurnal() {
  const [open, setOpen] = useState(false);
  const [jurnal, setJurnal] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editJurnal, setEditJurnal] = useState<any>(null);

  useEffect(() => {
    const fetchJurnal = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/jurnal`)
        .then((res) => {
          setJurnal(res.data);
        })
        .catch((err) => {
          console.error("Error fetching jurnal:", err);
        });
    };

    fetchJurnal();
  }, [open, editJurnal]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/jurnal/${deleteId}`,
      );

      setJurnal((prev) => prev.filter((item: any) => item._id !== deleteId));
      toast.success("Jurnal o'chirildi");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Jurnalni o'chirishda xatolik yuz berdi");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Jurnal</h1>

          <button
            className="bg-green text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Yangi tadbir qo'shish
          </button>
        </div>

        <div className="bg-white overflow-x-auto rounded-xl p-5 shadow-card">
          <table className="overflowx-x-auto p-5 w-full">
            <thead>
              <tr className="text-left">
                <th className="border-b border-gray p-2">Tadbir nomi</th>
                <th className="border-b border-gray p-2">Sana</th>
                <th className="border-b border-gray p-2">Boshlanish vaqti</th>
                <th className="border-b border-gray p-2">Tugash vaqti</th>
                <th className="border-b border-gray p-2"></th>
              </tr>
            </thead>
            <tbody>
              {jurnal?.map((jurnal: any) => (
                <tr key={jurnal?._id} className="">
                  <td className="border-b border-gray  p-2">
                    <Link
                      href={`/jurnal/${jurnal._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {jurnal.name}
                    </Link>
                  </td>
                  <td className="border-b border-gray  p-2">
                    {formatInTimeZone(jurnal.date, "UTC", "dd.MM.yyyy")}
                  </td>
                  <td className="border-b border-gray p-2">
                    {jurnal?.startTime}
                  </td>
                  <td className="border-b border-gray p-2">
                    {jurnal?.endTime}
                  </td>
                  <td className="border-b border-gray p-2 text-center flex gap-5 items-center">
                    <button
                      className=" rounded-md cursor-pointer"
                      onClick={() => setEditJurnal(jurnal)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="  rounded-md cursor-pointer"
                      onClick={() => setDeleteId(jurnal._id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <AddJurnalModal onClose={() => setOpen(false)} />}

      {deleteId && (
        <DeleteModal
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}

      {editJurnal && (
        <EditJurnalModal
          jurnalData={editJurnal}
          onClose={() => setEditJurnal(null)}
        />
      )}
    </div>
  );
}
