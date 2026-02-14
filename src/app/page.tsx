"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import FaceSuccess from "@/components/FaceSuccess";
import TopCounter from "@/components/TopCounter";
import Jurnal from "@/components/Jurnal";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [attendances, setAttendances] = useState([]);
  const [reloadAttendances, setReloadAttendances] = useState(false);

  // 🔥 API’dan active jurnal attendances’ini fetch qilish
  const fetchAttendances = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/attendance/active-jurnal`,
    );
    const data = await res.json();
    setAttendances(data);
  };

  useEffect(() => {
    fetchAttendances(); // 🔥 page load
  }, [reloadAttendances]);

  useEffect(() => {
    socket.on("face-success", () => {
      console.log("🟢 SOCKET RECEIVED:", Date.now());
      setReloadAttendances((prev) => !prev); // 🔥 realtime refresh
    });

    return () => {
      socket.off("face-success");
    };
  }, []);

  return (
    <div className="bg-gray h-full">
      <div className="p-1 lg:p-5">
        {/* TOP SECTION  */}
        <TopCounter attendance={attendances} />

        {/* CENTER SECTION  */}
        <div className="">
          <div className="sticky top-0">
            <FaceSuccess
              attendances={attendances}
              reloadAttendances={reloadAttendances}
            />
          </div>

          <Jurnal
            attendances={attendances}
            setReloadAttendances={setReloadAttendances}
          />
        </div>
      </div>
    </div>
  );
}
