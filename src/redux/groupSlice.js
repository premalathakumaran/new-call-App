// second main code this code also fine updateing the code ---------if the under code does not work use this ------it show the delete icon before you enter the number-----------------------------

// import { createSlice } from '@reduxjs/toolkit';

// const groupSlice = createSlice({
//   name: 'group',
//   initialState: {
//     isFormVisible: false,
//     groupName: '',
//     mobileNumbers: [{ countryCode: '', number: '' }],
//     status: 'Active',
//   },
//   reducers: {
//     toggleFormVisibility(state) {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     setGroupName(state, action) {
//       state.groupName = action.payload;
//     },
//     setMobileNumber(state, action) {
//       const { index, number } = action.payload;
//       if (state.mobileNumbers[index]) {
//         state.mobileNumbers[index].number = number;
//       }
//     },
//     setCountryCode(state, action) {
//       const { index, countryCode } = action.payload;
//       if (state.mobileNumbers[index]) {
//         state.mobileNumbers[index].countryCode = countryCode;
//       }
//     },
//     addMobileNumber(state) {
//       state.mobileNumbers.push({ countryCode: '', number: '' });
//     },
//     removeMobileNumber(state, action) {
//       state.mobileNumbers.splice(action.payload, 1);
//     },
//     setStatus(state, action) {
//       state.status = action.payload;
//     },
//     resetForm(state) {
//       state.groupName = '';
//       state.mobileNumbers = [{ countryCode: '', number: '' }];
//       state.status = 'Active';
//     },
//   },
// });

// export const {
//   toggleFormVisibility,
//   setGroupName,
//   setMobileNumber,
//   setCountryCode,
//   addMobileNumber,
//   removeMobileNumber,
//   setStatus,
//   resetForm,
// } = groupSlice.actions;

// export const selectIsFormVisible = (state) => state.group.isFormVisible;
// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;

// export default groupSlice.reducer;

// it does not show the delete icon before you enter the number----------------------

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   groupName: '',
//   mobileNumbers: [],
//   status: 'Active',
//   isFormVisible: false,
// };

// const groupSlice = createSlice({
//   name: 'group',
//   initialState,
//   reducers: {
//     setGroupName(state, action) {
//       state.groupName = action.payload;
//     },
//     setMobileNumber(state, action) {
//       const { index, number } = action.payload;
//       if (state.mobileNumbers[index]) {
//         state.mobileNumbers[index].number = number;
//       }
//     },
//     setCountryCode(state, action) {
//       const { index, countryCode } = action.payload;
//       if (state.mobileNumbers[index]) {
//         state.mobileNumbers[index].countryCode = countryCode;
//       }
//     },
//     addMobileNumber(state) {
//       state.mobileNumbers.push({ number: '', countryCode: '' });
//     },
//     removeMobileNumber(state, action) {
//       const index = action.payload;
//       state.mobileNumbers = state.mobileNumbers.filter((_, i) => i !== index);
//     },
//     setStatus(state, action) {
//       state.status = action.payload;
//     },
//     toggleFormVisibility(state) {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     resetForm(state) {
//       state.groupName = '';
//       state.mobileNumbers = [];
//       state.status = 'Active';
//     },
//   },
// });

// export const {
//   setGroupName,
//   setMobileNumber,
//   setCountryCode,
//   addMobileNumber,
//   removeMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
// } = groupSlice.actions;

// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;
// export const selectIsFormVisible = (state) => state.group.isFormVisible;

// export default groupSlice.reducer;

// sample code for trying but it working based on my functionallity  with deleting the particular item from the table without closing the form ------------------------------------------------

// import { createSlice } from '@reduxjs/toolkit';

