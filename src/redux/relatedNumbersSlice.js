
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchRelatedNumbers = createAsyncThunk(
//   'relatedNumbers/fetchRelatedNumbers',
//   async (senderNumber, { rejectWithValue }) => {
//     console.log("sender data",senderNumber )
//     try {
//       const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage
//       const response = await axios.get(
//         `http://13.127.211.81:8085/notes/getNumberBySenderNumber?senderNumber=${senderNumber}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("token data", response.data.data)
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch related numbers');
//     }
//   }
// );

// const relatedNumbersSlice = createSlice({
//   name: 'relatedNumbers',
//   initialState: {
//     numbers: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRelatedNumbers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRelatedNumbers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.numbers = action.payload;
//       })
//       .addCase(fetchRelatedNumbers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default relatedNumbersSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRelatedNumbers = createAsyncThunk(
  'relatedNumbers/fetchRelatedNumbers',
  async (senderNumber, { rejectWithValue }) => {
    console.log("Fetching related numbers for:", senderNumber);
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        return rejectWithValue('No token found');
      }
      const response = await axios.get(
        `http://13.127.211.81:8085/notes/getNumberBySenderNumber?senderNumber=${senderNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", response.data);
      if (response.data.status === 1 && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        return rejectWithValue('Invalid response format');
      }
    } catch (error) {
      console.error("Error fetching related numbers:", error);
      return rejectWithValue(error.response?.data || 'Failed to fetch related numbers');
    }
  }
);

const relatedNumbersSlice = createSlice({
  name: 'relatedNumbers',
  initialState: {
    numbers: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearRelatedNumbers: (state) => {
      state.numbers = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedNumbers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedNumbers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.numbers = action.payload;
        state.error = null;
      })
      .addCase(fetchRelatedNumbers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRelatedNumbers } = relatedNumbersSlice.actions;

export default relatedNumbersSlice.reducer;