"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Employee = {
  name: String;
  employeeNo: String;
  unvon: String;
  lavozim: String;
  imageUrl: String;
};

type Bolim = {
  name: String;
};

export default function SingleEmployee() {
  const [employee, setEmployee] = useState<Employee>();
  const [bolim, setBolim] = useState<Bolim>();
  const pathname = usePathname();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const bolimId = pathname.split("/")[2];
  const employeeId = pathname.split("/")[3];

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}`)
        .then((res) => {
          setEmployee(res.data);
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
  }, [employeeId]);

  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="mb-4">
          <Link href="/employees" className="text-blue-500">
            Sohaviy xizmatlar
          </Link>{" "}
          /{" "}
          <Link href={`/employees/${bolimId}`} className="text-blue-500">
            {bolim?.name}
          </Link>
          {" / "}
          <i>{employee?.name}</i>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Xodimlar</h1>

          <button className="bg-green text-white px-4 py-2 rounded-md cursor-pointer">
            Yangi xodim qo'shish
          </button>
        </div>

        <div className="bg-white w-full overflow-auto rounded-xl p-5 shadow-card">
          <table className="overflow-x-auto w-full">
            <thead>
              <tr className="border-b border-gray text-left">
                <th className="p-2">Rasmi</th>
                <th className="p-2">Xodim F.I.SH</th>
                <th className="p-2">ID raqami</th>
                <th className="p-2">Unvoni</th>
                <th className="p-2">Lavozimi</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray">
                <td className="p-2">
                  <img
                    src={`/images/employee/${employee?.imageUrl}`}
                    alt="employee"
                    onClick={() =>
                      setPreviewImage(`/images/employee/${employee?.imageUrl}`)
                    }
                    className="w-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition"
                  />
                </td>
                <td className="p-2">{employee?.name}</td>
                <td className="p-2">{employee?.employeeNo}</td>
                <td className="p-2">{employee?.unvon}</td>
                <td className="p-2">{employee?.lavozim}</td>
              </tr>
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
