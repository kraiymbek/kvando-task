import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table'

import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

import { add, remove, getWeather } from "./weatherReducer";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        '& .MuiPaper-root': {
            width: '100%',
        },
    },
}));

export default function Home() {
  const weather = useSelector(getWeather);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <MaterialTable
            columns={[
                { title: 'Adı', field: 'name' },
                { title: 'Soyadı', field: 'surname' },
                { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
            ]}
            data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
            title="Demo Title"
        />
    </Box>
  );
};

// <Card>
//   <CardContent>
//     <Typography variant="h5">
//       Weather Spa
//     </Typography>
//     <Typography
//         align="center"
//         variant="subtitle1"
//     >
//       Counter: {counter}
//     </Typography>
//   </CardContent>
//   <CardActions>
//     <Button color="primary" variant="contained" onClick={() => dispatch(increment())}>
//       Increment
//     </Button>
//     <Button
//         color="secondary"
//         variant="contained"
//         onClick={() => dispatch(decrement())}
//     >
//       Decrement
//     </Button>
//   </CardActions>
// </Card>