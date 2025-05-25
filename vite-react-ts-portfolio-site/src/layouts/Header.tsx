import { Link, useLocation } from "react-router-dom";
import { header_links } from "../constants";
import Wrapper from "./Wrapper";
import clsx from "clsx";

const Header = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50">
      <Wrapper className="flex items-center justify-between">
        <div>
          <Link to={`/`} className="text-xl font-semibold">
            Portfolio
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-6">
            {header_links.map((item) => (
              <li key={item.label}>
                <a
                  href={`#` + item.path}
                  className={clsx([
                    location.hash.includes(item.path) && `text-blue-500`,
                  ])}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
