import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import * as XLSX from "xlsx";


export   const exportToExcel = (attendances: any) => {
    if (!attendances || attendances.length === 0) return;

    const data = attendances.map((attendance: any) => ({
      "Bo‘lim": attendance?.employeeId?.bolim || "",
      "Hodim F.I.SH": attendance?.employeeId?.name || "",
      "Kelgan vaqti": format(new Date(attendance?.date), "dd.MM.yyyy HH:mm:ss") || "",
      "Ketgan vaqti": "-", // agar yo‘q bo‘lsa
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal");

    XLSX.writeFile(
      workbook,
      `jurnal_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };