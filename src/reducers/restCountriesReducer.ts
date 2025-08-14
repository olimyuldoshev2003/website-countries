import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getCountries, getSearchedCountries } from "../api/api";

interface ICountriesReducer {
  countries: any,
  loadingCountries: boolean,
  searchedCountries: any,
  loadingSearchedCountries: boolean,

}

const initialState: ICountriesReducer = {
  countries: [],
  loadingCountries: false,
  searchedCountries: [],
  loadingSearchedCountries: false,
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
      .addCase(getSearchedCountries.pending, (state) => {
        state.loadingSearchedCountries = true;
        state.searchedCountries = []
      })
      .addCase(getSearchedCountries.fulfilled, (state, action) => {
        {
          state.loadingSearchedCountries = false;
          state.searchedCountries = action.payload;
        }
      }).addCase(getSearchedCountries.rejected, (state) => {
        state.loadingSearchedCountries = false
        state.searchedCountries = []
      })
  },
});

// const { } = restCountriesSlice.actions

export const selectCount = (state: RootState) => state.restCountriesSlice;

export default restCountriesSlice.reducer;
