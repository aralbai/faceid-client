"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Camera() {
  const [employeesInDb, setEmployeesInDb] = useState([]);
  const [employesInCamera, setEmployeesInCamera] = useState({
    totalEmployees: 0,
  });
  const [facesInCamera, setFacesInCamera] = useState({
    totalFaces: 0,
  });

  useEffect(() => {
    const fetchEmployeesInDb = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/employee`)
        .then((res) => {
          setEmployeesInDb(res.data);
        })
        .catch((err) => {
          console.error("Error fetching employees in DB:", err);
        });
    };

    const fetchEmployeesInCamera = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/employee/get-terminal-total`)
        .then((res) => {
          setEmployeesInCamera(res.data);
        })
        .catch((err) => {
          console.error("Error fetching employees in camera:", err);
        });
    };

    // const fetchFacesInCamera = async () => {
    //   await axios
    //     .post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/employee/get-terminal-face-total`,
    //     )
    //     .then((res) => {
    //       setFacesInCamera(res.data);
    //     })
    //     .catch((err) => {
    //       console.error("Error fetching faces in camera:", err);
    //     });
    // };

    fetchEmployeesInDb();
    fetchEmployeesInCamera();
    // fetchFacesInCamera();
  }, []);

  const handleSync = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/employee/syncall`)
      .then((res) => {
        console.log("Sync response:", res.data);
        alert(
          `${res.data.message}: ${res.data.stats.totalInDb} / ${res.data.stats.syncedToTerminal}`,
        );
      })
      .catch((err) => {
        console.error("Error syncing employees:", err);
        alert("Sinxronizatsiya qilishda xatolik yuz berdi");
      });
  };

  const handleFaceSync = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/employee/syncFacesToTerminal`)
      .then((res) => {
        console.log("Face sync response:", res.data);
        alert(
          `${res.data.message}: ${res.data.stats.totalInDb} / ${res.data.stats.syncedToTerminal}`,
        );
      })
      .catch((err) => {
        console.error("Error syncing faces:", err);
        alert("Sinxronizatsiya qilishda xatolik yuz berdi");
      });
  };

  return (
    <div className="p-5 ">
      <h1 className="mb-4">Terminal sozlamalari</h1>

      <div className="bg-white rounded-xl shadow-card">
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-3">Terminal</h2>
          <table className="overflow-auto p-5 w-full">
            <thead>
              <tr className="text-left">
                <th className="border-b border-gray p-2">Nomi</th>
                <th className="border-b border-gray p-2">Ma'lumotlar bazasi</th>
                <th className="border-b border-gray p-2">Terminal</th>
                <th className="border-b border-gray p-2">Boshlanish vaqti</th>
                <th className="border-b border-gray p-2"></th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-left">
                <th className="border-b border-gray p-2">Xodim</th>
                <th className="border-b border-gray p-2">
                  {employeesInDb.length}
                </th>
                <th className="border-b border-gray p-2">
                  {employesInCamera?.totalEmployees}
                </th>
                <th className="border-b border-gray p-2">
                  <button
                    className="bg-green text-white px-3 py-1 rounded-md cursor-pointer"
                    onClick={handleSync}
                  >
                    Sinxronizatsiya qilish
                  </button>
                </th>
                <th className="border-b border-gray p-2"></th>
              </tr>

              <tr className="text-left">
                <th className="border-b border-gray p-2">Face</th>
                <th className="border-b border-gray p-2">
                  {employeesInDb.length}
                </th>
                <th className="border-b border-gray p-2">
                  {employesInCamera?.totalEmployees}
                </th>
                <th className="border-b border-gray p-2">
                  <button
                    className="bg-green text-white px-3 py-1 rounded-md cursor-pointer"
                    onClick={handleFaceSync}
                  >
                    Sinxronizatsiya qilish
                  </button>
                </th>
                <th className="border-b border-gray p-2"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
