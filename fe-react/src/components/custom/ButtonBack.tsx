import { memo } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const ButtonBack = () => {
  return (
    <button
      onClick={() => {
        window.history.back();
      }}
      className="px-3 py-1 shadow rounded bg-card hover:opacity-50 transition-all"
    >
      <IoMdArrowRoundBack />
      Back
    </button>
  );
};

export default memo(ButtonBack);
