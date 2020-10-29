import { createSlice } from '@reduxjs/toolkit';

export const weather = createSlice({
  name: 'weather',
  initialState: {
    currentLocationWeather: {},
    cities: localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [],
  },
  reducers: {
    addCity: (state, res) => {
      if (!state.cities.some(item => item.name === res.payload.name)) {
        const editedCities = [...state.cities, res.payload];
        state.cities = editedCities;
        localStorage.setItem('cities', JSON.stringify(editedCities));
      }
    },
    removeCity: (state, res) => {
      const editedCity = state.cities.filter((item, index) => res.payload !== index);
      state.cities = editedCity;
      localStorage.setItem('cities', JSON.stringify(editedCity));

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