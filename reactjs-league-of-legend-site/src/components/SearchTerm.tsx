import React, { FC, InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchTerm: FC<Props> = ({ className,...props }) => {
  return (
    <div className={`flex gap-2 items-center border-[--borderLightColor] border-[1px] px-4 py-2 w-full rounded ${className}`}>
      <FaSearch />
      <input type="text" {...props} className="bg-transparent text-inherit"/>
    </div>
  );
};

export default SearchTerm;
