import clsx from "clsx";
import { memo, type ComponentProps } from "react";

const Wrapper = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={clsx([`max-w-8xl w-full mx-auto`, className])} {...props}>
      {children}
    </div>
  );
};

export default memo(Wrapper);
