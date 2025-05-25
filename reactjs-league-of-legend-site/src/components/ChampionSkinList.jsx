import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ChampionSkinList = ({ id, skinList = [] }) => {
  const [indexCurrentSkin, setIndexCurrentSkin] = useState(0);
  var setting = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    focusOnSelect: true,
    // beforeChange: function (currentSlide, nextSlide) {
    //   setIndexCurrentSkin(skinList[currentSlide]?.num);
    // },
    afterChange: function (currentSlide) {
      setIndexCurrentSkin(skinList[currentSlide]?.num);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          vertical: true,
          verticalSwiping: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };
  return (
    <div>
      <div className="relative max-h-[920px] h-full overflow-hidden">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${indexCurrentSkin}.jpg`}
          alt=""
          loading="lazy"
        />

        <div className="md:absolute top-0 left-0 h-full md:w-[30%] md:bg-[rgba(0,0,0,.75)]">
          <Slider {...setting}>
            {skinList?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className={`md:p-4 p-2 transition ${
                    item?.num === indexCurrentSkin
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:gap-4 gap-2 items-center cursor-pointer">
                    <div className="md:max-w-[80px] md:h-[80px]">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${item?.num}.jpg`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <span className="md:text-white md:text-[.75rem] text-[.5rem] text-center uppercase font-bold">
                      {item?.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ChampionSkinList;
