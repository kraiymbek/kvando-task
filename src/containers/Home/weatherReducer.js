import { createSlice } from '@reduxjs/toolkit';

export const weather = createSlice({
  name: 'weather',
  initialState: {
    currentLocationWeather: {},
    cities: [],
  },
  reducers: {
    addCity: (state, res) => {
      state.cities.push(res.payload);
    },
    removeCity: (state, res) => {
      state.cities = state.cities.filter((item, index) => res.payload !== index);

    },
    addCurrentLocationWeather: (state, res) => {
      state.currentLocationWeather = res.payload;
    }
  },
});

export const { addCity, removeCity, addCurrentLocationWeather } = weather.actions;

export const getCities = state => state.weather.cities;
export const getCurrentLocationWeather = state => state.weather.currentLocationWeather;

export default weather.reducer;