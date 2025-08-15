import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AsyncThunkConfig {}

export interface Currency {
  symbol: string;
  name: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface NativeName {
  official: string;
  common: string;
}

export interface Language {
  [key: string]: string;
}

export interface Demonym {
  f: string;
  m: string;
}

export interface Demonyms {
  eng: Demonym;
  fra: Demonym;
}

export interface Translation {
  official: string;
  common: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface CapitalInfo {
  latlng: [number, number];
}

export interface PostalCode {
  format: string;
  regex: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: NativeName;
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: Currency;
  };
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Language;
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  cca3: string;
  translations: {
    [key: string]: Translation;
  };
  flag: string;
  maps: Maps;
  population: number;
  gini: {
    [key: string]: number;
  };
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}

interface AsyncThunkConfig {
  rejectValue: string;
}

export const getCountries = createAsyncThunk<Country[], any, AsyncThunkConfig>(
  "api/getCountries",
  async (searchValue, { rejectWithValue }) => {
    try {
      const fields = [
        "name",
        // "tld",
        // "cca2",
        // "ccn3",
        // "cioc",
        // "independent",
        // "status",
        // "unMember",
        // "currencies",
        // "idd",
        "capital",
        // "altSpellings",
        "region",
        "subregion",
        "languages",
        // "latlng",
        // "landlocked",
        // "borders",
        // "area",
        // "demonyms",
        // "cca3",
        // "translations",
        // "flag",
        // "maps",
        // "population",
        // "gini",
        // "fifa",
        // "car",
        // "timezones",
        // "continents",
        "flags",
        "coatOfArms",
        // "startOfWeek",
        // "capitalInfo",
        // "postalCode",
      ];

      // const { data } = await axios.get<Country[] | Country>(
      //   obj.searchValue && !obj.filterValue
      //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
      //         import.meta.env.VITE_API_COUNTRIES_BY_NAME
      //       }/${obj.searchValue}`
      //     : obj.filterValue && !obj.searchValue
      //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
      //         import.meta.env.VITE_API_COUNTRIES_BY_REGION
      //       }/${obj.filterValue}`
      //     : !obj.filterValue && !obj.searchValue
      //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
      //         import.meta.env.VITE_API_ALL_COUNTRIES
      //       }?fields=${fields.join(",")}`
      //     : ``
      // );

      const { data } = await axios.get<Country[]>(
        searchValue
          ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
              import.meta.env.VITE_API_COUNTRIES_BY_NAME
            }/${searchValue}`
          : `${import.meta.env.VITE_API_REST_COUNTRIES}/${
              import.meta.env.VITE_API_ALL_COUNTRIES
            }?fields=${fields.join(",")}`
      );
      // Ensure we always return an array
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        "An unknown error occurred while fetching countries"
      );
    }
  }
);

export const getSearchedCountries = createAsyncThunk<
  Country[],
  any,
  AsyncThunkConfig
>("api/getSearchedCountries", async (searchValue, { rejectWithValue }) => {
  // Now accepts string | undefined
  try {
    const fields = [
      "name",
      // "tld",
      // "cca2",
      // "ccn3",
      // "cioc",
      // "independent",
      // "status",
      // "unMember",
      // "currencies",
      // "idd",
      "capital",
      // "altSpellings",
      "region",
      "subregion",
      "languages",
      // "latlng",
      // "landlocked",
      // "borders",
      // "area",
      // "demonyms",
      // "cca3",
      // "translations",
      // "flag",
      // "maps",
      // "population",
      // "gini",
      // "fifa",
      // "car",
      // "timezones",
      // "continents",
      "flags",
      "coatOfArms",
      // "startOfWeek",
      // "capitalInfo",
      // "postalCode",
    ];

    // const { data } = await axios.get<Country[] | Country>(
    //   obj.searchValue && !obj.filterValue
    //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
    //         import.meta.env.VITE_API_COUNTRIES_BY_NAME
    //       }/${obj.searchValue}`
    //     : obj.filterValue && !obj.searchValue
    //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
    //         import.meta.env.VITE_API_COUNTRIES_BY_REGION
    //       }/${obj.filterValue}`
    //     : !obj.filterValue && !obj.searchValue
    //     ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
    //         import.meta.env.VITE_API_ALL_COUNTRIES
    //       }?fields=${fields.join(",")}`
    //     : ``
    // );

    const { data } = await axios.get<Country[]>(
      searchValue
        ? `${import.meta.env.VITE_API_REST_COUNTRIES}/${
            import.meta.env.VITE_API_COUNTRIES_BY_NAME
          }/${searchValue}`
        : `${import.meta.env.VITE_API_REST_COUNTRIES}/${
            import.meta.env.VITE_API_ALL_COUNTRIES
          }?fields=${fields.join(",")}`
    );
    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue(
      "An unknown error occurred while fetching countries"
    );
  }
});

export const getCountriesHomePage = createAsyncThunk<
  Country[],
  void,
  AsyncThunkConfig
>("api/getCountriesHomePage", async (_, { rejectWithValue }) => {
  try {
    const fields = [
      "name",
      // "tld",
      // "cca2",
      // "ccn3",
      // "cioc",
      // "independent",
      // "status",
      // "unMember",
      // "currencies",
      // "idd",
      "capital",
      // "altSpellings",
      "region",
      "subregion",
      "languages",
      // "latlng",
      // "landlocked",
      // "borders",
      // "area",
      // "demonyms",
      // "cca3",
      // "translations",
      // "flag",
      // "maps",
      "population",
      // "gini",
      // "fifa",
      // "car",
      // "timezones",
      // "continents",
      "flags",
      "coatOfArms",
      // "startOfWeek",
      // "capitalInfo",
      // "postalCode",
    ];

    const { data } = await axios.get<Country[]>(
      `${import.meta.env.VITE_API_REST_COUNTRIES}/${
        import.meta.env.VITE_API_ALL_COUNTRIES
      }?fields=${fields.join(",")}`
    );
    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue(
      "An unknown error occurred while fetching countries for the home page"
    );
  }
});
