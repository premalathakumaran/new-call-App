
// UPDATED CODE 3 -------------------------------Final

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch table data
// export const fetchTableData = createAsyncThunk('table/fetchTableData', async () => {
//   try {
//     const response = await axios.get('https://8f2bdc70-dd7c-4be6-96a8-9a8a1ab4df82.mock.pstmn.io/getAllData');

//     const dataArray = response.data.data || [];

//     return dataArray.map((item, index) => ({
//       id: index, // Using index as id if there's no unique id in the data
//       name: item.groupName || 'N/A',
//       phones: item.mobileNumber || [],
//       status: item.status ? 'Active' : 'Inactive',
//     }));
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     throw error;
//   }
// });

// // Initial state
// const initialState = {
//   data: [],
//   selectedPerson: null,
//   status: 'idle',
//   error: null,
// };

// // Slice
// const tableSlice = createSlice({
//   name: 'table',
//   initialState,
//   reducers: {
//     updateTableItem: (state, action) => {    // table edit items
//       const { id, item } = action.payload;
//       const index = state.data.findIndex(i => i.id === id);
//       if (index !== -1) {
//         state.data[index] = { ...state.data[index], ...item };
//       }
//     },
//     deleteTableItem: (state, action) => {       // table delete items
//       const id = action.payload;
//       state.data = state.data.filter(item => item.id !== id);
//     },
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload;
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         const phoneIndex = person.phones.findIndex(phone => phone === oldPhone);
//         if (phoneIndex !== -1) {
//           person.phones[phoneIndex] = newPhone; // Update the phone number in person details
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         person.phones = person.phones.filter(p => p !== phone); // Remove the phone number in person details
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         if (!person.phones.includes(phone)) {
//           person.phones.push(phone); // Add the phone number in person details
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   updateTableItem,
//   deleteTableItem,
//   selectPerson,
//   clearSelectedPerson,
//   updatePhoneNumber,
//   deletePhoneNumber,
//   addPhoneNumber,
// } = tableSlice.actions;

// export default tableSlice.reducer;

// UPDATED CODE 3 (1)--------PROBLEM SOLVING MAIN CODE-----------------------Final

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch table data
// export const fetchTableData = createAsyncThunk('table/fetchTableData', async () => {
//   try {
//     const response = await axios.get('https://8f2bdc70-dd7c-4be6-96a8-9a8a1ab4df82.mock.pstmn.io/getAllData');

//     const dataArray = response.data.data || [];

//     return dataArray.map((item, index) => ({
//       id: index, // Using index as id if there's no unique id in the data
//       name: item.groupName || 'N/A',
//       phones: item.mobileNumber || [],
//       status: item.status ? 'Active' : 'Inactive',
//     }));
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     throw error;
//   }
// });

// // Initial state
// const initialState = {
//   data: [],
//   selectedPerson: null,
//   status: 'idle',
//   error: null,
// };

// // Slice
// const tableSlice = createSlice({
//   name: 'table',
//   initialState,
//   reducers: {
//     updateTableItem: (state, action) => {
//       const { id, item } = action.payload;
//       const index = state.data.findIndex(i => i.id === id);
//       if (index !== -1) {
//         state.data[index] = { ...state.data[index], ...item };
//       }
//     },
//     deleteTableItem: (state, action) => {
//       const id = action.payload;
//       state.data = state.data.filter(item => item.id !== id);
//     },
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload;
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         const phoneIndex = person.phones.findIndex(phone => phone === oldPhone);
//         if (phoneIndex !== -1) {
//           person.phones[phoneIndex] = newPhone; // Update the phone number
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         person.phones = person.phones.filter(p => p !== phone); // Remove the phone number
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(item => item.id === id);
//       if (person) {
//         if (!person.phones.includes(phone)) {
//           person.phones.push(phone); // Add the phone number
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { updateTableItem, deleteTableItem, selectPerson, clearSelectedPerson, updatePhoneNumber, deletePhoneNumber, addPhoneNumber } = tableSlice.actions;

// export default tableSlice.reducer;

// main code with backend api-------main code for display data ------------------------

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch data
// export const fetchTableData = createAsyncThunk('table/fetchTableData', async (token, { rejectWithValue }) => {
//   try {
//     const response = await axios.get('http://13.202.193.62:8085/group/getGroupDetails', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data || 'Failed to fetch data');
//   }
// });

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [],
//     status: 'idle',
//     error: null,
//     selectedPerson: null,
//   },
//   reducers: {
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload;
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     updateTableItem: (state, action) => {
//       const { id, item } = action.payload;
//       const index = state.data.findIndex((i) => i.id === id);
//       if (index !== -1) {
//         state.data[index] = item;
//       }
//     },
//     deleteTableItem: (state, action) => {
//       state.data = state.data.filter((item) => item.id !== action.payload);
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.map((phone) =>
//           phone === oldPhone ? newPhone : phone
//         );
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones.push(phone);
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.filter((p) => p !== phone);
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions
// export const { selectPerson, clearSelectedPerson, updateTableItem, deleteTableItem, updatePhoneNumber, addPhoneNumber, deletePhoneNumber } = tableSlice.actions;
// export default tableSlice.reducer;

// main code with backend api--------for group form -----------------------

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Authorization token from state
//           },
//         }
//       );
//       return response.data.data; // Ensure that the payload is correctly handled
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to fetch table data'
//       ); // Consistent error handling
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [], // Array to store fetched table data
//     status: 'idle', // Loading status: 'idle', 'loading', 'succeeded', 'failed'
//     error: null, // Error message state
//     selectedPerson: null, // Person selected in the table
//   },
//   reducers: {
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload; // Store selected person by ID
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null; // Clear selected person
//     },
//     updateTableItem: (state, action) => {
//       const { id, item } = action.payload;
//       const index = state.data.findIndex((i) => i.id === id);
//       if (index !== -1) {
//         state.data[index] = { ...state.data[index], ...item }; // Update table item data
//       }
//     },
//     deleteTableItem: (state, action) => {
//       state.data = state.data.filter((item) => item.id !== action.payload); // Remove table item by ID
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.map((phone) =>
//           phone === oldPhone ? newPhone : phone
//         ); // Update phone number
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones.push(phone); // Add new phone number
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.filter((p) => p !== phone); // Remove phone number
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading'; // Loading state
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded'; // Data successfully fetched
//         state.data = action.payload; // Store fetched data in state
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed'; // Fetch failed
//         state.error = action.payload; // Store error message
//       });
//   },
// });

// // Export actions for dispatching and reducers
// export const {
//   selectPerson,
//   clearSelectedPerson,
//   updateTableItem,
//   deleteTableItem,
//   updatePhoneNumber,
//   addPhoneNumber,
//   deletePhoneNumber,
// } = tableSlice.actions;

// export default tableSlice.reducer;

//-----------------------------------------------------------
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Authorization token from state
//           },
//         }
//       );
//       return response.data.data; // Ensure that the payload is correctly handled
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to fetch table data'
//       ); // Consistent error handling
//     }
//   }
// );

// // Async thunk to add a new table item
// export const addTableItem = createAsyncThunk(
//   'table/addTableItem',
//   async (newItem, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'http://13.202.193.62:8085/group/addGroup',
//         newItem,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response.data; // Return the added item
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to add table item'
//       ); // Consistent error handling
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [], // Array to store fetched table data
//     status: 'idle', // Loading status: 'idle', 'loading', 'succeeded', 'failed'
//     error: null, // Error message state
//     selectedPerson: null, // Person selected in the table
//   },
//   reducers: {
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload; // Store selected person by ID
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null; // Clear selected person
//     },
//     updateTableItem: (state, action) => {
//       const { id, item } = action.payload;
//       const index = state.data.findIndex((i) => i.id === id);
//       if (index !== -1) {
//         state.data[index] = { ...state.data[index], ...item }; // Update table item data
//       }
//     },
//     deleteTableItem: (state, action) => {
//       state.data = state.data.filter((item) => item.id !== action.payload); // Remove table item by ID
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.map((phone) =>
//           phone === oldPhone ? newPhone : phone
//         ); // Update phone number
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones.push(phone); // Add new phone number
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.filter((p) => p !== phone); // Remove phone number
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading'; // Loading state
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded'; // Data successfully fetched
//         state.data = action.payload; // Store fetched data in state
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed'; // Fetch failed
//         state.error = action.payload; // Store error message
//       })
//       .addCase(addTableItem.fulfilled, (state, action) => {
//         state.data.push(action.payload); // Add new item to the data array
//       })
//       .addCase(addTableItem.rejected, (state, action) => {
//         state.error = action.payload; // Handle errors if adding fails
//       });
//   },
// });

// export const {
//   selectPerson,
//   clearSelectedPerson,
//   updateTableItem,
//   deleteTableItem,
//   updatePhoneNumber,
//   addPhoneNumber,
//   deletePhoneNumber,
// } = tableSlice.actions;

// export default tableSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Authorization token from state
//           },
//         }
//       );
//       return response.data.data; // Ensure that the payload is correctly handled
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to fetch table data'
//       ); // Consistent error handling
//     }
//   }
// );

// // Async thunk to add a new table item
// export const addTableItem = createAsyncThunk(
//   'table/addTableItem',
//   async (newItem, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'http://13.202.193.62:8085/group/saveGroupDetails', // Updated API endpoint
//         newItem,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response.data; // Return the added item or relevant response
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to add table item'
//       ); // Consistent error handling
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [], // Array to store fetched table data
//     status: 'idle', // Loading status: 'idle', 'loading', 'succeeded', 'failed'
//     error: null, // Error message state
//     selectedPerson: null, // Person selected in the table
//   },
//   reducers: {
//     selectPerson: (state, action) => {
//       state.selectedPerson = action.payload; // Store selected person by ID
//     },
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null; // Clear selected person
//     },
//     updateTableItem: (state, action) => {
//       const { id, item } = action.payload;
//       const index = state.data.findIndex((i) => i.id === id);
//       if (index !== -1) {
//         state.data[index] = { ...state.data[index], ...item }; // Update table item data
//       }
//     },
//     deleteTableItem: (state, action) => {
//       state.data = state.data.filter((item) => item.id !== action.payload); // Remove table item by ID
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.map((phone) =>
//           phone === oldPhone ? newPhone : phone
//         ); // Update phone number
//       }
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones.push(phone); // Add new phone number
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((p) => p.id === id);
//       if (person) {
//         person.phones = person.phones.filter((p) => p !== phone); // Remove phone number
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading'; // Loading state
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded'; // Data successfully fetched
//         state.data = action.payload; // Store fetched data in state
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed'; // Fetch failed
//         state.error = action.payload; // Store error message
//       })
//       .addCase(addTableItem.fulfilled, (state, action) => {
//         state.data.push(action.payload); // Add new item to the data array
//       })
//       .addCase(addTableItem.rejected, (state, action) => {
//         state.error = action.payload; // Handle errors if adding fails
//       });
//   },
// });

// export const {
//   selectPerson,
//   clearSelectedPerson,
//   updateTableItem,
//   deleteTableItem,
//   updatePhoneNumber,
//   addPhoneNumber,
//   deletePhoneNumber,
// } = tableSlice.actions;

// export default tableSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch table data'
//       );
//     }
//   }
// );

// // Fetch group details using the token
// export const fetchGroupDetails = createAsyncThunk(
//   'table/fetchGroupDetails',
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await axios.get(`http://13.202.193.62:8085/group/getGroupDetailsById?groupId=${groupId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch group details');
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [],
//     selectedPerson: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (!person.phones) person.phones = [];  // Ensure phones is defined
//         person.phones.push(phone);
//       }
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.indexOf(oldPhone); // Optional chaining
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (person.phones) {  // Ensure phones is defined
//           person.phones = person.phones.filter(p => p !== phone);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchGroupDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchGroupDetails.fulfilled, (state, action) => {
//         state.selectedPerson = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchGroupDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSelectedPerson, addPhoneNumber, updatePhoneNumber, deletePhoneNumber } = tableSlice.actions;
// export default tableSlice.reducer;

// domi does not work use this main code one ------------------------------------------------------------

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch table data'
//       );
//     }
//   }
// );

// // Fetch group details using the token
// export const fetchGroupDetails = createAsyncThunk(
//   'table/fetchGroupDetails',
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await axios.get(`http://13.202.193.62:8085/group/getGroupDetailsById?groupId=${groupId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch group details');
//     }
//   }
// );

// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   'table/deleteGroup',
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
//       if (!token) throw new Error('No token found');

//       await axios.delete(`http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return groupId; // Return the ID of the deleted group to remove from state
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete group'
//       );
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [],
//     selectedPerson: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (!person.phones) person.phones = [];  // Ensure phones is defined
//         person.phones.push(phone);
//       }
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.indexOf(oldPhone); // Optional chaining
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (person.phones) {  // Ensure phones is defined
//           person.phones = person.phones.filter(p => p !== phone);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchGroupDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchGroupDetails.fulfilled, (state, action) => {
//         state.selectedPerson = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchGroupDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Remove the deleted group from the state
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSelectedPerson, addPhoneNumber, updatePhoneNumber, deletePhoneNumber } = tableSlice.actions;
// export default tableSlice.reducer;

//main file-----------------------------
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // const API_BASE_URL = 'http://13.202.193.62:8085/group';

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   "table/fetchTableData",
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://13.202.193.62:8085/group/getGroupDetails",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch table data"
//       );
//     }
//   }
// );

// // Fetch group details using the token
// export const fetchGroupDetails = createAsyncThunk(
//   "table/fetchGroupDetails",
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt");

//       const response = await axios.get(
//         `http://13.202.193.62:8085/group/getGroupDetailsById?groupId=${groupId}`,
//         {
//           // params: { groupId },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch group details"
//       );
//     }
//   }
// );

// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   "table/deleteGroup",
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
//       if (!token) throw new Error("No token found");

//       await axios.delete(
//         `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
//         {
//           params: {
//             flag: 0,
//             // groupId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return groupId; // Return the ID of the deleted group to remove from state
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete group"
//       );
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: "table",
//   initialState: {
//     data: [],
//     selectedPerson: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((person) => person.id === id);
//       if (person) {
//         if (!person.phones) person.phones = []; // Ensure phones is defined
//         person.phones.push(phone);
//       }
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((person) => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.indexOf(oldPhone); // Optional chaining
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find((person) => person.id === id);
//       if (person) {
//         if (person.phones) {
//           // Ensure phones is defined
//           person.phones = person.phones.filter((p) => p !== phone);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(fetchGroupDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchGroupDetails.fulfilled, (state, action) => {
//         state.selectedPerson = action.payload;
//         state.status = "succeeded";
//       })
//       .addCase(fetchGroupDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Remove the deleted group from the state
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   clearSelectedPerson,
//   addPhoneNumber,
//   updatePhoneNumber,
//   deletePhoneNumber,
// } = tableSlice.actions;
// export default tableSlice.reducer;




// domi file ------------------main code ------------------------................
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch table data
export const fetchTableData = createAsyncThunk(
  "table/fetchTableData",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://13.202.193.62:8085/group/getGroupDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch table data"
      );
    }
  }
);

// Fetch group details using the token
export const fetchGroupDetails = createAsyncThunk(
  "table/fetchGroupDetails",
  async (groupId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://13.202.193.62:8085/group/getGroupDetailsById?groupId=${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch group details"
      );
    }
  }
);

// Update (edit) group details
export const updateGroupDetails = createAsyncThunk(
  "table/updateGroupDetails",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://13.202.193.62:8085/group/updateGroupDetailsById`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update group details"
      );
    }
  }
);

