import { header_links } from "../constants";
import Wrapper from "./Wrapper";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import clsx from "clsx";

const ButtonNav = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-3 right-3 p-1.5 rounded-full"
          style={{
            boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
          }}
          onClick={handleOpen}
        >
          <MdDashboard size={20} />
        </button>
      )}
      <div
        className={clsx([
          `fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-lg shadow`,
          open ? "block" : "hidden",
        ])}
        style={{
          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
        }}
      >
        <Wrapper>
          <ul className="grid grid-cols-3">
            {header_links.map((item) => (
              <li key={item.label}>
                <a
                  href={`#` + item.path}
                  onClick={handleClose}
                  className={`flex flex-col items-center gap-2 p-3`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-3">
            <li></li>
            <li></li>
            <li className={`flex flex-col items-center gap-2 p-3`}>
              <button onClick={handleClose}>
                <IoClose size={20} />
              </button>
            </li>
          </ul>
        </Wrapper>
      </div>
    </>
  );
};

export default ButtonNav;
