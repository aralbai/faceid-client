"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Employees() {
  const [bolims, setBolims] = useState([]);

  useEffect(() => {
    const fetchBolims = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/bolim`)
        .then((res) => setBolims(res.data))
        .catch((err) => console.log(err));
    };

    fetchBolims();
  }, []);

  return (
    <div>
      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Sohaviy xizmatlar</h1>

          <button className="bg-green text-white px-4 py-2 rounded-md cursor-pointer">
            Yangi bo'lim qo'shish
          </button>
        </div>

        <ul className="rounded-xl overflow-hidden">
          {bolims.map((bolim: any) => (
            <li key={bolim._id}>
              <div className="p-2 bg-white flex items-center justify-between border-b border-gray">
                <Link href={`/employees/${bolim._id}`}>
                  <h2 className="text-lg font-semibold">{bolim.name}</h2>
                </Link>
                <div className="flex gap-3">
                  <button className=" rounded-md cursor-pointer">
                    <EditIcon />
                  </button>
                  <button className="  rounded-md cursor-pointer">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
