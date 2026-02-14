"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";

export default function Employees({ params }) {
  const [employees, setEmployees] = useState([]);
  const [bolim, setBolim] = useState("");
  const pathname = usePathname();
  const [previewImage, setPreviewImage] = useState(null);

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

  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="mb-4">
          <Link href="/employees">Sohaviy xizmatlar</Link> /{" "}
          <i href={`/employees/${bolimId}`}>{bolim.name}</i>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Xodimlar</h1>

          <button className="bg-green text-white px-4 py-2 rounded-md cursor-pointer">
            Yangi xodim qo'shish
          </button>
        </div>

        <div className="bg-white w-full overflow-auto rounded-xl p-5 shadow-card">
          <table className="employeeList overflow-x-auto p-5 w-full">
            <thead>
              <tr className="text-center border-b border-gray">
                <th className="p-2">T/r</th>
                <th className="p-2">Rasmi</th>
                <th className="p-2">Xodim F.I.SH</th>
                <th className="p-2">ID raqami</th>
                <th className="p-2">Unvoni</th>
                <th className="p-2">Lavozimi</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee, index) => (
                <tr key={employee._id} className="border-b border-gray">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <img
                      src={`/images/employee/${employee.imageUrl}`}
                      alt="employee"
                      onClick={() =>
                        setPreviewImage(`/images/employee/${employee.imageUrl}`)
                      }
                      className="w-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition"
                    />
                  </td>
                  <td className="p-2">
                    <Link
                      href={`/employees/${bolimId}/${employee._id}`}
                      className=""
                    >
                      {employee?.name}
                    </Link>
                  </td>
                  <td className="p-2">{employee?.employeeNo}</td>
                  <td className="p-2">{employee?.unvon}</td>
                  <td className="p-2">{employee.lavozim}</td>
                  <td className="p-2">
                    <button className="rounded-md cursor-pointer">
                      <EditIcon />
                    </button>
                    <button className="rounded-md cursor-pointer ml-3">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="preview"
            className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
