import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Images
import googleMapsLogo from "../../assets/google_maps_logo.png";
import openStreetMapLogo from "../../assets/open_street_map_logo.svg";

const Country = () => {
  const { id } = useParams();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  async function getCountryByName() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_REST_COUNTRIES}/${
          import.meta.env.VITE_API_COUNTRIES_BY_NAME
        }/${id}`
      );
      setCountry(data?.at(0));
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCountryByName();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-[red] text-center">Error loading country data</div>
    );
  if (!country)
    return <div className="text-[red] text-center">Country not found</div>;

  return (
    <div className="country_page bg-[#035f53]">
      <div className="container_country_page max-w-[1440px] mx-auto">
        <div className="block_country_name">
          <h1 className="text-white text-center text-[24px] font-bold">
            {country?.name?.common}
          </h1>
          <h1 className="text-white text-center text-[24px]">
            Official:{" "}
            <span className="font-bold">{country?.name?.official}</span>
          </h1>
        </div>
        <div className="block_images_flags_and_alt_of_flag">
          <div className="block_images mt-[20px] flex justify-center gap-[36px] flex-wrap">
            {country?.flags?.svg && (
              <div className="block_img_flag">
                <img
                  src={country.flags.svg}
                  alt={country.name?.common}
                  className="h-[200px] object-contain"
                />
              </div>
            )}
            {country?.coatOfArms?.svg && (
              <div className="block_img_coat_of_arms">
                <img
                  src={country.coatOfArms.svg}
                  alt={country.name?.common}
                  className="h-[200px] object-contain"
                />
              </div>
            )}
          </div>

          {country?.flags?.alt && (
            <div className="block_alt_of_flag mt-[20px]">
              <h2 className="text-white text-center text-[20px] font-bold max-w-[800px] mx-auto">
                Alternative of flag:{" "}
                <span className="font-normal">{country?.flags?.alt}</span>
              </h2>
            </div>
          )}
        </div>

        <div className="block_info mt-[70px] flex flex-col gap-[14px]">
          {country?.capital && (
            <h1 className="text-white text-center text-[24px]">
              Capital{country.capital.length > 1 ? "s" : ""}:{" "}
              <span className="font-bold">
                {country.capital.map((cap: string, index: number) => (
                  <span key={index}>
                    {cap}
                    {index < country.capital.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </h1>
          )}

          {country?.name?.nativeName && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Native name (Official): </span>
              {Object.values(country?.name?.nativeName).map(
                (item: any, index, array) => (
                  <span key={index} className="text-[16px] font-bold">
                    {item?.official}
                    {index < array.length - 1 && ", "}
                  </span>
                )
              )}
            </h2>
          )}

          {country?.name?.nativeName && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Native name (Common): </span>
              {Object.values(country?.name?.nativeName).map(
                (item: any, index, array) => (
                  <span key={index} className="text-[16px] font-bold">
                    {item?.common}
                    {index < array.length - 1 && ", "}
                  </span>
                )
              )}
            </h2>
          )}

          {country?.translations && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Translation (Official): </span>
              {Object.values(country?.translations).map(
                (item: any, index, array) => (
                  <span key={index} className="text-[16px] font-bold">
                    {item?.official}
                    {index < array.length - 1 && ", "}
                  </span>
                )
              )}
            </h2>
          )}

          {country?.translations && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Native name (Common): </span>
              {Object.values(country?.translations).map(
                (item: any, index, array) => (
                  <span key={index} className="text-[16px] font-bold">
                    {item?.common}
                    {index < array.length - 1 && ", "}
                  </span>
                )
              )}
            </h2>
          )}

          {country?.altSpellings && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">
                Alternative spelling{country.altSpellings.length > 1 ? "s" : ""}
                :{" "}
              </span>
              {country.altSpellings.join(", ")}
            </h2>
          )}

          {country?.startOfWeek && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Start of week: </span>
              {country.startOfWeek}
            </h2>
          )}

          {country?.borders && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">
                Border{country.borders.length > 1 ? "s" : ""}:{" "}
              </span>
              {country.borders.join(", ")}
            </h2>
          )}

          {country?.continents && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">
                Continent{country.continents.length > 1 ? "s" : ""}:{" "}
              </span>
              {country.continents.join(", ")}
            </h2>
          )}

          {country?.demonyms && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Demonym: </span>
              {Object.values(country.demonyms).map(
                (item: any, index, array) => (
                  <span key={index} className="text-[16px] font-bold">
                    {`Feminine: ${item?.f} Mascunine: ${item?.m}`}
                    {index < array.length - 1 && ", "}
                  </span>
                )
              )}
            </h2>
          )}

          {country?.tld && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">
                Top Level Domain{country.tld.length > 1 ? "s" : ""}:{" "}
              </span>
              {country.tld.join(", ")}
            </h2>
          )}

          {country?.languages && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Language: </span>
              {Object.values(country.languages).join(", ")}
            </h2>
          )}

          {country?.region && (
            <h4 className="text-[18px] text-center font-bold text-white">
              <span className="font-normal">Region: </span>
              {country.region}
            </h4>
          )}

          {country?.subregion && (
            <h5 className="text-[16px] text-center font-bold text-white">
              <span className="font-normal">Subregion: </span>
              {country.subregion}
            </h5>
          )}

          {country?.population && (
            <h5 className="text-[16px] text-center font-bold text-white">
              <span className="font-normal">Population: </span>
              {country.population.toLocaleString()} people
            </h5>
          )}

          {country?.area && (
            <h5 className="text-[16px] text-center font-bold text-white">
              <span className="font-normal">Area: </span>
              {country.area.toLocaleString()} km²
            </h5>
          )}

          {country?.timezones && (
            <h2 className="text-[16px] text-center font-bold text-white">
              <span className="font-normal">
                Timezone{country.timezones.length > 1 ? "s" : ""}:{" "}
              </span>
              {country.timezones.join(", ")}
            </h2>
          )}

          {country?.currencies && (
            <h2 className="text-[16px] text-center font-bold text-white">
              <span className="font-normal">Currency: </span>
              {Object.values(country.currencies)
                .map(
                  (item: any) => `${item.name} (${item.symbol || "no symbol"})`
                )
                .join(", ")}
            </h2>
          )}
          <h2 className="text-[16px] text-center font-bold text-white">
            <span className="font-normal">This country </span>
            {country.independent ? "has" : "doesn't have"}{" "}
            <span className="font-normal">the independence.</span>
          </h2>

          <h2 className="text-[16px] text-center font-bold text-white">
            <span className="font-normal">This country </span>
            {country.unMember ? "is" : "isn't"}{" "}
            <span className="font-normal">the United Nations member.</span>
          </h2>

          {country?.status && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Status of this county: </span>
              {country.status}
            </h2>
          )}

          {country?.flag && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Flag: </span>
              {country.flag}
            </h2>
          )}

          {country?.fifa && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">Fifa: </span>
              {country.fifa}
            </h2>
          )}

          {country?.cca2 && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">CCA2: </span>
              {country.cca2}
            </h2>
          )}

          {country?.cca3 && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">CCA3: </span>
              {country.cca3}
            </h2>
          )}

          {country?.ccn3 && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">CCN3: </span>
              {country.ccn3}
            </h2>
          )}

          {country?.cioc && (
            <h2 className="text-[20px] font-bold text-center text-white">
              <span className="font-normal">CIOC: </span>
              {country.cioc}
            </h2>
          )}

          <div className="block_text_and_img_maps">
            <h1 className="text-[16px] text-center font-bold text-white">
              See in map (Google Map or Open Street Map)
            </h1>
            <div className="block_img_maps flex justify-center items-center gap-[20px] mt-[20px] ">
              {country.maps?.googleMaps && (
                <a
                  href={country.maps.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={googleMapsLogo}
                    alt="Google Maps"
                    className="h-[50px] object-contain"
                  />
                </a>
              )}
              {country.maps?.openStreetMaps && (
                <a
                  href={country.maps.openStreetMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={openStreetMapLogo}
                    alt="Open Street Map"
                    className="h-[50px] object-contain"
                  />
                </a>
              )}
              <h1 className="text-white text-[21px]">{`->`}</h1>
              <img
                className="h-[50px] object-contain"
                src={country.flags.svg}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
