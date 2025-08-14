// import React from 'react'
import "./style.css";

import { TextField } from "@mui/material";
import EachCountry from "../../components/eachCountry/EachCountry";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountriesByRegion = () => {
  const { id } = useParams();

  // States
  const [countriesInSelectedRegion, setCountriesInSelectedRegion] = useState<
    any[]
  >([]);
  const [
    loadingCountriesInSelectedRegion,
    setLoadingCountriesInSelectedRegion,
  ] = useState<boolean>(false);
  const [inpSearchCountriesInThisRegion, setInpSearchCountriesInThisRegion] =
    useState<string>("");
  const [searchedCountriesInThisRegion, setSearchedCountriesInThisRegion] =
    useState<any>([]);

  function handleChangeInpSearchCountriesInThisRegion(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInpSearchCountriesInThisRegion(event.target.value);
  }

  async function getCountriesByRegion() {
    setLoadingCountriesInSelectedRegion(true);
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/region/${id}`
      );
      setCountriesInSelectedRegion(data);
    } catch (error) {
      console.error("Error fetching countries by region:", error);
    } finally {
      setLoadingCountriesInSelectedRegion(false);
    }
  }

  // Filter countries by search input
  useEffect(() => {
    if (inpSearchCountriesInThisRegion) {
      const filtered = countriesInSelectedRegion.filter((country: any) =>
        country.name.common
          .toLowerCase()
          .includes(inpSearchCountriesInThisRegion.toLowerCase())
      );
      setSearchedCountriesInThisRegion(filtered);
    } else {
      setSearchedCountriesInThisRegion(countriesInSelectedRegion);
    }
  }, [inpSearchCountriesInThisRegion, countriesInSelectedRegion]);

  // Fetch countries when component mounts or id changes
  useEffect(() => {
    if (id) {
      getCountriesByRegion();
    }
  }, [id, inpSearchCountriesInThisRegion]);

  return (
    <>
      <div className="countries_by_region_page max-w-[1440px] mx-auto">
        <div className="block_search_and_text">
          <h1 className="text-center text-[25px] font-bold">
            Founded {searchedCountriesInThisRegion?.length || 0} countries in
            the region of{" "}
            {id
              ? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
              : "Unknown"}
          </h1>
          <div className="input_block flex justify-center flex-wrap mt-4 gap-6">
            <TextField
              type="search"
              variant="outlined"
              label="Search the countries"
              sx={{
                width: `320px`,
              }}
              value={inpSearchCountriesInThisRegion}
              onChange={handleChangeInpSearchCountriesInThisRegion}
            />
          </div>
        </div>
        <div className="block_countries_in_this_region">
          {loadingCountriesInSelectedRegion ? (
            <div className="flex justify-center mt-3">
              <div className="loader"></div>
            </div>
          ) : !loadingCountriesInSelectedRegion &&
            countriesInSelectedRegion?.length === 0 ? (
            <div>
              <h1 className="text-center text-[15px] font-bold mt-3">
                Countries not found in the region of{" "}
                {id
                  ? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
                  : "Unknown"}
              </h1>
            </div>
          ) : (
            <div className="founded_countries_block_in_this_region mt-7">
              <div className="each_countries_block_in_this_region px-5">
                {searchedCountriesInThisRegion.map(
                  (item: any, index: number) => {
                    return (
                      <>
                        <EachCountry key={index} country={item} />
                      </>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CountriesByRegion;
