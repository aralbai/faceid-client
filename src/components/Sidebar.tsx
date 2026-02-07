"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-green text-white"
      : "text-white hover:bg-gray hover:text-green";

  return (
    <div className="w-[15%] h-full p-5 bg-black">
      <div className="flex flex-col items-center">
        <img src="/images/logo.png" alt="" className="w-[40%]" />
        <h1 className="font-bold text-center text-white mt-3">
          Qoraqalpog'iston Respublikasi Ichki ishlar vazirligi Ma'naviy-ma'rifiy
          ishlar va kadrlar bilan ta'minlash xizmati
        </h1>
      </div>

      <ul className="mt-8">
        <li className="mb-3">
          <Link
            href="/"
            className={`block py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive(
              "/",
            )}`}
          >
            <FilterCenterFocusOutlinedIcon />
            Scan
          </Link>
        </li>

        <li className="mb-3">
          <Link
            href="/stats"
            className={`block py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive(
              "/stats",
            )}`}
          >
            <DashboardOutlinedIcon /> Statistika
          </Link>
        </li>

        <li className="mb-3">
          <Link
            href="/journal"
            className={`block py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive(
              "/journal",
            )}`}
          >
            <PermContactCalendarOutlinedIcon />
            Jurnal
          </Link>
        </li>

        <li className="mb-3">
          <Link
            href="/employees"
            className={`block py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive(
              "/employees",
            )}`}
          >
            <RecentActorsOutlinedIcon /> Sohaviy xizmatlar
          </Link>
        </li>
      </ul>
    </div>
  );
}
