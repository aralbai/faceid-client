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

  return (
    <div className="bg-white rounded-3xl mt-5 flex justify-between items-center p-5 px-10">
      <div className="flex gap-5 items-center">
        <div className="h-25 w-25 rounded-full border-3 border-purple overflow-hidden flex items-center justify-center">
          {lastEmployee ? (
            <img
              src={`images/${lastEmployee?.bolim}.png`}
              alt="face"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="text-sm text-gray-400">No Image</div>
          )}
        </div>

        <div>
          <h1 className="font-bold">{lastEmployee?.name?.split("-")[1]}</h1>
          <p>ID: {lastEmployee?.bolim}</p>
          <p>Bo‘lim: {lastEmployee?.name?.split("-")[0]}</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <CheckCircleOutlineIcon fontSize="large" style={{ color: "#37BC8F" }} />
        <p>Keldi</p>
      </div>
    </div>
  );
}
