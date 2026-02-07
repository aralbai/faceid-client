"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Employees({ params }) {
  const [employees, setEmployees] = useState([]);
  const [bolim, setBolim] = useState("");
  const pathname = usePathname();

  const bolimId = pathname.split("/").slice(-1)[0];

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/bolim/${bolimId}`)
        .then((res) => {
          setEmployees(res.data);
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
        });
    };

    const fetchBolim = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/bolim/${bolimId}`)
        .then((res) => {
          setBolim(res.data);
        })
        .catch((err) => {
          console.error("Error fetching bolim:", err);
        });
    };

    fetchBolim();
    fetchEmployees();
  }, []);

  console.log(employees);
  console.log(bolim);

  return (
    <div>
      <Navbar />

      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Xodimlar</h1>

          <button className="bg-green text-white px-4 py-2 rounded-md cursor-pointer">
            Yangi xodim qo'shish
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-card">
          <table className="employeeList overflow-auto p-5 w-full">
            <thead>
              <tr className="text-center">
                <th className="border-b border-gray">Xodim F.I.SH</th>
                <th className="border-b border-gray p-2">ID raqami</th>
                <th className="border-b border-gray p-2">Unvoni</th>
                <th className="border-b border-gray">Lavozimi</th>
                <th className="border-b border-gray p-2"></th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee) => (
                <tr key={employee._id} className="border border-gray">
                  <td className="border-b border-gray  p-2">
                    {employee?.name}
                  </td>
                  <td className="border-b border-gray  p-2">
                    {employee?.employeeNo}
                  </td>
                  <td className="border-b border-gray p-2">
                    {employee?.unvon}
                  </td>
                  <td className="border-b border-gray p-2">
                    {employee.lavozim}
                  </td>
                  <td className="border-b border-gray p-2 text-center flex gap-2 items-center">
                    <button className=" rounded-md cursor-pointer">
                      <EditIcon />
                    </button>
                    <button className="  rounded-md cursor-pointer">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
