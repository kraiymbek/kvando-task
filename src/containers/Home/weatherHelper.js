import axios from "axios"

const apiKey = '3ed11de45305016ddfaebd7dd9eb817c';

export const getWeatherByCity = (byCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${byCity}&appid=${apiKey}&units=metric`;
    return axios.get(url);
};

export const getWeatherByCoordinate = (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    return axios.get(url);
};