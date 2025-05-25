import { menuLink } from "app/commons";
import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "app/commons";
import { HiBars3 } from "react-icons/hi2";

const Header = ({setIsSliderLeft}) => {
  return (
    <div className="bg-[--blackColor] text-white py-4 font-bold sticky top-0 left-0 w-full z-[100]">
      <div className="container flex justify-between items-center">
        <Link to={'/'}>
          <LogoIcon className="fill-white" />
        </Link>
        <ul className="hidden md:flex items-center">
          {menuLink?.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}
                className={`block transition px-4 py-1 rounded hover:bg-[rgb(51,51,51)] font-bold`}
                >{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <button className="text-xl md:hidden" onClick={()=>setIsSliderLeft(true)}>
          <HiBars3 />
        </button>
      </div>
    </div>
  );
};

export default Header;