// Delete a group
export const deleteGroup = createAsyncThunk(
  "table/deleteGroup",
  async ({ groupId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found");

      await axios.post(
        `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return groupId; // Return the ID of the deleted group to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete group"
      );
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    data: [],
    selectedPerson: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSelectedPerson: (state) => {
      state.selectedPerson = null;
    },
    addPhoneNumber: (state, action) => {
      const { id, phone } = action.payload;
      const person = state.data.find((person) => person.id === id);
      if (person) {
        if (!person.phones) person.phones = []; // Ensure phones is defined
        person.phones.push(phone);
      }
    },
    updatePhoneNumber: (state, action) => {
      const { id, oldPhone, newPhone } = action.payload;
      const person = state.data.find((person) => person.id === id);
      if (person) {
        const phoneIndex = person.phones?.indexOf(oldPhone); // Optional chaining
        if (phoneIndex > -1) {
          person.phones[phoneIndex] = newPhone;
        }
      }
    },
    deletePhoneNumber: (state, action) => {
      const { id, phone } = action.payload;
      const person = state.data.find((person) => person.id === id);
      if (person) {
        if (person.phones) {
          person.phones = person.phones.filter((p) => p !== phone);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch table data
      .addCase(fetchTableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch group details
      .addCase(fetchGroupDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupDetails.fulfilled, (state, action) => {
        state.selectedPerson = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchGroupDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update group details
      .addCase(updateGroupDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGroupDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedGroup = action.payload;
        // Update the corresponding group in the state
        state.data = state.data.map((group) =>
          group.id === updatedGroup.id ? updatedGroup : group
        );
      })
      .addCase(updateGroupDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete group
      .addCase(deleteGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedPerson,
  addPhoneNumber,
  updatePhoneNumber,
  deletePhoneNumber,
} = tableSlice.actions;
export default tableSlice.reducer;





// this used delete API also ---------------------------------------------


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (token, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         'http://13.202.193.62:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch table data'
//       );
//     }
//   }
// );

// // Fetch group details using the token
// export const fetchGroupDetails = createAsyncThunk(
//   'table/fetchGroupDetails',
//   async (groupId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       const response = await axios.get(`http://13.202.193.62:8085/group/getGroupDetailsById?groupId=${groupId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch group details');
//     }
//   }
// );

// // Update (edit) group details
// export const updateGroupDetails = createAsyncThunk(
//   'table/updateGroupDetails',
//   async ({ formData, groupId, token }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `http://13.202.193.62:8085/group/updateGroupDetailsById`,
//         {
//           ...formData,
//           groupId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update group details'
//       );
//     }
//   }
// );

// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   'table/deleteGroup',
//   async ({groupId}, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       if (!token) throw new Error('No token found');

//       await axios.post(`http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,{}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return groupId;  // Return the ID of the deleted group to remove from state
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete group'
//       );
//     }
//   }
// );

// // Delete a phone number from the group details
// export const deletePhoneNumberFromGroupDetails = createAsyncThunk(
//   'table/deletePhoneNumberFromGroupDetails',
//   async ({ groupId, groupDetailsId, phone }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('jwt');
//       if (!token) throw new Error('No token found');

//       await axios.post(
//         `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${groupDetailsId}&groupId=${groupId}`,
//         { phone },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return { groupId, groupDetailsId, phone };  // Return necessary data to update the state
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to delete phone number'
//       );
//     }
//   }
// );

// const tableSlice = createSlice({
//   name: 'table',
//   initialState: {
//     data: [],
//     selectedPerson: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     addPhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (!person.phones) person.phones = [];  // Ensure phones is defined
//         person.phones.push(phone);
//       }
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.indexOf(oldPhone); // Optional chaining
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { id, phone } = action.payload;
//       const person = state.data.find(person => person.id === id);
//       if (person) {
//         if (person.phones) {
//           person.phones = person.phones.filter(p => p !== phone);
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch table data
//       .addCase(fetchTableData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTableData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(fetchTableData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Fetch group details
//       .addCase(fetchGroupDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchGroupDetails.fulfilled, (state, action) => {
//         state.selectedPerson = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchGroupDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Update group details
//       .addCase(updateGroupDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const updatedGroup = action.payload;
//         // Update the corresponding group in the state
//         state.data = state.data.map((group) =>
//           group.id === updatedGroup.id ? updatedGroup : group
//         );
//       })
//       .addCase(updateGroupDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Delete group
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Delete phone number from group details
//       .addCase(deletePhoneNumberFromGroupDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deletePhoneNumberFromGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const { groupId, phone } = action.payload;
//         const person = state.data.find(person => person.id === groupId);
//         if (person) {
//           if (person.phones) {
//             person.phones = person.phones.filter(p => p !== phone);
//           }
//         }
//       })
//       .addCase(deletePhoneNumberFromGroupDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSelectedPerson, addPhoneNumber, updatePhoneNumber, deletePhoneNumber } = tableSlice.actions;
// export default tableSlice.reducer;
