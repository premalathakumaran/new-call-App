

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'; 
import tableReducer from './redux/tableSlice';
import groupReducer from './redux/groupSlice';
import modalReducer from './redux/modalSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    group: groupReducer,
    modal: modalReducer,

    
  },
});

export default store;

