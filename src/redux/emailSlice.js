// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';




// export const fetchEmailData = createAsyncThunk(
//   'email/fetchEmailData',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await axios.get('http://13.127.211.81:8085/Mail/getAllMail', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const emailSlice = createSlice({
//   name: 'email',
//   initialState: {
//     data: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmailData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchEmailData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload.data;
//       })
//       .addCase(fetchEmailData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default emailSlice.reducer;



 // refrehs token -----------------


 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { refreshToken } from '../redux/authSlice'; // Import the refreshToken thunk

export const fetchEmailData = createAsyncThunk(
  'email/fetchEmailData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get('https://www.annulartech.net/Mail/getAllMail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // If the error is related to token expiration, attempt to refresh the token
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await dispatch(refreshToken()).unwrap();
          const newToken = refreshResponse.jwt;
          const retryResponse = await axios.get('https://www.annulartech.net/Mail/getAllMail', {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          return retryResponse.data;
        } catch (refreshError) {
          return rejectWithValue(refreshError.response?.data || 'Failed to refresh token');
        }
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch email data');
    }
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmailData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchEmailData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default emailSlice.reducer;
