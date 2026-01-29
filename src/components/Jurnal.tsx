import { format } from "date-fns";

export default function Jurnal({ users }: { users: any }) {
  return (
    <div className="w-[50%] h-140 bg-white rounded-2xl p-5 flex flex-col">
      <h1 className="text-center font-medium">Present list</h1>

      <table className="employeeList overflow-auto p-5">
        <thead>
          <tr className="text-center">
            <th className="border border-gray px-2">Bo'lim</th>
            <th className="border border-gray">Hodim F.I.SH</th>
            <th className="border border-gray">Kelgan vaqti</th>
            <th className="border border-gray">Ketgan vaqti</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index} className="border border-gray">
              <td className="border border-gray  px-2">
                {user?.name.split("-")[0]}
              </td>
              <td className="border border-gray  px-2">
                {user?.name.split("-")[1]}
              </td>
              <td className="border border-gray  px-2">
                {format(new Date(user?.date), "dd.MM.yyyy HH.mm.ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
