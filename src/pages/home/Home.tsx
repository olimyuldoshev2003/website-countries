import { useEffect } from "react";
import "./style.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getCountriesHomePage } from "../../api/api";
import EachCountry from "../../components/eachCountry/EachCountry";

const Home = () => {
  const dispatch = useAppDispatch();

  const countriesHomePage = useAppSelector(
    (state) => state.restCountriesSlice.countriesHomePage
  );
  const loadingCountriesHomePage = useAppSelector(
    (state) => state.restCountriesSlice.loadingCountriesHomePage
  );

  useEffect(() => {
    dispatch(getCountriesHomePage());
  }, [dispatch]);

  return (
    <div className="home_component max-w-[1440px] mx-auto">
      <section className="section_1_countries_by_population mt-4">
        <div className="block_title">
          <h1 className="text-[20px] font-bold text-center">
            Countries by Population
          </h1>
        </div>
        {loadingCountriesHomePage ? (
          <div className="loader_block flex justify-center mt-3">
            <div className="loader"></div>
          </div>
        ) : !loadingCountriesHomePage && countriesHomePage?.length === 0 ? (
          <div>
            <h1 className="text-center text-[15px] font-bold mt-3">
              Countries by population not found
            </h1>
          </div>
        ) : (
          <div className="founded_countries_block_home_page mt-7">
            <div className="each_countries_block px-5">
              {[...countriesHomePage]
                .sort((a, b) => b.population - a.population) // Sort by population (descending)
                .slice(0, 8)
                .map((item, index) => (
                  <EachCountry key={index} country={item} />
                ))}
            </div>
          </div>
        )}
      </section>
      <section className="section_2_countries_by_language">
        <div className="block_title">
          <h1 className="text-[20px] font-bold text-center">
            Countries by language
          </h1>
        </div>
        {loadingCountriesHomePage ? (
          <div className="loader_block flex justify-center mt-3">
            <div className="loader"></div>
          </div>
        ) : !loadingCountriesHomePage && countriesHomePage?.length === 0 ? (
          <div>
            <h1 className="text-center text-[15px] font-bold mt-3">
              Countries by language not found
            </h1>
          </div>
        ) : (
          <div className="founded_countries_block_home_page mt-7">
            <div className="each_countries_block px-5">
              {[...countriesHomePage] // Create a copy of the array
                .sort((a: any, b: any) => {
                  // Compare country names alphabetically (case-insensitive)
                  return (
                    Object.values(b.languages).length -
                    Object.values(a.languages).length
                  );
                })
                .slice(0, 8)
                .map((item: any, index: number) => (
                  <EachCountry key={index} country={item} />
                ))}
            </div>
          </div>
        )}
      </section>
      <section className="section_3_countries_by_name">
        <div className="block_title">
          <h1 className="text-[20px] font-bold text-center">
            Countries by name
          </h1>
        </div>
        {loadingCountriesHomePage ? (
          <div className="loader_block flex justify-center mt-3">
            <div className="loader"></div>
          </div>
        ) : !loadingCountriesHomePage && countriesHomePage?.length === 0 ? (
          <div>
            <h1 className="text-center text-[15px] font-bold mt-3">
              Countries by name not found
            </h1>
          </div>
        ) : (
          <div className="founded_countries_block_home_page mt-7">
            <div className="each_countries_block px-5">
              {[...countriesHomePage] // Create a copy of the array
                .sort((a: any, b: any) => {
                  // Compare country names alphabetically (case-insensitive)
                  return a.name.common.localeCompare(b.name.common);
                })
                .slice(0, 8)
                .map((item: any, index: number) => (
                  <EachCountry key={index} country={item} />
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
