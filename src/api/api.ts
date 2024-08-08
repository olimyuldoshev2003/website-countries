import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AsyncThunkConfig {}

export const getCountries: AsyncThunk<void, void, AsyncThunkConfig> =
  createAsyncThunk("api/getCountries", async function () {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_REST_COUNTRIES}/${
          import.meta.env.VITE_API_ALL_COUNTRIES
        }`
      );
        
        console.log(data);
        
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
