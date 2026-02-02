"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TopCounter({ attendance }: { attendance: any }) {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      await axios
        .get("http://localhost:5000/employee")
        .then((res) => setEmployee(res.data))
        .catch((err) => console.log(err));
    };

    fetchEmployes();
  }, []);
  return (
    <div className="rounded-md flex justify-between gap-10 mb-10">
      <div className="bg-white rounded-md flex-1 p-5 shadow-card">
        <h1 className="border-b-2 border-b-green text-green">
          Shaxsiy tarkib soni
        </h1>

        <div className="bg-green rounded-md text-white flex justify-between items-center gap-10 p-8 mt-3">
          <AccountCircleOutlinedIcon style={{ fontSize: "40px" }} />
          <b className="text-4xl">{employee.length}</b>
        </div>
      </div>

      <div className="bg-green rounded-md flex-1 p-5 shadow-card">
        <h1 className="border-b-2 border-b-gray text-white">
          Mashg'ulotga qatnashgan xodimlar soni
        </h1>

        <div className="bg-white rounded-md text-green flex justify-between items-center gap-10 p-8 mt-3">
          <CheckCircleOutlineIcon style={{ fontSize: "40px" }} />
          <div>
            <b className="text-4xl">{attendance.length}</b>
            <p></p>
          </div>
        </div>
      </div>

      <div className="bg-green rounded-md flex-1 p-5 shadow-card">
        <h1 className="border-b-2 border-b-gray text-white">
          Mashg'ulotga qatnashmagan xodimlar soni
        </h1>

        <div className="bg-white rounded-md text-green flex justify-between items-center gap-10 p-8 mt-3">
          <CancelIcon style={{ fontSize: "40px", color: "#E73D1C" }} />
          <b className="text-4xl text-red">
            {employee.length - attendance.length}
          </b>
        </div>
      </div>
    </div>
  );
}
