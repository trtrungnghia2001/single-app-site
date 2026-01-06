import { useThemeContext } from "@/contexts/ThemeContext";
import { memo } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="shadow p-4 z-50 sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-between gap-4">
        <Link to={`/`} className="font-bold text-lg">
          Header
        </Link>
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <IoIosSunny size={20} />
          ) : (
            <IoIosMoon size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(Header);
