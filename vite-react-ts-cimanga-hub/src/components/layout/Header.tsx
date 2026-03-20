import { memo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonTheme from "./ButtonTheme";
import clsx from "clsx";
import InputSearch from "../form/InputSearch";
import { CgMenuRightAlt } from "react-icons/cg";
import Logo from "../custom/Logo";
import Slideleft from "./Sideleft";
import { navs } from "@/constants";
import ButtonDownloadApp from "../custom/ButtonDownloadApp";
import { useAuthStore } from "@/stores/authStore";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { profile } = useAuthStore();

  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <>
      <header
        className={clsx([
          `sticky top-0 left-0 right-0 z-50`,
          `px-5 py-3 bg-header-bg text-sm`,
        ])}
      >
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <InputSearch
            className="w-xs hidden md:block"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?keyword=${text}`);
              }
            }}
          />

          <div className="flex-1 flex items-center justify-between">
            <nav className="">
              <ul className="hidden xl:flex items-center gap-4">
                {navs.map((nav) => (
                  <li key={nav.path}>
                    <NavLink
                      to={nav.path}
                      className={({ isActive }) =>
                        clsx([
                          `hover:text-yellow-500 font-medium`,
                          isActive && `text-yellow-500`,
                        ])
                      }
                    >
                      {nav.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4 text-13">
              <ButtonDownloadApp className="hidden md:block" />
              <ButtonTheme />
              {!profile && (
                <Link
                  to={`/signin`}
                  className="rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all px-3 py-1.5"
                >
                  Đăng nhập
                </Link>
              )}
              <button onClick={() => setOpenSidebar(true)}>
                <CgMenuRightAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <Slideleft open={openSidebar} onClose={() => setOpenSidebar(false)} />
    </>
  );
};

export default memo(Header);
