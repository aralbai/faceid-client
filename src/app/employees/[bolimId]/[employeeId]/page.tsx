"use client";

import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Employee = {
  name: String;
  employeeNo: String;
  unvon: String;
  lavozim: String;
  imageUrl: String;
};

type Bolim = {
  name: String;
};

export default function SingleEmployee() {
  const [employee, setEmployee] = useState<Employee>();
  const [bolim, setBolim] = useState<Bolim>();
  const pathname = usePathname();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [attendances, setAttendances] = useState([]);
  const [statistics, setStatistics] = useState<any>();

  const bolimId = pathname.split("/")[2];
  const employeeId = pathname.split("/")[3];

  useEffect(() => {
    const fetchBolim = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/bolim/${bolimId}`)
        .then((res) => {
          setBolim(res.data);
        })
        .catch((err) => {
          console.error("Error fetching bolim:", err);
        });
    };

    const fetchAttendances = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/employee/attendances/${employeeId}`,
        )
        .then((res) => {
          console.log(res.data);
          setAttendances(res.data?.attendances);
          setEmployee(res?.data?.employee);
          setStatistics(res?.data?.statistics);
        })
        .catch((err) => {
          console.error("Error fetching employees:", err);
        });
      length;
    };

    fetchBolim();
    fetchAttendances();
  }, [employeeId]);

  console.log(attendances);

  return (
    <div>
      <div className="p-2 lg:p-5">
        <div className="mb-4">
          <Link href="/employees" className="text-blue-500">
            Sohaviy xizmatlar
          </Link>{" "}
          /{" "}
          <Link href={`/employees/${bolimId}`} className="text-blue-500">
            {bolim?.name}
          </Link>
          {" / "}
          <i>{employee?.name}</i>
        </div>

        <div className="bg-white flex gap-5 shadow-card items-center p-5">
          <div className="w-[20%] rounded-md border-2 border-gray p-5">
            <img
              src={`/images/employee/${employee?.imageUrl}`}
              alt="employee"
              onClick={() =>
                setPreviewImage(`/images/employee/${employee?.imageUrl}`)
              }
              className="w-full object-contain cursor-pointer hover:opacity-80 transition"
            />
          </div>

          <ul className="w-[80%] flex-1 overflow-auto rounded-xl p-5  flex flex-col">
            <li className="p-2 flex justify-center"></li>
            <li className=" font-bold">{employee?.name}</li>
            <li className="">{employee?.employeeNo}</li>
            <li className="">{employee?.unvon}</li>
            <li className="">{employee?.lavozim}</li>
            <li className="border-b-2 border-gray my-2"></li>
            <li className="">
              Davomat ko'rsatkishi: <b> {statistics?.attendancePercentage} %</b>
            </li>
            <li className="">
              Umumiy tadbirlar soni: <b>{statistics?.totalJurnals}</b>
            </li>
            <li className="">
              Qatnashgan: <b>{statistics?.attendedCount}</b>
            </li>
            <li className="">
              Sababli: <b>{statistics?.excusedCount}</b>
            </li>
            <li className="">
              Qatnashmagan: <b>{statistics?.missedCount}</b>
            </li>
          </ul>
        </div>

        <div className="bg-white w-full overflow-auto rounded-xl p-5 shadow-card mt-5">
          <table className="overflow-x-auto w-full">
            <thead>
              <tr className="border-b border-gray text-left">
                <th className="p-2">Tadbir</th>
                <th className="p-2">Sana</th>
                <th className="p-2">ID raqami</th>

                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {attendances?.map((attendance: any) => (
                <tr key={attendance.jurnalId} className="border-b border-gray">
                  <td className="p-2">{attendance?.jurnalName}</td>
                  <td className="p-2">
                    {attendance?.date &&
                      format(new Date(attendance?.date), "dd.MM.yyyy")}
                  </td>
                  <td>
                    <b
                      className={
                        attendance?.status === "Qatnashmagan"
                          ? "bg-red p-2 rounded-md py-1"
                          : attendance?.status === "Qatnashgan"
                            ? "bg-green p-2 rounded-md py-1"
                            : "bg-yellow-300 p-2 rounded-md py-1"
                      }
                    >
                      {attendance?.status}
                    </b>
                  </td>
                  <td className="p-2">
                    {attendance?.startDate
                      ? format(new Date(attendance?.startDate), "HH:mm:ss")
                      : "-"}
                  </td>
                  <td className="p-2">
                    {attendance?.endDate
                      ? format(new Date(attendance?.endDate), "dd.MM.yyyy")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="preview"
            className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
