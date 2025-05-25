import { getChampionID } from "app/apis";
import { championDataType } from "app/commons";
import ChampionSkinList from "components/ChampionSkinList";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ChampionIDPage = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState([]);
  const [spellCurrent, setSpellCurrent] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const res = await getChampionID(id);
        const data = res?.data && Object.values(res?.data)[0];
        setChampion(data);

        // const res1 = [
        //   {
        //     name: data?.passive?.name,
        //     image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/passive/${data?.passive?.image?.full}`,
        //     description: data?.passive?.description,
        //     video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${data?.key}/ability_0${data?.key}_P1.mp4`,
        //   },
        //   {
        //     id: data?.spells?.[0]?.id,
        //     name: data?.spells?.[0]?.name,
        //     image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${data?.spells?.[0]?.image?.full}`,
        //     description: data?.spells?.[0]?.description,
        //     video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${data?.key}/ability_0${data?.key}_Q1.mp4`,
        //   },
        //   {
        //     id: data?.spells?.[1]?.id,
        //     name: data?.spells?.[1]?.name,
        //     image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${data?.spells?.[1]?.image?.full}`,
        //     description: data?.spells?.[1]?.description,
        //     video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${data?.key}/ability_0${data?.key}_W1.mp4`,
        //   },
        //   {
        //     id: data?.spells?.[2]?.id,
        //     name: data?.spells?.[2]?.name,
        //     image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${data?.spells?.[2]?.image?.full}`,
        //     description: data?.spells?.[2]?.description,
        //     video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${data?.key}/ability_0${data?.key}_E1.mp4`,
        //   },
        //   {
        //     id: data?.spells?.[3]?.id,
        //     name: data?.spells?.[3]?.name,
        //     image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${data?.spells?.[3]?.image?.full}`,
        //     description: data?.spells?.[3]?.description,
        //     video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${data?.key}/ability_0${data?.key}_R1.mp4`,
        //   },
        // ];
        // setSpellList(res1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const spellList = useMemo(() => {
    const res = [
      {
        id: "Passives",
        name: champion?.passive?.name,
        image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/passive/${champion?.passive?.image?.full}`,
        description: champion?.passive?.description,
        video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion?.key?.padStart(
          4,
          0
        )}/ability_${champion?.key?.padStart(4, 0)}_P1`,
      },
      {
        id: champion?.spells?.[0]?.id,
        name: champion?.spells?.[0]?.name,
        image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${champion?.spells?.[0]?.image?.full}`,
        description: champion?.spells?.[0]?.description,
        video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion?.key?.padStart(
          4,
          0
        )}/ability_${champion?.key?.padStart(4, 0)}_Q1`,
      },
      {
        id: champion?.spells?.[1]?.id,
        name: champion?.spells?.[1]?.name,
        image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${champion?.spells?.[1]?.image?.full}`,
        description: champion?.spells?.[1]?.description,
        video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion?.key?.padStart(
          4,
          0
        )}/ability_${champion?.key?.padStart(4, 0)}_W1`,
      },
      {
        id: champion?.spells?.[2]?.id,
        name: champion?.spells?.[2]?.name,
        image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${champion?.spells?.[2]?.image?.full}`,
        description: champion?.spells?.[2]?.description,
        video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion?.key?.padStart(
          4,
          0
        )}/ability_${champion?.key?.padStart(4, 0)}_E1`,
      },
      {
        id: champion?.spells?.[3]?.id,
        name: champion?.spells?.[3]?.name,
        image: `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/${champion?.spells?.[3]?.image?.full}`,
        description: champion?.spells?.[3]?.description,
        video_url: `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion?.key?.padStart(
          4,
          0
        )}/ability_${champion?.key?.padStart(4, 0)}_R1`,
      },
    ];
    return res;
  }, [champion]);

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0, 9, 19, .5), rgba(0, 9, 19, 1)), url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg') no-repeat center/cover`,
        }}
      >
        <div className="max-w-[1200px] w-full m-auto ">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
            alt=""
            style={{
              background: `linear-gradient(to bottom, rgba(0, 9, 19, .5), rgba(0, 9, 19, 1)), url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg') no-repeat center/cover`,
            }}
          />
        </div>
      </div>

      <div className="bg-[--bg1] text-white py-8">
        <div className="container">
          <div className="mb-8">
            <div className="italic text-center uppercase">
              <h3>{champion?.title}</h3>
              <h1>{champion?.name}</h1>
            </div>
          </div>
          {/* info champions */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mb-16 border-[1px] border-[--borderDarkColor] p-4 md:p-16">
            <div className="flex gap-4 items-center justify-evenly">
              {championDataType
                .filter((t) => {
                  return champion?.tags?.some(
                    (item) => item?.toLowerCase() === t.value.toLowerCase()
                  );
                })
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-1 items-center uppercase font-bold text-[.65rem] "
                    >
                      <span className="fill-[--yellowColor] w-[30px] mb-4">
                        {item.icon}
                      </span>
                      <span>ROLE</span>
                      <span className="text-[--yellowColor]">{item.title}</span>
                    </div>
                  );
                })}
            </div>
            <div>
              <p>{champion?.lore}</p>
            </div>
          </div>

          {/* allytips && enemytips */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mb-16">
            {/* allytips */}
            <div>
              <h3 className="capitalize mb-6">allytips</h3>
              <ul>
                {champion?.allytips?.map((item, index) => {
                  return (
                    <li key={index}>
                      {index + 1}. {item}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* enemytips */}
            <div>
              <h3 className="capitalize mb-6">enemytips</h3>
              <ul>
                {champion?.enemytips?.map((item, index) => {
                  return (
                    <li key={index}>
                      {index + 1}. {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Abilities */}
          <div>
            <h3 className="capitalize mb-6">Abilities</h3>
            <div className="gap-8 flex flex-col-reverse md:flex-row justify-between items-center">
              {/* info skill of champion */}
              <div className="md:w-[50%]">
                <div className="flex gap-4 items-center">
                  {spellList?.map((item, index) => {
                    return (
                      <div
                        onClick={() => setSpellCurrent(index)}
                        key={index}
                        className={`max-w-[60px] cursor-pointer transition ${
                          spellCurrent === index && "-translate-y-3"
                        }`}
                      >
                        <img src={item.image} alt={item.image} />
                      </div>
                    );
                  })}
                </div>
                <hr className="my-6 h-[1px] bg-[--borderDarkColor] border-none" />
                <div>
                  <span className="text-[--textSoftColor] text-[.75rem]">
                    {spellList[spellCurrent].id}
                  </span>
                  <h4 className="my-2">{spellList[spellCurrent].name}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: spellList[spellCurrent].description,
                    }}
                  ></div>
                </div>
              </div>

              {/* video skill of champions */}
              <div className="md:w-[500px]">
                {spellList.map((item, index) => {
                  return (
                    <video
                      className={index === spellCurrent ? "block" : "hidden"}
                      key={index}
                      muted
                      autoPlay
                      loop
                      preload="auto"
                      width={"100%"}
                      height={"100%"}
                      src={item.video_url + ".webm"}
                    >
                      <source
                        src={item.video_url + ".webm"}
                        type="video/webm"
                      />
                      <source src={item.video_url + ".mp4"} type="video/mp4" />
                    </video>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container">
          <ChampionSkinList id={id} skinList={champion?.skins} />
        </div>
      </div>
    </div>
  );
};

export default ChampionIDPage;
