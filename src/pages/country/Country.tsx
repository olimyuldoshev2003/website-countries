import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Country = () => {
  const { id } = useParams();

  const [country, setCountry] = useState([]);

  async function getCountryByName() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_REST_COUNTRIES}/${
          import.meta.env.VITE_API_COUNTRIES_BY_NAME
        }/${id}`
      );

      setCountry(data?.at(0));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    getCountryByName();
  }, []);
  return (
    <>
      <div className="country_page">
        <h1>
          Capital: <span>{country?.capital?.at(0)}</span>
        </h1>
              {country?.altSpellings?.map((item, index) => {
            
       return (
         <h1 className="flex items-center gap-3">
           Spelling<pre>{index + 1}:</pre><span>{item}</span>
         </h1>
       );
            })}
      </div>
    </>
  );
};

export default Country;
