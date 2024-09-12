// // src/redux/authSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk for login
// export const login = createAsyncThunk('auth/login', async ({ emailId, password }) => {
//   const response = await axios.post('https://abfd59f4-44df-459b-9e77-a08d41749caf.mock.pstmn.io/user/login', { emailId, password });
//   return response.data;
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload; 
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default authSlice.reducer;


// main code 1-----------

// src/redux/authSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   const response = await axios.post('http://13.202.193.62:8085/user/login', credentials);
//   return response.data;
// });
// // https://8f2bdc70-dd7c-4be6-96a8-9a8a1ab4df82.mock.pstmn.io/user/login

// // old end point ----https://abfd59f4-44df-459b-9e77-a08d41749caf.mock.pstmn.io/user/login
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default authSlice.reducer;





// // this is deployed code for login and it is find code --------------------//

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://13.202.193.62:8085/user/login', {
        emailId: loginData.email, // Assuming emailId based on previous error
        password: loginData.password
      });

      // Save JWT token to localStorage
      const { jwt, ...userData } = response.data;
      localStorage.setItem('jwt', jwt); // Save token locally for future requests

      return { jwt, ...userData }; // Pass user data to Redux state
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    jwt: null, // Store JWT token in state
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem('jwt'); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data
        state.jwt = action.payload.jwt; // Set JWT token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

