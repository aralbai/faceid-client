"use client";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
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
      <div className="bg-white rounded-4xl flex-1 flex flex-col items-center justify-center p-5">
        <p className="mb-2">Шахсий таркиб сони</p>
        <h1 className="font-bold text-3xl">{employee.length}</h1>
      </div>
      <div className="bg-white rounded-4xl flex-1 flex items-center justify-center gap-10">
        <CheckCircleOutlineIcon
          style={{ fontSize: "50px", color: "#37BC8F" }}
        />
        <div className="flex flex-col items-center justify-center">
          <p className="">Машғулотга қатнашган ходимлар сони</p>
          <h1 className="font-bold text-3xl" style={{ color: "#37BC8F" }}>
            {attendance.length}
          </h1>
        </div>
      </div>
      <div className="bg-white rounded-4xl flex-1 flex items-center justify-center gap-10">
        <CancelIcon style={{ fontSize: "50px", color: "#CE5A5D" }} />
        <div className="flex flex-col items-center justify-center">
          <p className="">Машғулотга қатнашмаган ходимлар сони</p>
          <h1 className="font-bold text-3xl" style={{ color: "#CE5A5D" }}>
            {employee.length - attendance.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
