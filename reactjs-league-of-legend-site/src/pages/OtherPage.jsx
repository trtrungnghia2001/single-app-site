import { getProfileIcons, getSummonerSpells } from "app/apis";
import { useAppContext } from "app/context";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const OtherPage = () => {
  const { setIsLoading } = useAppContext();
  const [summonerSpells, setSummonerSpells] = useState([]);
  const [profileIcons, setProfileIcons] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await getSummonerSpells();
        res?.data && setSummonerSpells(Object.values(res?.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await getProfileIcons();
        res?.data && setProfileIcons(Object.values(res?.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  return (
    <section className="container">
      <div className="max-w-[600px] w-full text-center m-auto mb-16">
        <h4 className="italic">CHOOSE YOUR</h4>
        <h1 className="italic">Other</h1>
        <p>Some other information about the game.</p>
        <p>Hope this information will help you.</p>
      </div>
      <div>
        <h4 className="mb-6">Summoner Spells</h4>
        <ul className="flex flex-wrap gap-x-2 gap-y-1 ">
          {summonerSpells?.map((item) => {
            return (
              <li key={item?.key}>
                <div
                  data-tooltip-id={item?.key}
                  className="w-[40px] h-[40px] cursor-pointer"
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${item?.image?.full}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <Tooltip id={item?.key}>
                  <div className="max-w-[400px]">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-[40px] h-[40px] cursor-pointer">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${item?.image?.full}`}
                            alt=""
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-[--purpleColor]">{item?.name}</h4>
                      </div>
                      <div>
                        <span>cooldownBurn: {item?.cooldownBurn}s</span>
                      </div>
                    </div>
                    {item?.description && (
                      <>
                        <hr className="h-[1px] w-full bg-[--greenColor] border-none my-2" />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></div>
                      </>
                    )}
                    {item?.modes && (
                      <>
                        <hr className="h-[1px] w-full bg-[--greenColor] border-none my-2" />
                        <div>
                          <p className="truncate">
                            <span>Modes: </span>
                            {item?.modes?.join(", ")}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-8">
        <h4 className="mb-6">Profile Icons</h4>
        <ul className="flex flex-wrap gap-x-2 gap-y-1 ">
          {profileIcons?.map((item, index) => {
            return (
              <li key={index}>
                <div className="w-[40px] h-[40px] cursor-pointer">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${item?.image?.full}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OtherPage;
