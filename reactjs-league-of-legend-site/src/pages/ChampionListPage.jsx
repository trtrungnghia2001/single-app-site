import { getChampionList } from "app/apis";
import { championDataDifficulties, championDataType } from "app/commons";
import { useAppContext } from "app/context";
import ChampionList from "components/ChampionList";
import SearchTerm from "components/SearchTerm";
import SelectTerm from "components/SelectTerm";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ChampionListPage = () => {
  const { setIsLoading } = useAppContext();
  const [championList, setChampionList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    championName: "",
    championType: "all",
    championDifficulties: "all",
  });

  const championType = searchParams.get("championType");
  const championName = searchParams.get("championName");
  const championDifficulties = searchParams.get("championDifficulties");

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const res = await getChampionList();
        res?.data && setChampionList(Object.values(res?.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const result_filter_search = useMemo(() => {
    return championList
      ?.filter((item) => {
        if (championType?.toLowerCase() === "all".toLowerCase()) {
          return item?.name
            ?.toLowerCase()
            ?.includes(championName?.toLowerCase());
        } else {
          return (
            item?.name?.toLowerCase()?.includes(championName?.toLowerCase()) &&
            item?.tags?.some(
              (item) => item?.toLowerCase() === championType?.toLowerCase()
            )
          );
        }
      })
      ?.filter((item) => {
        if (championDifficulties?.toLowerCase() === "all".toLowerCase()) {
          return item;
        } else if (
          championDifficulties?.toLowerCase() === "easy".toLowerCase()
        ) {
          return item?.info?.difficulty > 0 && item?.info?.difficulty < 4;
        } else if (
          championDifficulties?.toLowerCase() === "moderate".toLowerCase()
        ) {
          return item?.info?.difficulty > 3 && item?.info?.difficulty < 8;
        } else {
          return item?.info?.difficulty > 7;
        }
      });
  }, [searchParams, championList]);

  return (
    <section className="container">
      <div className="max-w-[600px] w-full text-center m-auto mb-16">
        <h4 className="italic">CHOOSE YOUR</h4>
        <h1 className="italic">CHAMPION</h1>
        <p>
          With more than 140 champions, you’ll find the perfect match for your
          playstyle.
        </p>
        <p>Master one, or master them all.</p>
      </div>
      <div className="mb-8">
        {/* table & pc */}
        <div className="hidden md:flex gap-4 items-center justify-between border-[--borderLightColor] border-[1px] py-2 rounded text-[.75rem]">
          <SearchTerm
            placeholder="Search champion..."
            className="py-0 border-none border-[--borderColor] border-r-[1px] max-w-[200px]"
            value={championName}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("championName", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          />

          <ul
            className={`flex-1 text-[--textSoftColor] flex justify-center gap-4 items-center uppercase font-semibold cursor-pointer border-x-[1px] border-[--borderColor]`}
          >
            {championDataType.map((item, index) => {
              return (
                <li
                  key={index}
                  className={
                    championType?.toLowerCase() === item?.value?.toLowerCase()
                      ? "text-[--textColor]"
                      : ""
                  }
                  onClick={() =>
                    setSearchParams(
                      (prev) => {
                        prev.set("championType", item.value);
                        return prev;
                      },
                      { replace: true }
                    )
                  }
                >
                  {item.title}
                </li>
              );
            })}
          </ul>

          <SelectTerm
            className="py-0 border-none font-bold max-w-[200px]"
            value={championDifficulties}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("championDifficulties", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          >
            {championDataDifficulties?.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              );
            })}
          </SelectTerm>
        </div>
        {/* moblie */}
        <div className="md:hidden flex flex-col gap-4 items-center">
          <SearchTerm
            placeholder="Search champion..."
            value={championName}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("championName", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          />
          <SelectTerm
            className="uppercase font-semibold"
            value={championType}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("championType", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          >
            {championDataType?.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              );
            })}
          </SelectTerm>

          <SelectTerm
            className="uppercase font-semibold"
            value={championDifficulties}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("championDifficulties", e.target.value);
                  return prev;
                },
                { replace: true }
              )
            }
          >
            {championDataDifficulties?.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              );
            })}
          </SelectTerm>
        </div>
      </div>
      <ChampionList dataList={result_filter_search} />
    </section>
  );
};

export default ChampionListPage;
