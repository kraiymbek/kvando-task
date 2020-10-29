import { createSlice } from '@reduxjs/toolkit';

export const weather = createSlice({
  name: 'weather',
  initialState: {
    value: 0,
  },
  reducers: {
    add: state => {
      state.value += 1;
    },
    remove: state => {
      state.value -= 1;
    },
  },
});

export const { add, remove } = weather.actions;

export const getWeather = state => state.weather.value;

export default weather.reducer;