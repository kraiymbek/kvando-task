import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';
import geolocation from 'geolocation';

import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import { addCity, removeCity, getCurrentLocationWeather, getCities, addCurrentLocationWeather } from "./weatherReducer";
import { getWeatherByCity, getWeatherByCoordinate } from "./weatherHelper";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiPaper-root': {
            width: '100%',
        },
    },
    topInfo: {
        display: 'flex',
    },
    topInfoItem: {
        display: 'flex',
        marginRight: 20,
    },
}));

export default function Home() {
  const cities = useSelector(getCities);
  const currentLocationWeather = useSelector(getCurrentLocationWeather);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentPosition, setCurrentPosition] = useState({
      long: null,
      lat: null,
  });
  const [cityOptions, setCityOptions] = useState([]);


  useEffect( () => {
    geolocation.getCurrentPosition((err, position) => {
        if(!err) {
            const cords = position.coords;
            setCurrentPosition({
                long: cords.longitude,
                lat: cords.latitude,
            })
        }
    })
  },[]);

    useEffect( () => {
        if (currentPosition.lat && currentPosition.long && !Object.keys(currentLocationWeather).length) {
            getWeatherByCoordinate(currentPosition.lat,currentPosition.long).then(r => {
                dispatch(addCurrentLocationWeather({
                    name: r.data.name,
                    description: r.data.weather[0].main,
                    detailedDescription: r.data.weather[0].description,
                    temperature: r.data.main.temp,
                    country: r.data.sys.country,
                }));
            })
        }
    },[currentPosition]);

  return (
    <Box className={classes.root}>
        <Box className={classes.topInfo}>
            <Box className={classes.topInfoItem}>
                <h4 style={{color: 'green', marginRight: 10}}>Current country:</h4>
                <h3>{currentLocationWeather.country ? currentLocationWeather.country : 'no info'}</h3>
            </Box>
            <Box className={classes.topInfoItem}>
                <h4 style={{color: 'green', marginRight: 10}}>Current location:</h4>
                <h3>{currentLocationWeather.name ? currentLocationWeather.name : 'no info'}</h3>
            </Box>
            <Box className={classes.topInfoItem}>
                <h4 style={{color: 'green', marginRight: 10}}>Current Temperature:</h4>
                <h3>{currentLocationWeather.temperature ? currentLocationWeather.temperature + ' C' : 'no info'}</h3>
            </Box>
            <Box className={classes.topInfoItem}>
                <h4 style={{color: 'green', marginRight: 10}}>Current Weather Description:</h4>
                <h3>{currentLocationWeather.detailedDescription ? currentLocationWeather.detailedDescription : 'no info'}</h3>
            </Box>
        </Box>

        <Box>
            <h2>Add City</h2>
            <Box>
                <Autocomplete
                    onInputChange={async (event, newInputValue) => {
                        getWeatherByCity(newInputValue)
                            .then(r => {
                                setCityOptions([{
                                    name: r.data.name,
                                    description: r.data.weather[0].main,
                                    detailedDescription: r.data.weather[0].description,
                                    temperature: r.data.main.temp,
                                    country: r.data.sys.country,
                                }]);
                            }).catch((e) => {});
                    }}
                    options={cityOptions}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                />
                <Button >Add city</Button>
            </Box>

        </Box>
        <MaterialTable
            columns={[
                { title: 'City name', field: 'name' },
                { title: 'Temperature', field: 'temperature' },
                { title: 'Description', field: 'description' },
            ]}
            data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
            title="Weather Table"
        />
    </Box>
  );
};