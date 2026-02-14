"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-green text-white"
      : "text-white hover:bg-gray hover:text-green";

  return (
    <>
      {/* Overlay (mobil uchun) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static
          z-50
          top-0 left-0
          h-full
          w-[70%] sm:w-[50%] lg:w-[15%]
          bg-black p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col items-center">
          <img src="/images/logo.png" alt="" className="w-[40%]" />
          <h1 className="font-bold text-center text-white mt-3">
            Qoraqalpog'iston Respublikasi Ichki ishlar vazirligi
            Ma'naviy-ma'rifiy ishlar va kadrlar bilan ta'minlash xizmati
          </h1>
        </div>

        <ul className="mt-8">
          <li className="mb-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive("/")}`}
            >
              <FilterCenterFocusOutlinedIcon />
              Scan
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/stats"
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive("/stats")}`}
            >
              <DashboardOutlinedIcon /> Statistika
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/jurnal"
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive("/jurnal")}`}
            >
              <PermContactCalendarOutlinedIcon />
              Jurnal
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/employees"
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive("/employees")}`}
            >
              <RecentActorsOutlinedIcon /> Sohaviy xizmatlar
            </Link>
          </li>

          <li className="mb-3">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md flex items-center gap-4 font-bold transition ${isActive("/settings")}`}
            >
              <SettingsIcon /> Sozlamalar
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
