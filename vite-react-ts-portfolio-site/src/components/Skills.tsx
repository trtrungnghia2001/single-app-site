import Wrapper from "../layouts/Wrapper";
import { skills } from "../constants";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section className="section" id="skills">
      <Wrapper className="space-y-16">
        <div className="text-center space-y-1">
          <h2>Skills</h2>
          <p className="text-text-2">My technical level</p>
        </div>
        <ul className="flex flex-col sm:flex-row gap-10 justify-center items-center">
          {skills.map((item, idx) => (
            <li key={idx} className="max-w-xs w-full">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: idx }}
                className="shadow rounded-xl p-8 border"
              >
                <h5 className="mb-6 text-center">{item.label}</h5>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {item.children.map((subItem) => (
                    <li key={subItem.label} className="flex items-start gap-2 ">
                      <FaRegCheckCircle className="mt-0.5" />
                      <div>
                        <h6>{subItem.label}</h6>
                        <div className="text-xs text-text-2">
                          {subItem.content}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  );
};

export default Skills;
