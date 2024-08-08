import React, { useEffect } from "react";
import "./style.css"

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCountries } from "../../api/api";
import EachCountry from "../../components/eachCountry/EachCountry";

const Countries = () => {
  // States from redux toolkit
  const countries = useAppSelector(
    (state) => state.restCountriesSlice.countries
  );
  const loadingCountries = useAppSelector(
    (state) => state.restCountriesSlice.loadingCountries
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      <div className="countries_page">
        {loadingCountries ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="founded_countries_block">
            <h1 className="text-center text-[25px] font-bold">
              Founded {countries?.length} countries
            </h1>
              <div className="each_countries_block px-5 mt-4">
                
              {countries.map((item) => {
                return (
                  <>
                    <EachCountry country={item} />
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Countries;
