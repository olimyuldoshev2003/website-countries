import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
    countries: []
};

export const restCountriesSlice = createSlice({
  name: "restCountriesState",
  initialState,
  reducers: {},
});

// const { } = restCountriesSlice.actions

export const selectCount = (state: RootState) => state.restCountriesSlice

export default restCountriesSlice.reducer;
