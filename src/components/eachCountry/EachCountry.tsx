import React from "react";
import { Link } from "react-router-dom";

const EachCountry: React.FC<any> = ({ country }) => {
  return (
    <>
      <Link to={`/country/${country.name.common}`}>
        <div
          className="country border-[1px] border-[#7f7f7f] px-3 py-2 rounded-sm"
          key={country.id}
        >
          <div className="block_img flex justify-center">
            <img
              className="h-[200px] object-contain"
              src={country.flags.svg}
              alt=""
            />
          </div>
          <h1 className="text-[20px] font-medium text-center mt-5">
            {country.name.common}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default EachCountry;
