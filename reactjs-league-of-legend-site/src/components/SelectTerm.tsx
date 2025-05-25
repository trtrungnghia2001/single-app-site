import React, { FC, SelectHTMLAttributes } from "react";
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}
const SelectTerm: FC<Props> = ({ label, name, className, ...props }) => {
  return (
    <div
      className={`border-[--borderLightColor] border-[1px] px-4 py-2 w-full rounded ${className}`}
    >
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...props} className="capitalize"></select>
    </div>
  );
};

export default SelectTerm;
