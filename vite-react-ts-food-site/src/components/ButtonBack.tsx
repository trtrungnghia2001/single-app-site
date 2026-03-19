import { IoMdArrowRoundBack } from "react-icons/io";

const ButtonBack = () => {
  return (
    <button onClick={() => window.history.back()} className="btn">
      <IoMdArrowRoundBack />
      Back
    </button>
  );
};

export default ButtonBack;
