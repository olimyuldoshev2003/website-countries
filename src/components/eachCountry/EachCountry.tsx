import React from "react";

const EachCountry: React.FC<any> = ({ country }) => {
  return (
    <>
      <div className="country border-[1px] border-[#7f7f7f] px-3 py-2 rounded-sm" key={country.id}>
              <h1 className="text-[20px] font-medium">{country.name.common}</h1>
      </div>
    </>
  );
};

export default EachCountry;
