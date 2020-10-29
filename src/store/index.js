import { configureStore } from '@reduxjs/toolkit';

import settings from "../containers/Setting/settingsReducer";
import weather from "../containers/Home/weatherReducer";

export default configureStore({
  reducer: {
    settings,
    weather,
  },
});
