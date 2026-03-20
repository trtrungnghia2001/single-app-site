import clsx from "clsx";
import { memo, type ComponentProps } from "react";
import { MdInstallMobile } from "react-icons/md";
import { Link } from "react-router-dom";

const ButtonDownloadApp = ({ className, ...props }: ComponentProps<"a">) => {
  return (
    <Link
      to={`/download-app`}
      className={clsx([`block`, className])}
      {...props}
    >
      <div className="flex items-center gap-1">
        <MdInstallMobile size={28} className="text-yellow-500" />
        <p>
          <span className="text-muted-foreground text-xs block">
            Tải ứng dụng
          </span>
          <span className="font-bold block text-xs">CimangaHub</span>
        </p>
      </div>
    </Link>
  );
};

export default memo(ButtonDownloadApp);
