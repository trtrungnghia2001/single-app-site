import { contactLinkList } from "app/commons";
import SearchTerm from "components/SearchTerm";
import React from "react";

const HomePage = () => {
  return (
    <section className="bg-home flex items-center justify-center px-4">
      <div className="max-w-[500px] w-full">
        <SearchTerm placeholder="Search..." className="bg-white rounded-2xl" />
        <div className="mt-8 grid gap-4 grid-cols-4">
          {contactLinkList?.map((item, index) => {
            return (
              <a
                key={index}
                href="/"
                className="text-white flex flex-col gap-2 items-center"
              >
                <span className="text-2xl">{item?.icon}</span>
                {item?.title}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
