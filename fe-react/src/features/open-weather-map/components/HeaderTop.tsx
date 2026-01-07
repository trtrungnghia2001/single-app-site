import { memo } from "react";
import InputSearch from "./InputSearch";
import { MdAddLocationAlt, MdMyLocation } from "react-icons/md";
import { useOpenWeatherMapContext } from "../data/context";

const HeaderTop = () => {
  const { setLocation } = useOpenWeatherMapContext();

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      setLocation({
        lat: latitude,
        lon: longitude,
      });
    });
  };

  return (
    <div className="rounded bg-card p-4 shadow flex md:items-center justify-between gap-2 flex-col md:flex-row">
      <InputSearch />
      <div className="flex items-center gap-4">
        <button>
          <MdAddLocationAlt size={20} />
        </button>
        <button
          onClick={handleCurrentLocation}
          className="bg-purple-600 hover:bg-purple-500 transition-all text-white px-3 py-1.5 rounded-full text-sm"
        >
          <MdMyLocation />
          Current Location
        </button>
      </div>
    </div>
  );
};

export default memo(HeaderTop);
