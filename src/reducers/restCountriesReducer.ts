import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { getCountries } from "../api/api";

const initialState = {
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
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        {
          state.loadingCountries = false;
          state.countries = action.payload;
        }
      }).addCase(getCountries.rejected, (state) => {
        state.loadingCountries = false
      })
  },
});

// const { } = restCountriesSlice.actions

export const selectCount = (state: RootState) => state.restCountriesSlice;

export default restCountriesSlice.reducer;
