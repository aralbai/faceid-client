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

  console.log(attendances);

  return (
    <div className="w-full bg-white rounded-2xl p-5 flex flex-col shadow-card">
      <div className="flex justify-between items-center mb-4">
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
        className="mt-3 flex justify-between mb-3"
        onClick={() => exportToExcel(attendances)}
      >
        <div></div>

        <button
          className="bg-green text-white p-2 px-3 rounded-md cursor-pointer"
          onClick={() => exportToExcel(attendances)}
        >
          Excelga saqlash
        </button>
      </div>

      <table className="employeeList overflow-auto p-5">
        <thead>
          <tr className="text-center">
            <th className="border border-gray px-2">Bo'lim</th>
            <th className="border border-gray">Xodim F.I.SH</th>
            <th className="border border-gray">Kelgan vaqti</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(attendances) &&
            attendances.map((attendance: any) => (
              <tr key={attendance._id} className="border border-gray">
                <td className="border border-gray px-2">
                  {attendance?.employeeId?.bolim?.name}
                </td>
                <td className="border border-gray px-2">
                  {attendance?.employeeId?.name}
                </td>
                <td className="border border-gray px-2">
                  {format(new Date(attendance?.date), "dd.MM.yyyy HH.mm.ss")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editModal && <EditActiveJurnal onClose={() => setEditModal(false)} />}
    </div>
  );
}
