"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ================= TYPES ================= */
interface Department {
  _id: string;
  name: string;
}

interface Employee {
  _id: string;
  name: string;
  unvon: string;
  lavozim: string;
  bolim?: Department;
  employeeNo: string;
}

interface Attendance {
  _id: string;
  startDate: string;
  endDate?: string;
  employeeId: Employee & { bolim?: Department };
  status: string;
}

interface EmployeeWithAttendance extends Employee {
  attendance: Attendance | null;
}

/* ================= COMPONENT ================= */
export default function SingleJurnal() {
  const pathname = usePathname();
  const jurnalId = pathname.split("/")[2];

  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, empRes] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/attendance/getByJurnalId/${jurnalId}`,
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/employee`),
        ]);

        setAttendances(attRes.data);
        setEmployees(empRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jurnalId]);

  /* ================= GROUP LOGIC ================= */
  const groupedByDepartment = useMemo(() => {
    if (!employees.length) return {};

    const attendanceMap = new Map<string, Attendance>();

    attendances.forEach((att) => {
      attendanceMap.set(att.employeeId._id, att);
    });

    const grouped: Record<string, EmployeeWithAttendance[]> = {};

    employees.forEach((emp) => {
      const attendance = attendanceMap.get(emp._id) || null;

      const departmentName =
        attendance?.employeeId?.bolim?.name ||
        emp.bolim?.name ||
        "Noma'lum bo'lim";

      if (!grouped[departmentName]) {
        grouped[departmentName] = [];
      }

      grouped[departmentName].push({
        ...emp,
        attendance,
      });
    });

    return grouped;
  }, [employees, attendances]);

  /* ================= CREATE STATUS ================= */
  const handleCreateStatus = async (emp: Employee, status: string) => {
    try {
      if (!status) return;

      if (status === "Qatnashmagan") {
        await axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/attendance/${emp._id}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attendance`, {
          jurnalId: jurnalId,
          employeeId: emp._id,
          employeeNo: emp.employeeNo,
          name: emp.name,
          status,
        });
      }

      const updated = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/attendance/getByJurnalId/${jurnalId}`,
      );

      setAttendances(updated.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= EXCEL EXPORT ================= */
  const handleExportExcel = () => {
    const data: any[] = [];

    Object.entries(groupedByDepartment).forEach(([department, emps]) => {
      // Bo'lim nomi qatori
      data.push({
        "Bo'lim": department,
        Ism: "",
        Unvon: "",
        Lavozim: "",
        Holat: "",
        "Kelgan vaqti": "",
        "Ketgan vaqti": "",
      });

      emps.forEach((emp) => {
        data.push({
          "Bo'lim": "",
          Ism: emp.name,
          Unvon: emp.unvon,
          Lavozim: emp.lavozim,
          Holat: emp.attendance?.status || "Qatnashmagan",
          "Kelgan vaqti": emp.attendance?.startDate
            ? new Date(emp.attendance.startDate).toLocaleTimeString()
            : "-",
          "Ketgan vaqti": emp.attendance?.endDate
            ? new Date(emp.attendance.endDate).toLocaleTimeString()
            : "-",
        });
      });

      data.push({});
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `jurnal-${jurnalId}.xlsx`);
  };

  if (loading) return <div className="p-10">Yuklanmoqda...</div>;

  /* ================= RENDER ================= */
  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Jurnal</h1>

          <button
            onClick={handleExportExcel}
            className="bg-green text-white px-4 py-2 rounded"
          >
            Excelga export
          </button>
        </div>

        {Object.entries(groupedByDepartment).map(([department, emps]) => (
          <div key={department} className="mb-10">
            <h2 className="text-xl font-bold mb-4">{department}</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-card">
              <table className="w-full overflow-x-auto">
                <thead>
                  <tr className="text-left">
                    <th className="border-b border-b-gray p-2">Ism</th>
                    <th className="border-b border-b-gray p-2">Unvon</th>
                    <th className="border-b border-b-gray p-2">Lavozim</th>
                    <th className="border-b border-b-gray p-2">Holat</th>
                    <th className="border-b border-b-gray p-2">Kelgan vaqti</th>
                    <th className="border-b border-b-gray p-2">Ketgan vaqti</th>
                    <th className="border-b border-b-gray p-2">Amal</th>
                  </tr>
                </thead>

                <tbody>
                  {emps.map((emp) => (
                    <tr key={emp._id}>
                      <td className="border-b border-b-gray p-2">{emp.name}</td>
                      <td className="border-b border-b-gray p-2">
                        {emp.unvon}
                      </td>
                      <td className="border-b border-b-gray p-2">
                        {emp.lavozim}
                      </td>

                      {emp.attendance &&
                      emp.attendance.status === "Qatnashgan" ? (
                        <>
                          <td className="border-b border-b-gray p-2">
                            <span className="bg-green-700 text-white text-sm px-2 py-1 rounded">
                              {emp.attendance.status}
                            </span>
                          </td>
                          <td className="border-b border-b-gray p-2">
                            {emp.attendance.startDate
                              ? new Date(
                                  emp.attendance.startDate,
                                ).toLocaleTimeString()
                              : "-"}
                          </td>
                          <td className="border-b border-b-gray p-2">
                            {emp.attendance.endDate
                              ? new Date(
                                  emp.attendance.endDate,
                                ).toLocaleTimeString()
                              : "-"}
                          </td>
                          <td className="border-b border-b-gray p-2"></td>
                        </>
                      ) : (
                        <>
                          <td className="border-b border-b-gray p-2">
                            {emp.attendance && emp.attendance.status ? (
                              <span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded">
                                {emp.attendance.status}
                              </span>
                            ) : (
                              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                                Qatnashmagan
                              </span>
                            )}
                          </td>
                          <td className="border-b border-b-gray p-2">-</td>
                          <td className="border-b border-b-gray p-2">-</td>
                          <td className="border-b border-b-gray p-2">
                            <select
                              name="status"
                              id="status"
                              onChange={(e) =>
                                handleCreateStatus(emp, e.target.value)
                              }
                              className="w-max p-1 border border-gray-300 rounded"
                            >
                              <option value="">Holatni tanlang</option>
                              <option value="Naryad">Naryad</option>
                              <option value="Ruxsatli">Ruxsatli</option>
                              <option value="Ta'til">Ta'til</option>
                              <option value="Kasal">Kasal</option>
                              <option value="Qatnashmagan">Qatnashmagan</option>
                            </select>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
