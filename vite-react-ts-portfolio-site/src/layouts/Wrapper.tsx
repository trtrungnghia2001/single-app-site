import clsx from "clsx";
import { ComponentProps, FC } from "react";

const Wrapper: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={clsx([`max-w-6xl w-full mx-auto p-3`, className])}
      {...props}
    ></div>
  );
};

export default Wrapper;
