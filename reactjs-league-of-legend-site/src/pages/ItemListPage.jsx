import { getItemList } from "app/apis";
import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GrMoney } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import SearchTerm from "components/SearchTerm";
import SelectTerm from "components/SelectTerm";
import { useAppContext } from "app/context";

const ItemListPage = () => {
  const {setIsLoading}=useAppContext()
  const [itemList, setItemList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    itemName: "",
    itemType: "all",
  });
  const itemName = searchParams.get("itemName");
  const itemType = searchParams.get("itemType");
  useEffect(() => {
    (async function () {
      setIsLoading(true)
      const res = await getItemList();
      res?.data && setItemList(Object.values(res?.data));
      setIsLoading(false)
    })();
  }, []);

  const results_search_filter = useMemo(() => {
    return itemList?.filter((item) => {
      if (itemType?.toLowerCase() === "all"?.toLowerCase()) {
        return item?.name?.toLowerCase()?.includes(itemName?.toLowerCase());
      } else {
        return (
          item?.tags?.some(
            (item) => item?.toLowerCase() === itemType?.toLowerCase()
          ) && item?.name?.toLowerCase()?.includes(itemName?.toLowerCase())
        );
      }
    });
  }, [searchParams, itemList]);

  const itemDataType = useMemo(() => {
    const arr = itemList.map((item) => item?.tags).flat();
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }, [itemList]);
  
  return (
    <section className="container">
      <div className="max-w-[600px] w-full text-center m-auto mb-16">
        <h4 className="italic">CHOOSE YOUR</h4>
        <h1 className="italic">ITEMS</h1>
        <p>
          With more than 140 items, you’ll find the perfect match for your
          playstyle.
        </p>
        <p>Master one, or master them all.</p>
      </div>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <SearchTerm
          className="md:flex-1"
          value={itemName}
          placeholder="Search item..."
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("itemName", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
        <SelectTerm
        className="md:max-w-[200px]"
          value={itemType}
          onChange={(e) =>
            setSearchParams(
              (prev) => {
                prev.set("itemType", e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        >
          <option value="all">All item</option>
          {itemDataType?.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </SelectTerm>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center justify-center">
        {results_search_filter?.map((item, index) => {
          return (
            <div key={index}>
              <div
                data-tooltip-id={index + 1}
                className="w-[40px] h-[40px] cursor-pointer border-[--greenColor] border-[2px] rounded  overflow-hidden"
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${item?.image?.full}`}
                  alt=""
                  loading="lazy"
                />
              </div>
              <Tooltip id={index + 1}>
                <div className="max-w-[350px] w-full">
                  <div className="w-full flex gap-12 items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <div className="w-[40px] h-[40px]">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${item?.image?.full}`}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-[--purpleColor]">{item?.name}</h4>
                    </div>
                    <div className="flex gap-2 items-center text-[--yellowColor] font-bold">
                      <GrMoney />
                      {item?.gold?.total}
                    </div>
                  </div>
                  {item?.plaintext && (
                    <>
                      <hr className="h-[1px] w-full bg-[--greenColor] border-none my-2" />
                      <p>{item?.plaintext}</p>
                    </>
                  )}
                  {item?.description && (
                    <>
                      <hr className="h-[1px] w-full bg-[--greenColor] border-none my-2" />
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                    </>
                  )}
                  {item?.tags && (
                    <>
                      <hr className="h-[1px] w-full bg-[--greenColor] border-none my-2" />
                      <p>Tags: {item?.tags?.join(", ")}</p>
                    </>
                  )}
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ItemListPage;
