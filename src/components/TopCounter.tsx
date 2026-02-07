"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TopCounter({ attendance }: { attendance: any }) {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployes = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/employee`)
        .then((res) => setEmployee(res.data))
        .catch((err) => console.log(err));
    };

    fetchEmployes();
  }, []);
  return (
    <div className="rounded-md flex justify-between gap-10">
      <div className="bg-white rounded-md flex-1 p-5 shadow-card">
        <div className="bg-green rounded-md p-3">
          <div className="text-white flex justify-between items-center">
            <h1>Shaxsiy tarkib soni:</h1>
            <b className="text-md"> {employee.length}</b>
          </div>

          <div className="bg-green rounded-md text-white flex justify-between items-center">
            <h1>Mashg'ulotga qatnashganlar:</h1>
            <b className="text-md">{attendance.length}</b>
          </div>

          <div className="bg-green rounded-md text-white flex justify-between items-center">
            <h1>Mashg'ulotga qatnashmaganlar:</h1>
            <b className="text-md">{employee.length - attendance.length}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
