import { BsSendFill } from "react-icons/bs";
import Wrapper from "../layouts/Wrapper";
import { IoMdArrowRoundDown } from "react-icons/io";
import { SlMouse } from "react-icons/sl";
import { avatar_url, social_links } from "../constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="section flex items-center justify-center" id="home">
      <Wrapper className="flex flex-col-reverse md:flex-row gap-10 justify-between">
        {/* left */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex items-center gap-10 md:max-w-xl"
        >
          <ul className="hidden md:flex flex-col gap-4 p-4">
            {social_links.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-base hover:text-blue-500 transition-all"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="font-bold">Trần Trung Nghĩa</h1>
              <h5 className="flex items-center gap-3">
                <hr className="w-10" />
                Visual Designer
              </h5>
              <p className="text-text-2">
                I'm creative designer based in New York, and I'm very passionate
                and dedicated to my work.
              </p>
            </div>
            <button className="btn ">
              <span>Say Hello</span>
              <BsSendFill />
            </button>
            <a href="#about" className="flex items-center gap-2 text-blue-500">
              <SlMouse size={20} />
              <span>Scroll Down</span>
              <IoMdArrowRoundDown className="animate-bounce" />
            </a>
          </div>
        </motion.div>
        {/* right */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-10"
        >
          <ul className="md:hidden flex flex-col gap-4 p-4">
            {social_links.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-base hover:text-blue-500 transition-all"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-[200px] md:w-[300px] aspect-square rounded-full overflow-hidden">
            <img
              src={avatar_url}
              alt="avatar"
              loading="lazy"
              className="image"
            />
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
};

export default Home;
