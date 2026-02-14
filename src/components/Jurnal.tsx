"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import EditActiveJurnal from "./modals/EditActiveJurnal";
import { formatInTimeZone } from "date-fns-tz";
import { exportToExcel } from "@/common/exportToExcel";

export default function Jurnal({ attendances, setReloadAttendances }: any) {
  const [editModal, setEditModal] = useState(false);
  const [activeJurnal, setActiveJurnal] = useState({
    name: "",
    date: new Date(),
  });

  useEffect(() => {
    const fetchJurnal = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/active-jurnal`)
        .then((res) => setActiveJurnal(res.data))
        .catch((err) => console.log(err));
    };

    fetchJurnal();

    setReloadAttendances((prev: any) => !prev);
  }, [editModal]);

  return (
    <div className="w-full bg-white rounded-2xl p-2 lg:p-5 flex flex-col shadow-card">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-center font-medium">
          {activeJurnal?.name &&
            activeJurnal?.name +
              " - " +
              formatInTimeZone(activeJurnal?.date, "UTC", "dd.MM.yyyy")}
        </h1>

        <button className="cursor-pointer" onClick={() => setEditModal(true)}>
          <EditIcon />
        </button>
      </div>

      <div
        className="flex justify-between mb-3"
        onClick={() => exportToExcel(attendances)}
      >
        <div></div>

        <button
          className="bg-green text-white text-xs lg:text-lg p-2 px-3 rounded-md cursor-pointer"
          onClick={() => exportToExcel(attendances)}
        >
          Excelga saqlash
        </button>
      </div>

      {/* Asosiy konteyner: h-[500px] o'rniga o'zingizga kerakli balandlikni qo'ying */}
      <div className="max-h-125 overflow-y-auto overflow-x-auto border border-gray">
        <table className="w-full min-w-250  border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="text-center bg-gray-100">
              <th className="border border-gray px-2 py-2">Bo'lim</th>
              <th className="border border-gray px-2 py-2">Xodim F.I.SH</th>
              <th className="border border-gray px-2 py-2">Kelgan vaqti</th>
              <th className="border border-gray px-2 py-2">Ketgan vaqti</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(attendances) &&
              attendances.map((attendance: any) => (
                <tr key={attendance._id} className="hover:bg-gray-50">
                  <td className="border border-gray px-2 py-1">
                    {attendance?.employeeId?.bolim?.name}
                  </td>
                  <td className="border border-gray px-2 py-1">
                    {attendance?.employeeId?.name}
                  </td>
                  <td className="border border-gray px-2 py-1 whitespace-nowrap">
                    {format(
                      new Date(attendance?.startDate),
                      "dd.MM.yyyy HH.mm.ss",
                    )}
                  </td>
                  <td className="border border-gray px-2 py-1 whitespace-nowrap">
                    {attendance?.endDate &&
                      format(
                        new Date(attendance?.endDate),
                        "dd.MM.yyyy HH.mm.ss",
                      )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {editModal && <EditActiveJurnal onClose={() => setEditModal(false)} />}
    </div>
  );
}
