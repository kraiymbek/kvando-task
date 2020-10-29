import { createSlice } from '@reduxjs/toolkit';

export const weather = createSlice({
  name: 'weather',
  initialState: {
    currentLocationWeather: {},
    cities: [],
  },
  reducers: {
    addCity: (state, res) => {
      state.cities.push(res);
    },
    removeCity: state => {
      // state.cities.slice();
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