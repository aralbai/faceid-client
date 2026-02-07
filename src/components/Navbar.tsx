import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <div className="sticky top-0 border-b-2 bg-gray border-b-border-bottom shodaw-card p-5 flex  justify-between ">
      <div>
        <MenuIcon />
      </div>

      <div className="bg-white w-[20%] p-2 px-3 rounded-md flex justify-between gap-2 shadow-input">
        <input type="text" className="outline-none w-full" />
        <SearchIcon />
      </div>
    </div>
  );
}
