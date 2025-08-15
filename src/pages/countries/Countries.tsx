import { useEffect, useState } from "react";
import "./style.css";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCountries } from "../../api/api";
import EachCountry from "../../components/eachCountry/EachCountry";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";

const Countries = () => {
  const dispatch = useAppDispatch();

  const [inpSearchCountries, setInpSearchCountries] = useState<string>("");
  const [inpFilterCountriesByRegion, setInpFilterCountriesByRegion] =
    useState<string>("");
  const [filteredCountriesByRegion, setFilteredCountriesByRegion] = useState<any[]>([]);

  
  // States from redux toolkit
  const countries = useAppSelector(
    (state) => state.restCountriesSlice.countries
  );
  const loadingCountries = useAppSelector(
    (state) => state.restCountriesSlice.loadingCountries
  );

  // Add debounce with 500ms delay
  const debouncedSearchTerm = useDebounce(inpSearchCountries, 500);

  function handleChangeInpSearchCountries(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInpSearchCountries(event.target.value);
  }

  function handleChangeInpFilterCountries(event: SelectChangeEvent<string>) {
    setInpFilterCountriesByRegion(event.target.value);
  }

  // Filter countries by region
  useEffect(() => {
    if (inpFilterCountriesByRegion) {
      const filtered = countries.filter(
        (country: any) =>
          country.region.toLowerCase() ===
          inpFilterCountriesByRegion.toLowerCase()
      );
      setFilteredCountriesByRegion(filtered);
    } else {
      setFilteredCountriesByRegion(countries);
    }
  }, [inpFilterCountriesByRegion, countries]);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      dispatch(getCountries(debouncedSearchTerm));
    }
  }, [dispatch, debouncedSearchTerm, inpFilterCountriesByRegion]);

  return (
    <>
      <div className="countries_page max-w-[1440px] mx-auto">
        <section className="block_search_and_text">
          <h1 className="text-center text-[25px] font-bold">
            Founded {filteredCountriesByRegion?.length} countries
          </h1>
          <div className="input_block flex justify-center flex-wrap mt-4 gap-6">
            <TextField
              type="search"
              variant="outlined"
              label="Search the countries"
              sx={{
                width: `320px`,
              }}
              value={inpSearchCountries}
              onChange={handleChangeInpSearchCountries}
            />
            <FormControl
              sx={{
                width: `320px`,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Filter countries by region
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inpFilterCountriesByRegion}
                onChange={handleChangeInpFilterCountries}
                label="filter-countries-by-region"
              >
                <MenuItem value={``}>None</MenuItem>
                <MenuItem value={`asia`}>Asia</MenuItem>
                <MenuItem value={`europe`}>Europe</MenuItem>
                <MenuItem value={`americas`}>America</MenuItem>
                <MenuItem value={`antarctic`}>Antarctic</MenuItem>
                <MenuItem value={`africa`}>Africa</MenuItem>
                <MenuItem value={`oceania`}>Oceania</MenuItem>
              </Select>
            </FormControl>
          </div>
        </section>
        <section className="block_countries">
          {loadingCountries ? (
            <div className="flex justify-center mt-3">
              <div className="loader"></div>
            </div>
          ) : !loadingCountries && countries?.length === 0 ? (
            <div>
              <h1 className="text-center text-[15px] font-bold mt-3">
                Countries not found
              </h1>
            </div>
          ) : (
            <div className="founded_countries_block mt-7">
              <div className="each_countries_block px-5">
                {filteredCountriesByRegion.map((item: any, index: number) => {
                  return (
                    <>
                      <EachCountry key={index} country={item} />
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Countries;
