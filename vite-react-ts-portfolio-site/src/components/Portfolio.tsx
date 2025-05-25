import Wrapper from "../layouts/Wrapper";
import { category, projectsData } from "../constants";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [index, setIndex] = useState(0);
  const categoryData = useMemo(() => {
    const getCate = category[index];
    if (getCate === "All") return projectsData;

    return projectsData.filter(
      (item) =>
        item.category.toLocaleLowerCase() === getCate.toLocaleLowerCase()
    );
  }, [index]);
  return (
    <section className="section" id="portfolio">
      <Wrapper className="space-y-16">
        <div className="text-center space-y-1">
          <h2>Portfolio</h2>
          <p className="text-text-2">Most recent work</p>
        </div>
        <div className="space-y-10">
          <div className="flex items-center gap-4 max-w-max mx-auto">
            {category.map((item, idx) => (
              <button
                onClick={() => setIndex(idx)}
                className={clsx([
                  `btn font-semibold`,
                  index === idx ? `` : `bg-transparent text-text-1 `,
                ])}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-max mx-auto">
            {categoryData.map((item) => (
              <li key={item.id}>
                <motion.div
                  whileHover={{ y: -16 }}
                  className="shadow rounded-xl max-w-xs w-full p-4 space-y-3 border"
                >
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img src={item.image} alt="thumbnail" loading="lazy" />
                  </div>
                  <h6>{item.title}</h6>
                  <Link
                    to={`/`}
                    className="flex items-center gap-2 text-text-2"
                  >
                    <span>Demo</span>
                    <IoArrowForward />
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </section>
  );
};

export default Portfolio;
