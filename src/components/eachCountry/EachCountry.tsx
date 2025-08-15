import React from "react";
import { Link } from "react-router-dom";

const EachCountry: React.FC<any> = ({ country }) => {
  return (
    <>
      <Link to={`/country/${country.name.official}`}>
        <div className="country px-3 py-2 rounded-md bg-[#035f53] text-white hover:scale-105 transition-all duration-300">
          <div className="block_img flex justify-center">
            <img
              className="h-[200px] object-contain"
              src={country.flags.svg}
              alt=""
            />
          </div>
          <h1 className="text-[20px] font-bold text-center mt-5">
            <span className="font-normal">Name of the country: </span>
            {country.name.common}
          </h1>
          <h2 className="text-[20px] font-bold text-center mt-2">
            <span className="font-normal">Capital: </span> {country.capital}
            {}
          </h2>
          <h2 className="text-[20px] font-bold text-center mt-2">
            <span className="font-normal">Languages: </span>
            {Object.values(country.languages || {}).map((item: any) => {
              return <h1 className="text-[16px] font-bold"> {item}</h1>;
            })}
          </h2>
          <h4 className="text-[18px] text-center font-bold mt-3">
            <span className="font-normal">Region: </span>
            {country.region}
          </h4>
          <h5 className="text-[16px] text-center font-bold ">
            <span className="font-normal">Subregion: </span>
            {country.subregion}
          </h5>
        </div>
      </Link>
    </>
  );
};

export default EachCountry;
