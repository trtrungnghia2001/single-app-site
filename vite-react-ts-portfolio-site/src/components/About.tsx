import { PiReadCvLogoFill } from "react-icons/pi";
import Wrapper from "../layouts/Wrapper";
import { about, avatar_url } from "../constants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <section className="section" id="about">
      <Wrapper className="space-y-16">
        <div className="text-center space-y-1">
          <h2>About Me</h2>
          <p className="text-text-2">My introduction</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          <motion.div
            ref={ref}
            initial={{
              x: -100,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    x: 0,
                    opacity: 1,
                  }
                : {
                    x: -100,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1,
            }}
            className=""
          >
            <div className="w-80 aspect-square rounded-lg overflow-hidden">
              <img
                src={avatar_url}
                alt="avatar"
                loading="lazy"
                className="image"
              />
            </div>
          </motion.div>
          <motion.div
            ref={ref}
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 100,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1,
            }}
            className="flex-1 md:max-w-[50%] space-y-6"
          >
            <ul className="grid sm:grid-cols-3 gap-6">
              {about.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-1 shadow rounded-lg p-5 border"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-xs text-text-2">{item.content}</span>
                </li>
              ))}
            </ul>
            <p className="text-text-2">
              Frontend developer, I create web pages with UI / UX user
              interface, I have years of experience and many clients are happy
              with the projects carried out.
            </p>
            <button className="btn ">
              <span>Download CV</span>
              <PiReadCvLogoFill />
            </button>
          </motion.div>
        </div>
      </Wrapper>
    </section>
  );
};

export default About;
