import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
const link = `https://www.youtube.com/watch?v=3aCoZudPEKE&t=118s`;

const Footer = () => {
  return (
    <div className="text-center border-t py-2">
      <Wrapper>
        <p className="text-[13px]">
          &copy; 28-04-2025 by Phelan White. All rights reserved.{" "}
          <Link to={link} className="underline text-blue-500">
            Origin
          </Link>
        </p>
      </Wrapper>
    </div>
  );
};

export default Footer;