// const groupSlice = createSlice({
//   name: 'group',
//   initialState: {
//     groupName: '',
//     mobileNumbers: [],
//     status: 'Active',
//     isFormVisible: false,
//   },
//   reducers: {
//     setGroupName: (state, action) => {
//       state.groupName = action.payload;
//     },
//     setMobileNumber: (state, action) => {
//       const { index, number } = action.payload;
//       state.mobileNumbers[index].number = number;
//     },
//     setCountryCode: (state, action) => {
//       const { index, countryCode } = action.payload;
//       state.mobileNumbers[index].countryCode = countryCode;
//     },
//     addMobileNumber: (state) => {
//       state.mobileNumbers.push({ countryCode: '', number: '' });
//     },
//     removeMobileNumber: (state, action) => {
//       state.mobileNumbers.splice(action.payload, 1);
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     toggleFormVisibility: (state) => {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     resetForm: (state) => {
//       state.groupName = '';
//       state.mobileNumbers = [];
//       state.status = 'Active';
//     },
//   },
// });

// export const {
//   setGroupName,
//   setMobileNumber,
//   setCountryCode,
//   addMobileNumber,
//   removeMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
// } = groupSlice.actions;

// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;
// export const selectIsFormVisible = (state) => state.group.isFormVisible;

// export default groupSlice.reducer;

// main code with backend api--------for group form -----------------------

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { selectToken } from '../redux/authSlice';

// // Async thunk to save group details
// export const saveGroupDetails = createAsyncThunk(
//   'group/saveGroupDetails',
//   async ({ groupName, mobileNumbers, status }, { getState, rejectWithValue }) => {
//     const token = selectToken(getState());
//     try {
//       const response = await axios.post(
//         'http://13.202.193.62:8085/group/saveGroupDetails',
//         { groupName, mobileNumbers, status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to save group details');
//     }
//   }
// );

// const groupSlice = createSlice({
//   name: 'group',
//   initialState: {
//     groupName: '',
//     mobileNumbers: [],
//     status: 'Active',
//     isFormVisible: false,
//     error: null,
//   },
//   reducers: {
//     setGroupName: (state, action) => {
//       state.groupName = action.payload;
//     },
//     addMobileNumber: (state) => {
//       state.mobileNumbers.push(''); // Adjust based on API requirements
//     },
//     removeMobileNumber: (state, action) => {
//       state.mobileNumbers.splice(action.payload, 1);
//     },
//     setMobileNumber: (state, action) => {
//       const { index, number } = action.payload;
//       state.mobileNumbers[index] = number; // Adjust based on API requirements
//     },
//     setCountryCode: (state, action) => {
//       const { index, countryCode } = action.payload;
//       state.mobileNumbers[index] = { ...state.mobileNumbers[index], countryCode }; // Adjust based on API requirements
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     toggleFormVisibility: (state) => {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     resetForm: (state) => {
//       state.groupName = '';
//       state.mobileNumbers = [];
//       state.status = 'Active';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveGroupDetails.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(saveGroupDetails.fulfilled, (state) => {
//         state.groupName = '';
//         state.mobileNumbers = [];
//         state.status = 'Active';
//         state.isFormVisible = false;
//       })
//       .addCase(saveGroupDetails.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   setGroupName,
//   addMobileNumber,
//   removeMobileNumber,
//   setMobileNumber,
//   setCountryCode, // Ensure this is exported
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
// } = groupSlice.actions;

// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;
// export const selectIsFormVisible = (state) => state.group.isFormVisible;

// export default groupSlice.reducer;






// main code with backend api--------for group form

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { selectToken } from "../redux/authSlice";

// // Async thunk to save group details
// export const saveGroupDetails = createAsyncThunk(
//   "group/saveGroupDetails",
//   async (
//     { groupName, mobileNumbers, status },
//     { getState, rejectWithValue }
//   ) => {
//     const token = selectToken(getState());
//     try {
//       const response = await axios.post(
//         "http://13.202.193.62:8085/group/saveGroupDetails",
//         { groupName, mobileNumber: mobileNumbers, status, isActive: "true" },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to save group details"
//       );
//     }
//   }
// );

// const groupSlice = createSlice({
//   name: "group",
//   initialState: {
//     groupName: "",
//     groupId: "",
//     mobileNumbers: [], // Array of phone numbers (optionally with country codes)
//     status: "null",
//     isFormVisible: false,
//     loading: false, // Track loading state
//     error: null, // Error message state
//   },
//   reducers: {
//     setGroupName: (state, action) => {
//       state.groupName = action.payload;
//     },
//     // addMobileNumber: (state, action) => {
//     //   const { number: phoneNumber } = action.payload;

//     //   state.mobileNumber.push(phoneNumber); // Adds a blank mobile number entry
//     // },
//     addMobileNumber: (state, action) => {
//       const { number: phoneNumber } = action.payload;
//       state.mobileNumbers.push({ phoneNumber }); // Fix: Now correctly adds an object with phoneNumber
//     },
//     // updateGroup:(state, action) =>{
//     //   return {...state, ...action.payload};
//     // }
//     removeMobileNumber: (state, action) => {
//       state.mobileNumbers.splice(action.payload, 1); // Remove by index
//     },
//     // setMobileNumber: (state, action) => {
//     //   const { index, number: phoneNumber } = action.payload;
//     //   debugger;
//     //   state.mobileNumbers[index] = {
//     //     ...state.mobileNumber[index],
//     //     phoneNumber,
//     //   }; // Ensure it stores the phone number
//     // },

//     setMobileNumber: (state, action) => {
//       const { index, number: phoneNumber } = action.payload;
//       state.mobileNumbers[index] = {
//         ...state.mobileNumbers[index], // Fix: Ensure the correct property is accessed
//         phoneNumber, // Update only the phone number, preserving other fields
//       };
//     },
//     setCountryCode: (state, action) => {
//       const { index, countryCode } = action.payload;
//       state.mobileNumbers[index] = {
//         ...state.mobileNumbers[index],
//         countryCode,
//       }; // Add or update country code
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     toggleFormVisibility: (state) => {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     resetForm: (state) => {
//       state.groupName = "";
//       state.mobileNumbers = [];
//       state.status = "Active";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveGroupDetails.pending, (state) => {
//         state.loading = true; // Set loading to true on form submission
//         state.error = null; // Clear previous error
//       })
//       .addCase(saveGroupDetails.fulfilled, (state) => {
//         state.groupName = "";
//         state.mobileNumbers = [];
//         state.status = "Active";
//         state.isFormVisible = false;
//         state.loading = false; // Reset loading state
//       })
//       .addCase(saveGroupDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Set error message
//       });
//   },
// });

// // Export all the action creators
// export const {
//   setGroupName,
//   addMobileNumber,
//   removeMobileNumber,
//   setMobileNumber,
//   setCountryCode,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
// } = groupSlice.actions;

// // Export selectors for accessing state in components
// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;
// export const selectIsFormVisible = (state) => state.group.isFormVisible;
// export const selectLoading = (state) => state.group.loading;
// export const selectError = (state) => state.group.error;

// export default groupSlice.reducer;



// main updated code ---------------------------

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { selectToken } from "../redux/authSlice";

// // Async thunk to save group details
// export const saveGroupDetails = createAsyncThunk(
//   "group/saveGroupDetails",
//   async (
//     { groupName, mobileNumbers, status },
//     { getState, rejectWithValue }
//   ) => {
//     const token = selectToken(getState());

//     try {
//       const response = await axios.post(
//         "http://13.202.193.62:8085/group/saveGroupDetails",
//         { groupName, mobileNumber: mobileNumbers, status, isActive: "true" },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to save group details"
//       );
//     }
//   }
// );

// const groupSlice = createSlice({
//   name: "group",
//   initialState: {
//     groupName: "",
//     groupId: "",
//     mobileNumbers: [],
//     status: "null",
//     isFormVisible: false,
//     loading: false, // Track loading state
//     error: null, // Error message state
//   },
//   reducers: {
//     setGroupName: (state, action) => {
//       state.groupName = action.payload;
//     },
//     addMobileNumber: (state, action) => {
//       const { number: phoneNumber } = action.payload;
//       state.mobileNumbers.push(phoneNumber); // Fix: Now correctly adds an object with phoneNumber
//     },
//     removeMobileNumber: (state, action) => {
//       state.mobileNumbers.splice(action.payload, 1);
//        // Remove by index
//     },
//     setMobileNumber: (state, action) => {
//       const { index, number: phoneNumber } = action.payload;
//       state.mobileNumbers[index] = {
//         ...state.mobileNumbers[index],
//         phoneNumber,
//       };
//     },
//     setCountryCode: (state, action) => {
//       const { index, countryCode } = action.payload;
//       state.mobileNumbers[index] = {
//         ...state.mobileNumbers[index],
//         countryCode,
//       };
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     toggleFormVisibility: (state) => {
//       state.isFormVisible = !state.isFormVisible;
//     },
//     resetForm: (state) => {
//       state.groupName = "";
//       state.mobileNumbers = [];
//       state.status = "Active";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveGroupDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveGroupDetails.fulfilled, (state) => {
//         state.groupName = "";
//         state.mobileNumbers = [];
//         state.status = "Active";
//         state.isFormVisible = false;
//         state.loading = false;
//       })
//       .addCase(saveGroupDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export all the action creators
// export const {
//   setGroupName,
//   addMobileNumber,
//   removeMobileNumber,
//   setMobileNumber,
//   setCountryCode,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
// } = groupSlice.actions;

// // Export selectors for accessing state in components
// export const selectGroupName = (state) => state.group.groupName;
// export const selectMobileNumbers = (state) => state.group.mobileNumbers;
// export const selectStatus = (state) => state.group.status;
// export const selectIsFormVisible = (state) => state.group.isFormVisible;
// export const selectLoading = (state) => state.group.loading;
// export const selectError = (state) => state.group.error;

// export default groupSlice.reducer;







import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../redux/authSlice";

// Async thunk to save group details
export const saveGroupDetails = createAsyncThunk(
  "group/saveGroupDetails",
  async ({ groupName, mobileNumbers, status }, { getState, rejectWithValue }) => {
    const token = selectToken(getState());

    try {
      const response = await axios.post(
        "http://13.202.193.62:8085/group/saveGroupDetails",
        {
          groupName,
          isActive: status === "Active",  // Convert status to isActive
          createdBy: 1,  // This should match the authenticated user or desired ID
          mobileNumber: mobileNumbers.map((number) => ({ mobileNumber: number })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save group details"
      );
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupName: "",
    groupId: "",
    mobileNumbers: [],  // This stores only the mobile numbers
    status: "Active",
    isFormVisible: false,
    loading: false,  // Track loading state
    error: null,  // Error message state
  },
  reducers: {
    setGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    addMobileNumber: (state, action) => {
      state.mobileNumbers.push(action.payload.number);  // Add only the number
    },
    removeMobileNumber: (state, action) => {
      state.mobileNumbers.splice(action.payload, 1);  // Remove by index
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleFormVisibility: (state) => {
      state.isFormVisible = !state.isFormVisible;
    },
    resetForm: (state) => {
      state.groupName = "";
      state.mobileNumbers = [];
      state.status = "Active";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveGroupDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveGroupDetails.fulfilled, (state) => {
        state.groupName = "";
        state.mobileNumbers = [];
        state.status = "Active";
        state.isFormVisible = false;
        state.loading = false;
      })
      .addCase(saveGroupDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setGroupName,
  addMobileNumber,
  removeMobileNumber,
  setStatus,
  toggleFormVisibility,
  resetForm,
} = groupSlice.actions;

export const selectGroupName = (state) => state.group.groupName;
export const selectMobileNumbers = (state) => state.group.mobileNumbers;
export const selectStatus = (state) => state.group.status;
export const selectIsFormVisible = (state) => state.group.isFormVisible;

export default groupSlice.reducer;


