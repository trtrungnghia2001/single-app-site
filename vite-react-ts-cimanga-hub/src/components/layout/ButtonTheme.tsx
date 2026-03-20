import { memo, useEffect, useState } from "react";
import bgLight from "@/assets/image/bg-lightmode.png";
import bgDark from "@/assets/image/bg-darkmode.png";
import btnDark from "@/assets/image/btn-darkmode.png";
import btnLight from "@/assets/image/btn-lightmode.png";
import clsx from "clsx";

type ThemeType = "light" | "dark";

const ButtonTheme = () => {
  // Lấy theme từ local hoặc mặc định là light
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="relative rounded-full select-none cursor-pointer h-8 w-16 transition-all duration-500 bg-cover bg-center border border-black/5 dark:border-white/10"
      style={{ backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})` }}
    >
      <div
        className={clsx(
          "absolute top-0.5 w-7 h-7 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          theme === "dark" ? "left-[calc(100%-30px)]" : "left-0.5"
        )}
      >
        <img
          src={theme === "dark" ? btnDark : btnLight}
          alt="icon"
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default memo(ButtonTheme);
