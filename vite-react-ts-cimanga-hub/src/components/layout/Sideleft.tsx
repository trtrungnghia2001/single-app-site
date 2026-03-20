import { authNavs, IMAGE_DEFAULT, navs } from "@/constants";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputSearch from "../form/InputSearch";
import ButtonDownloadApp from "../custom/ButtonDownloadApp";
import Logo from "../custom/Logo";
import { MdClose } from "react-icons/md";
import { useAuthStore } from "@/stores/authStore";

type SlideleftType = {
  open: boolean;
  onClose: () => void;
};

const Sideleft = ({ onClose, open }: SlideleftType) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const { profile, signOut } = useAuthStore();

  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <aside
      className={clsx(
        "fixed inset-0 z-[100] transition-all duration-300",
        open ? "visible" : "invisible",
      )}
    >
      {/* Overlay: Nền mờ phía sau */}
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/60 transition-opacity duration-300 -z-10",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Main Content: Sidebar */}
      <div
        className={clsx([
          `bg-background h-full max-w-[320px] w-full flex flex-col relative z-10 shadow-2xl transition-transform duration-300 ease-in-out`,
          open ? `translate-x-0` : `-translate-x-full`,
        ])}
      >
        {/* Header */}
        <section className="flex items-center justify-between p-4 border-b border-border/50">
          <Logo />
          <button
            onClick={onClose}
            className="p-1 hover:bg-input rounded-full transition-colors"
          >
            <MdClose size={22} />
          </button>
        </section>

        {/* Scrollable Area */}
        <section className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {profile && (
            <>
              {/* User Profile Info */}
              <div className="flex items-center gap-3 p-3 bg-input/50 rounded-xl border border-border">
                <img
                  loading="lazy"
                  alt="avatar"
                  src={profile?.avatar_url || IMAGE_DEFAULT.AVATAR}
                  className="object-cover rounded-full border border-border aspect-square w-12"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-base line-clamp-1">
                    {profile?.username}
                  </p>
                  <p className="text-muted-foreground text-xs line-clamp-1">
                    {profile?.email}
                  </p>
                </div>
              </div>
              {/* Auth Navigation */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-muted-foreground uppercase px-2">
                  Cá nhân
                </p>
                <ul className="grid gap-2 grid-cols-2">
                  {authNavs.map((nav) => (
                    <li key={nav.path}>
                      {nav.isButton ? (
                        <button
                          onClick={async () => {
                            if (nav.type === "signout") {
                              await signOut();
                            }
                            onClose();
                          }}
                          className={clsx([
                            `flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border border-transparent w-full`,
                            `hover:bg-input border-border/50`,
                          ])}
                        >
                          <span className="text-lg">{nav.icon}</span>
                          {nav.title}
                        </button>
                      ) : (
                        <NavLink
                          to={nav.path}
                          onClick={() => onClose()}
                          className={({ isActive }) =>
                            clsx([
                              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border border-transparent w-full`,
                              isActive
                                ? `bg-red-500/10 text-red-500 border-red-500/20 shadow-sm`
                                : `hover:bg-input border-border/50`,
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
              </div>
            </>
          )}

          {/* Search Input */}
          <InputSearch
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search?keyword=${text}`);
                onClose();
              }
            }}
          />

          {/* Main Navigation */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-muted-foreground uppercase px-2">
              Khám phá
            </p>
            <ul className="grid gap-2 grid-cols-2">
              {navs.map((nav) => (
                <li key={nav.path}>
                  <NavLink
                    to={nav.path}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      clsx([
                        `block px-3 py-2.5 rounded-lg text-xs font-medium text-center transition-all border`,
                        isActive
                          ? `bg-red-600 text-white border-red-600 shadow-md`
                          : `bg-input/50 border-border hover:border-red-500 hover:text-red-500`,
                      ])
                    }
                  >
                    {nav.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download */}
          <div className="pt-4 border-t border-border">
            <ButtonDownloadApp className="bg-button px-4 py-2 rounded-lg flex items-center justify-center border border-border hover:border-red-500 transition-all" />
          </div>
        </section>
      </div>
    </aside>
  );
};

export default memo(Sideleft);
