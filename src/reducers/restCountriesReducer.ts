import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getCountries } from "../api/api";

interface ICountriesReducer {
  countries: any,
  loadingCountries: boolean,

}

const initialState: ICountriesReducer = {
  countries: [],
  loadingCountries: false,
};

export const restCountriesSlice = createSlice({
  name: "restCountriesState",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loadingCountries = true;
        state.countries = []
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        {
          state.loadingCountries = false;
          state.countries = action.payload;
        }
      }).addCase(getCountries.rejected, (state) => {
        state.loadingCountries = false
        state.countries = []
      })
  },
});

// const { } = restCountriesSlice.actions

export const selectCount = (state: RootState) => state.restCountriesSlice;

export default restCountriesSlice.reducer;
