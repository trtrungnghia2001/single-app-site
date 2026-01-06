import ButtonBack from "@/components/custom/ButtonBack";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCountryByCodeApi } from "../data/api";
import { Link } from "react-router-dom";
import Loader from "../../../components/custom/Loader";
import Notfound from "@/pages/Notfound";

const CountryDetailPage = () => {
  const { code } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries", code],
    queryFn: async () => await getCountryByCodeApi(code as string),
    enabled: !!code,
  });

  if (isLoading) return <Loader />;

  if (error) return error?.message;

  if (!data) return <Notfound />;

  return (
    <div className="space-y-6 p-4">
      <div>
        <ButtonBack />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2/5">
          <div className="aspect-video">
            <img
              src={data?.flags?.png}
              alt="flag"
              loading="lazy"
              className="img"
            />
          </div>
        </div>
        <div className="flex-3/5 space-y-10">
          <h2>{data?.name?.common}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p>
              <span className="font-semibold">Native Name:</span>{" "}
              {data?.name?.nativeName &&
                Object.values(data?.name?.nativeName)
                  ?.map((item) => item.common)
                  ?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              {data?.tld?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {Intl.NumberFormat("vi-VN").format(data?.population)}
            </p>
            <p>
              <span className="font-semibold">Currencies:</span>{" "}
              {data?.currencies &&
                Object.values(data?.currencies)
                  ?.map((item) => item.name)
                  ?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {data?.region}
            </p>
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {data?.languages && Object.values(data?.languages)?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Sub Region:</span>{" "}
              {data?.subregion}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {data?.capital?.join(", ")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-3">
            <span className="font-semibold">Border Countries:</span>{" "}
            {data?.borders?.map((item) => (
              <Link
                key={item}
                to={`/rest-countries/${item}`}
                className="bg-card px-5 py-1 rounded shadow hover:shadow-md text-sm inline-block"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;
