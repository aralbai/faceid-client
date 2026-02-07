"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

// 1. Avval bitta foydalanuvchi obyekti qanday tuzilishga ega ekanligini belgilaymiz
type User = {
  employeeNo: string;
  name?: string;
  employeeId?: {
    name?: string;
    bolim?: string;
  };
  date?: string | Date;
};

// 2. So'ngra Props ichida shu turdan iborat massiv ekanligini ko'rsatamiz
type UsersType = {
  users: User[]; // User turidagi obyektlardan iborat massiv
};

type JurnalType = {
  name: string;
  date?: Date;
};

export default function Jurnal({ users }: UsersType) {
  const [jurnal, setJurnal] = useState({
    name: "",
    date: "",
  });
  useEffect(() => {
    const fetchJurnal = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/jurnal/6979b853e358ab5d3fb44cb1`,
        )
        .then((res) => setJurnal(res.data))
        .catch((err) => console.log(err));
    };

    fetchJurnal();
  }, []);

  const exportToExcel = () => {
    if (!users || users.length === 0) return;

    const data = users.map((user) => ({
      "Bo‘lim": user?.employeeId?.bolim || "",
      "Hodim F.I.SH": user?.employeeId?.name || "",
      "Kelgan vaqti": user.date
        ? format(new Date(user?.date), "dd.MM.yyyy HH:mm:ss")
        : "",
      "Ketgan vaqti": "-", // agar yo‘q bo‘lsa
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal");

    XLSX.writeFile(
      workbook,
      `jurnal_${format(new Date(jurnal?.date), "dd_MM_yyyy")}.xlsx`,
    );
  };
  return (
    <div className="w-full bg-white rounded-2xl p-5 flex flex-col shadow-card">
      <h1 className="text-center font-medium">{jurnal?.name}</h1>

      <div className="mt-3 flex justify-between mb-3" onClick={exportToExcel}>
        <div></div>
        <button
          className="bg-green text-white py-2 px-2 rounded-md cursor-pointer font-medium"
          onClick={exportToExcel}
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
          {users?.map((user: any) => (
            <tr key={user._id} className="border border-gray">
              <td className="border border-gray  px-2">
                {user?.employeeId?.bolim}
              </td>
              <td className="border border-gray  px-2">
                {user?.employeeId?.name}
              </td>
              <td className="border border-gray  px-2">
                {format(new Date(user?.date), "dd.MM.yyyy HH.mm.ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
