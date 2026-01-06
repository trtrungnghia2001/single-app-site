import { useThemeContext } from "@/contexts/ThemeContext";
import { memo, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";

const Header = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="shadow p-4 z-50 sticky top-0 backdrop-blur-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link to={`/`} className="font-bold text-lg">
            FE REACT
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <IoIosSunny size={20} />
              ) : (
                <IoIosMoon size={20} />
              )}
            </button>
            <button onClick={() => setOpen(!open)}>
              <MdOutlineRestaurantMenu size={20} />
            </button>
          </div>
        </div>
      </div>
      <SidebarLeft
        className={open ? "block" : "hidden"}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default memo(Header);
