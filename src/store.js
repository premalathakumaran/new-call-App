

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './redux/authSlice'; 
// import tableReducer from './redux/tableSlice';
// import groupReducer from './redux/groupSlice';
// import modalReducer from './redux/modalSlice';
// import emailReducer from './redux/emailSlice';


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     table: tableReducer,
//     group: groupReducer,
//     modal: modalReducer,
//     email: emailReducer, 

    
//   },
// });

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'; 
import tableReducer from './redux/tableSlice';
import groupReducer from './redux/groupSlice';
import modalReducer from './redux/modalSlice';
import emailReducer from './redux/emailSlice';
import relatedNumbersReducer from './redux/relatedNumbersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
    group: groupReducer,
    modal: modalReducer,
    email: emailReducer,
    relatedNumbers: relatedNumbersReducer,
  },
});