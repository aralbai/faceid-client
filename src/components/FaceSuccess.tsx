import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FaceSuccess({ users }: { users: any }) {
  const [lastEmployee, setLastEmployee] = useState({});

  useEffect(() => {
    const fetchLastEmployee = async () => {
      await axios
        .get("http://localhost:5000/attendance/last")
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
    <div className="bg-white rounded-3xl mt-5 flex justify-between items-center p-5 px-10 shadow-card">
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
            <div className="text-sm text-gray-400">No Image</div>
          )}
        </div>

        <div>
          <h1 className="font-bold">{lastEmployee?.name}</h1>
          <p>{lastEmployee?.employeeNo}</p>
          <p>{lastEmployee?.employeeId?.bolim}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckCircleOutlineIcon fontSize="large" style={{ color: "#37BC8F" }} />
        <p>Keldi</p>
      </div>
    </div>
  );
}
