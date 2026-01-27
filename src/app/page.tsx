"use client";

import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Home() {
  return (
    <div className="bg-purple flex items-center justify-center h-full p-10">
      <div className="bg-gray w-[60%] rounded-2xl p-10 h-full">
        {/* TOP SECTION  */}
        <div className="rounded-md flex justify-between gap-10 mb-10">
          <div className="bg-white rounded-4xl flex-1 flex flex-col items-center justify-center p-5">
            <p className="mb-2">All employes</p>
            <h1 className="font-bold">500</h1>
          </div>

          <div className="bg-white rounded-4xl flex-1 flex items-center justify-center gap-10">
            <CheckCircleOutlineIcon
              style={{ fontSize: "30px", color: "#37BC8F" }}
            />
            <div className="flex flex-col items-center justify-center">
              <p className="">Absent</p>
              <h1 className="font-bold">300</h1>
            </div>
          </div>

          <div className="bg-white rounded-4xl flex-1 flex items-center justify-center gap-10">
            <CancelIcon style={{ fontSize: "30px", color: "#CE5A5D" }} />
            <div className="flex flex-col items-center justify-center">
              <p className="">Absent</p>
              <h1 className="font-bold">300</h1>
            </div>
          </div>
        </div>

        {/* CENTER SECTION  */}
        <div className="flex gap-10">
          <div className="w-[60%]">
            <div className="bg-white border-10 border-purple rounded-3xl h-100"></div>

            <div className="bg-white rounded-3xl mt-5 flex justify-between items-center p-5 px-10">
              <div className="flex gap-5 items-center">
                <div className="h-25 w-25 rounded-full border-3 border-purple"></div>

                <div>
                  <h1 className="font-bold">Hohn.D</h1>
                  <p>ID:1234567</p>
                  <p>Bolim: JXX</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <CheckCircleOutlineIcon
                  fontSize="large"
                  style={{ color: "#37BC8F" }}
                />
                <p>Present</p>
              </div>
            </div>
          </div>

          <div className="w-[40%] h-140 bg-white rounded-2xl p-5 flex flex-col">
            <h1 className="text-center font-medium">Present list</h1>

            <ul className="employeeList overflow-auto p-5">
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>

              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
              <li className="flex justify-between border-b border-b-gray">
                <Link href="">D.John</Link>
                <p>-10:45:33</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
