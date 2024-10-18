


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async ({ senderNumber, receiverNumber, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.annulartech.net/notes/getNotesBySenderNumberAndReceiverNumber?senderNumber=${senderNumber}&receiverNumber=${receiverNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearNotes: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { clearNotes } = notesSlice.actions;

export default notesSlice.reducer;