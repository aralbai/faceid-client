"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import FaceSuccess from "@/components/FaceSuccess";
import TopCounter from "@/components/TopCounter";
import Jurnal from "@/components/Jurnal";

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchAttendances = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchAttendances(); // 🔥 page load
  }, []);

  useEffect(() => {
    socket.on("face-success", () => {
      fetchAttendances(); // 🔥 realtime refresh
    });

    return () => {
      socket.off("face-success");
    };
  }, []);

  return (
    <div className="bg-gray h-full">
      {/* TOP SECTION  */}
      <TopCounter attendance={users} />

      {/* CENTER SECTION  */}
      <div className="">
        <div className="sticky top-0">
          <FaceSuccess users={users} />
        </div>

        <Jurnal users={users} />
      </div>
    </div>
  );
}
