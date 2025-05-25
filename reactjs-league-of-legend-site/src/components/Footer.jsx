import React from "react";

import { Link } from "react-router-dom";
import { LogoIcon, contactLinkList } from "app/commons";

const Footer = () => {
  return (
    <div className="bg-[--bg1] text-white">
      <div className="max-w-[600px] m-auto py-6">
        <div className="flex justify-center items-center gap-4">
          {contactLinkList?.map((item, index) => {
            return (
              <a
              key={index}
                href={"/"}
                className="rounded-full p-2 inline-block bg-[--darkLightColor]"
              >
                {item?.icon}
              </a>
            );
          })}
        </div>
        <div className="m-auto my-8 max-w-max">
          <Link>
            <LogoIcon className="fill-white" />
          </Link>
        </div>
        <p className="text-center text-[0.75rem] text-[--textSoftColor]">
          ™ & © {new Date().getFullYear()} Riot Games, Inc. League of Legends
          and all related logos, characters, names and distinctive likenesses
          thereof are exclusive property of Riot Games, Inc. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
