import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './builderSlice';

const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
});

export default store;
