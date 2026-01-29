"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";

import VideoRtsp from "@/components/VideoRtsp";
import FaceSuccess from "@/components/FaceSuccess";
import TopCounter from "@/components/TopCounter";
import Jurnal from "@/components/Jurnal";

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchAttendances = async () => {
    const res = await fetch("http://localhost:5000/attendance");
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
    <div className="bg-purple flex items-center justify-center h-full p-10">
      <div className="bg-gray w-[80%] rounded-2xl p-10 h-full">
        {/* TOP SECTION  */}
        <TopCounter attendance={users} />

        {/* CENTER SECTION  */}
        <div className="flex gap-10">
          <div className="w-[50%]">
            <div className="bg-white border-10 border-purple rounded-3xl h-100 flex justify-center items-center">
              <VideoRtsp />
            </div>

            <FaceSuccess />
          </div>

          <Jurnal users={users} />
        </div>
      </div>
    </div>
  );
}
