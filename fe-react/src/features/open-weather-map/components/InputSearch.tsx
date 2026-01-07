import { useQuery } from "@tanstack/react-query";
import { memo, useRef, useState } from "react";
import { MdLocationOn, MdSearch } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { searchDirectApi } from "../data/api";
import { useOpenWeatherMapContext } from "../data/context";

const InputSearch = () => {
  const { setLocation } = useOpenWeatherMapContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);
  const [show, setShow] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["open-weather-map", "search", value],
    queryFn: async () => await searchDirectApi(value),
    enabled: !!value,
  });
  console.log(data);

  return (
    <div className="relative">
      <div className="bg-input flex items-center gap-2 px-3 rounded-full">
        <MdSearch />
        <input
          type="text"
          className="bg-transparent border-none outline-none py-2 flex-1"
          placeholder="Search for places"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          ref={inputRef}
        />
      </div>
      {show && (
        <ul className="absolute z-10 top-full left-0 right-0 bg-card shadow rounded overflow-hidden">
          {isLoading && <li>Loading...</li>}
          {!isLoading &&
            data?.map((item, idx) => (
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                  setLocation({ lat: item.lat, lon: item.lon });
                  inputRef.current?.blur();
                }}
                key={idx}
                className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:bg-input"
              >
                <MdLocationOn size={18} />
                <div className="flex-1 leading-none">
                  <p>
                    {item.name}{" "}
                    {item.state && (
                      <span className="text-xs text-muted-foreground">
                        ({item.state})
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.country}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default memo(InputSearch);
