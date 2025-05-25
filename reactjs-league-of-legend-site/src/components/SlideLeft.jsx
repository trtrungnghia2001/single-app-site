import { LogoIcon, menuLink } from "app/commons";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const SlideLeft = ({ setIsSliderLeft }) => {
  return (
    <div className="fixed top-0 left-0 z-[101] w-full bg-[rgba(0,0,0,0.75)] min-h-screen">
      <div className="bg-[--blackColor] text-white p-4 max-w-[400px] w-full min-h-screen">
        <div className="flex items-center justify-between">
          <Link to={"/"} onClick={() => setIsSliderLeft(false)}>
            <LogoIcon className="fill-white" />
          </Link>
          <button className="text-xl" onClick={() => setIsSliderLeft(false)}>
            <IoIosClose />
          </button>
        </div>
        <ul className="mt-8">
          {menuLink?.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  onClick={() => setIsSliderLeft(false)}
                  to={item.path}
                  className="block transition px-4 py-2 rounded hover:bg-[rgb(51,51,51)] font-bold"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SlideLeft;
