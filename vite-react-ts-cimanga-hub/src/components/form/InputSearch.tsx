import clsx from "clsx";
import { memo, type ComponentProps } from "react";
import { MdSearch } from "react-icons/md";

const InputSearch = ({ className, ...props }: ComponentProps<"input">) => {
  return (
    <div className={clsx([`bg-input px-4 rounded-lg `, className])}>
      <div className="flex items-center gap-2">
        <MdSearch size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm phim, truyện, anime"
          className="w-full border-none outline-none bg-transparent py-2 placeholder:text-muted-foreground"
          {...props}
        />
      </div>
    </div>
  );
};

export default memo(InputSearch);
