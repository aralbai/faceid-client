import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-5">
      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl">Sozlamalar</h1>
          <div></div>
        </div>

        <ul>
          <li>
            <div className="p-3 border rounded-md mb-2 flex items-center justify-between">
              <Link href={`/settings/camera`}>
                <h2 className="text-lg font-semibold">Terminal sozlamalari</h2>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
