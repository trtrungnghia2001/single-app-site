import axios from "axios";
import type { CountryDetailType, CountryType } from "./type";

const BASE_URL = `https://restcountries.com/v3.1`;

export async function getCountriesApi() {
  return (
    await axios.get<CountryType[]>(
      BASE_URL + `/all?fields=cca2,flags,name,population,region,capital`
    )
  ).data;
}
export async function getCountryByCodeApi(code: string) {
  return (await axios.get<CountryDetailType[]>(BASE_URL + `/alpha/` + code))
    .data?.[0];
}
