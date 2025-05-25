import React, { useEffect, useLayoutEffect, useState } from "react";
import vd1 from "assets/video/video1.webm";
import vd2 from "assets/video/video2.webm";
import vd3 from "assets/video/video3.mp4";
import { championDataType } from "app/commons";

const AboutPage = () => {
  const [typeCurrent, setTypeCurrent] = useState(1);

  // Effect change image
  useEffect(() => {
    const x = setTimeout(() => {
      typeCurrent + 1 < championDataType.length
        ? setTypeCurrent(typeCurrent + 1)
        : setTypeCurrent(1);
    }, 3000);
    return () => clearTimeout(x);
  }, [typeCurrent]);

  return (
    <div>
      <div className="relative">
        <div className="hidden md:block relative w-full max-h-[500px] overflow-hidden">
          <video loop autoPlay muted src={vd1}>
            <source src={vd1} />
          </video>
          <div className="bg-[rgba(0,0,0,0.75)] absolute bottom-0 top-0 left-0 right-0 overflow-hidden"></div>
        </div>
        <div className="md:absolute md:bottom-0 md:left-[50%] md:translate-y-16 md:-translate-x-[50%] max-h-[500px] max-w-[1400px] w-full overflow-hidden ">
          <video loop autoPlay muted src={vd1}>
            <source src={vd1} />
          </video>
        </div>
      </div>

      <div className="container py-28">
        <div>
          <div className="max-w-[600px] w-full text-center m-auto mb-16">
            <h4 className="italic">CHOOSE YOUR</h4>
            <h1 className="italic">CHAMPION</h1>
            <p>
              Whether you like to dive straight into the fray, support your
              teammates, or something in between, there’s a spot for you on the
              Rift.
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
            <div>
              <div className="flex gap-4 items-end justify-evenly">
                {championDataType?.map((item, index) => {
                  if (index > 0)
                    return (
                      <div
                        onClick={() => {
                          setTypeCurrent(index);
                        }}
                        key={index}
                        className="flex flex-col gap-3 items-center cursor-pointer"
                      >
                        <span
                          className={` transition  ${
                            typeCurrent === index
                              ? "fill-black -translate-y-3 w-[20px] sm:w-[25px] md:w-[35px]"
                              : "fill-[--textSoftColor] w-[20px] md:w-[25px]"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`uppercase  font-bold text-[.5rem] sn:text-[.65rem] ${
                            typeCurrent === index
                              ? "text-black"
                              : "text-[--textSoftColor]"
                          }`}
                        >
                          {item?.title}
                        </span>
                      </div>
                    );
                })}
              </div>
              <hr className="my-8" />
              <div className="max-w-[450px] m-auto">
                <video muted autoPlay loop src={vd2}>
                  <source src={vd2} />
                </video>
              </div>
            </div>
            <div className="md:w-[40%]">
              {championDataType?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      typeCurrent === index ? "block animate-show" : "hidden"
                    }
                  >
                    <img src={item.image} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        <video loop autoPlay muted src={vd3}>
          <source src={vd3} />
        </video>
      </div>
    </div>
  );
};

export default AboutPage;
