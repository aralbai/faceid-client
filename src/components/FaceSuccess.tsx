import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FaceSuccess({ users }: any) {
  const [lastEmployee, setLastEmployee] = useState({
    name: "",
    employeeNo: "",
    employeeId: {
      bolim: "",
    },
  });

  useEffect(() => {
    const fetchLastEmployee = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/attendance/last`)
        .then((res) => setLastEmployee(res.data))
        .catch((err) => console.log(err));
    };

    fetchLastEmployee();
  }, [users]);

  const formatEmployeeImageName = (employeeNo?: string) => {
    if (!employeeNo) return null;

    // A123456 → A-123456
    return employeeNo.replace(/^([A-Za-z])(\d+)/, "$1-$2");
  };

  const imageName = formatEmployeeImageName(lastEmployee?.employeeNo);

  return (
    <div className="sticky top-0 bg-white rounded-md mt-3 mb-3 flex justify-between items-center px-4 py-2 shadow-card">
      <div className="flex gap-5 items-center">
        <div className="h-25 w-25 rounded-full border-3 border-green overflow-hidden flex items-center justify-center p-2">
          {lastEmployee ? (
            <img
              className=""
              src={`/images/employee/${imageName}.png`}
              onError={(e) => {
                const img = e.currentTarget;

                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = `/images/employee/${imageName}.jpg`;
                } else {
                  img.src = `/images/employee/${imageName}.jpeg`;
                }
              }}
              alt=""
            />
          ) : (
            <img src="/images/noavatar.jpg" alt="" />
          )}
        </div>

        <div>
          <h1 className="font-bold">{lastEmployee?.name}</h1>
          <p>{lastEmployee?.employeeNo}</p>
          <p>{lastEmployee?.employeeId?.bolim}</p>
        </div>
      </div>
    </div>
  );
}
