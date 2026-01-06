import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCountriesApi } from "../data/api";
import type { CountryType } from "../data/type";
import Loader from "@/components/custom/Loader";
import CountryCard from "../components/CountryCard";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await getCountriesApi(),
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("");

  const dataFilter = useMemo(() => {
    if (!data) return [];

    return data
      .filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase())
      )
      .filter((country) => country.region.includes(filter));
  }, [data, text, filter]);

  const getRegionData = useMemo(() => {
    const regionData = new Map([["Filter by region", ""]]);

    if (!data) return Array.from(regionData);

    data.forEach((country: CountryType) => {
      if (!regionData.has(country.region)) {
        regionData.set(country.region, country.region);
      }
    });

    return Array.from(regionData);
  }, [data]);

  if (error) return error.message;

  return (
    <div className="space-y-6 p-4">
      {/* filters */}
      <div className="flex flex-wrap gap-4 md:items-center justify-between flex-col md:flex-row">
        <div className="flex-1 md:max-w-max flex items-center gap-2 rounded px-4 py-2 shadow bg-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search for a country..."
            className="outline-none border-none flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <select
          name="region"
          id="region"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 md:max-w-max outline-none border-none rounded px-4 py-2 shadow bg-input"
        >
          {getRegionData.map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      {/* results */}
      <div>
        {isLoading && <Loader />}
        {!isLoading && dataFilter.length === 0 && <div>No results</div>}
        {!isLoading && dataFilter.length > 0 && (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {dataFilter.map((country) => (
              <li key={country.cca2}>
                <CountryCard country={country} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
