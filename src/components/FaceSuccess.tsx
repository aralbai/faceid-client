import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
export default function FaceSuccess({ users, reloadAttendances }: any) {
  const [lastEmployee, setLastEmployee] = useState({
    name: "",
    employeeNo: "",
    employeeId: {
      imageUrl: "",
      bolim: {
        name: "",
      },
    },
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchLastEmployee = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/attendance/last`)
        .then((res) => setLastEmployee(res.data))
        .catch((err) => console.log(err));
    };

    fetchLastEmployee();
  }, [users, reloadAttendances]);

  const formatEmployeeImageName = (employeeNo?: string) => {
    if (!employeeNo) return null;

    // A123456 → A-123456
    return employeeNo.replace(/^([A-Za-z])(\d+)/, "$1-$2");
  };

  const imageName = formatEmployeeImageName(lastEmployee?.employeeId?.imageUrl);

  return (
    <div className="sticky top-0 bg-white rounded-md mt-3 mb-3 flex justify-between items-center px-2 lg:px-4 py-2 shadow-card">
      <div className="flex gap-2 lg:gap-5 items-center">
        <div className="h-20 w-20 lg:h-25 lg:w-25 rounded-full border-3 border-green overflow-hidden flex items-center justify-center p-2">
          {imageName ? (
            <img className="" src={`/images/employee/${imageName}`} alt="" />
          ) : (
            <img src="/images/noavatar.jpg" alt="" />
          )}
        </div>

        <div>
          <h1 className="text-sm lg:text-lg font-bold">{lastEmployee?.name}</h1>
          <p className="text-xs lg:text-sm">
            {lastEmployee?.employeeId?.bolim?.name}
          </p>
          <p className="text-xs lg:text-sm">
            <b>Keldi:</b>
            {lastEmployee?.startDate &&
              format(new Date(lastEmployee?.startDate), "dd.MM.yyyy HH:mm:ss")}
          </p>
          <p className="text-xs lg:text-sm">
            <b>Ketdi:</b>
            {lastEmployee?.endDate &&
              format(new Date(lastEmployee?.endDate), "dd.MM.yyyy HH:mm:ss")}
          </p>
        </div>
      </div>
    </div>
  );
}
