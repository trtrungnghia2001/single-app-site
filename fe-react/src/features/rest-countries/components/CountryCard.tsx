import { Link } from "react-router-dom";
import type { CountryType } from "../data/type";
import { memo } from "react";

const CountryCard = ({ country }: { country: CountryType }) => {
  return (
    <Link
      to={`/rest-countries/${country.cca2}`}
      className="block h-full shadow hover:shadow-md rounded overflow-hidden group bg-card"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          loading="lazy"
          className="img group-hover:scale-110 transition-all"
        />
      </div>
      <div className="p-4 text-sm">
        <h3 className="mb-3">{country.name.common}</h3>
        <p>
          <span className="font-semibold">Population:</span>{" "}
          {Intl.NumberFormat("vi-VN").format(country.population)}
        </p>
        <p>
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p>
          <span className="font-semibold">Capital:</span>{" "}
          {country.capital?.join(", ")}
        </p>
      </div>
    </Link>
  );
};

export default memo(CountryCard);
