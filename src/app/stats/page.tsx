"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Stats() {
  const [jurnals, setJurnals] = useState();
  const [bolimCount, setBolimCount] = useState([]);

  const now = new Date();

  // Joriy oyning 1-kuni
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // YYYY-MM-DD format
  const formatDate = (date: any) => date.toLocaleDateString("en-CA");
  // en-CA -> 2026-02-01 format beradi

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));

  const [endDate, setEndDate] = useState(formatDate(now));

  useEffect(() => {
    const fetchJurnals = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jurnal/count`,
          {
            params: {
              startDate,
              endDate,
            },
          },
        );

        setJurnals(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBolimCount = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/bolim/count`,
          {
            params: {
              startDate,
              endDate,
            },
          },
        );

        setJurnals(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJurnals();

    fetchBolimCount();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="flex justify-between items-center">
          <h1>Statistika</h1>

          <div className="flex">
            <div className="mr-4">
              <input
                type="date"
                className="bg-white border border-gray-300 rounded-md p-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mr-4">
              <input
                type="date"
                className="bg-white border border-gray-300 rounded-md p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
