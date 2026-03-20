import { memo } from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`/`} className="flex items-center gap-1">
      <span className="text-4xl font-bold text-sky-500 inline-block">C</span>
      <div className="">
        <p className="font-medium bg-linear-90 from-red-500 via-orange-400 to-sky-500 bg-clip-text text-transparent">
          imangaHub
        </p>
        <p className="text-10 text-muted-foreground">Thế giới giải trí</p>
      </div>
    </Link>
  );
};

export default memo(Logo);
