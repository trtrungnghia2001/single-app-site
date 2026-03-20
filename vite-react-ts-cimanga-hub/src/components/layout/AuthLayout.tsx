import { authNavs } from "@/constants";
import clsx from "clsx";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import Wrapper from "./Wrapper";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Wrapper className="flex items-start gap-8 p-4 md:p-8">
      <aside className="w-xs bg-header-bg rounded-lg p-8 hidden lg:block">
        <h4>Quản lý tài khoản</h4>
        <ul>
          {authNavs.map((nav) => (
            <li
              key={nav.path}
              className="border-b border-b-border last:border-none"
            >
              {nav.isButton ? (
                <button
                  onClick={async () => {
                    if (nav.type === "signout") {
                      //   await signOut();
                    }
                    // onClose();
                  }}
                  className={clsx([
                    `flex items-center gap-2 py-4 w-full hover:text-yellow-500`,
                  ])}
                >
                  <span className="text-lg">{nav.icon}</span>
                  {nav.title}
                </button>
              ) : (
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    clsx([
                      `flex items-center gap-2 py-4 w-full hover:text-yellow-500`,
                      isActive && `text-yellow-500`,
                    ])
                  }
                >
                  <span className="text-lg">{nav.icon}</span>
                  {nav.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 h-full">{children}</section>
    </Wrapper>
  );
};

export default memo(AuthLayout);
