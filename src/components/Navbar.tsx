"use client";

import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  setSidebarOpen: (value: boolean) => void;
};

export default function Navbar({ setSidebarOpen }: Props) {
  return (
    <div className="sticky top-0 bg-white shadow-card p-3 lg:p-5 flex justify-between mb-2 lg:mb-4">
      <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <MenuIcon />
      </button>

      <div></div>
    </div>
  );
}
