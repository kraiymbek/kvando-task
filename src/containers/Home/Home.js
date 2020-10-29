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
import useDebounce from "../../hooks/useDebounce";

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
    addCityWrapper: {
        display: 'flex',
        marginBottom: 50,
    },
}));

export default function Home() {
  const cities = useSelector(getCities);
  const currentLocationWeather = useSelector(getCurrentLocationWeather);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentPosition, setCurrentPosition] = useState({ long: null, lat: null });
  const [editable, setEditable] = useState(() => cities.map(o => ({ ...o })));
  const [cityOptions, setCityOptions] = useState([]);
  const [cityExisted, setCityExisted] = useState(false);
  const [selectedCity, setSelectedCity] = useState(false);
  const [searchingCity, setSearchingCity] = useState(null);
  const debouncedSearchTerm = useDebounce(searchingCity, 500);


  useEffect(() => {
      setEditable(cities.map(o => ({ ...o })));
      setCityExisted(cities.some(item => item.name === selectedCity));
  },[cities, selectedCity]);

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
    },[currentPosition, currentLocationWeather, dispatch]);

  useEffect(() => {
      if (debouncedSearchTerm) {
          getWeatherByCity(debouncedSearchTerm)
              .then(r => {
                  setCityOptions([{
                      name: r.data.name,
                      description: r.data.weather[0].main,
                      detailedDescription: r.data.weather[0].description,
                      temperature: r.data.main.temp + ' C',
                      country: r.data.sys.country,
                  }]);
              }).catch((e) => {});
      }
  }, [debouncedSearchTerm]);

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
            <Box className={classes.addCityWrapper}>
                <Autocomplete
                    disableClearable
                    onInputChange={async (event, newInputValue) => setSearchingCity(newInputValue)}
                    onChange={(e, value) => {
                        if (!value) {
                            setCityOptions([])
                        } else {
                            setSelectedCity(value.name);
                        }
                    }}
                    getOptionSelected={(option, value) => option.name === value.name}
                    options={cityOptions}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300, marginRight: 20, }}
                    renderInput={(params) => <TextField {...params} label="Select city" variant="outlined" />}
                />
                <Button variant="contained" color="primary" disabled={!cityOptions.length || cityExisted} onClick={() => {
                    dispatch(addCity(cityOptions[0]))
                }}>Add city</Button>
            </Box>

        </Box>
        <MaterialTable
            columns={[
                { title: 'City', field: 'name' },
                { title: 'Country', field: 'country' },
                { title: 'Temperature', field: 'temperature' },
                { title: 'Description', field: 'description' },
                { title: 'Detailed description', field: 'detailedDescription' },
            ]}
            options={{
                actionsColumnIndex: -1
            }}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => dispatch(removeCity(rowData.tableData.id))
                }
            ]}
            data={editable}
            title="Weather Table"
        />
    </Box>
  );
};