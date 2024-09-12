


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

import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groupName: '',
    mobileNumbers: [],
    status: 'Active',
    isFormVisible: false,
  },
  reducers: {
    setGroupName: (state, action) => {
      state.groupName = action.payload;
    },
    setMobileNumber: (state, action) => {
      const { index, number } = action.payload;
      state.mobileNumbers[index].number = number;
    },
    setCountryCode: (state, action) => {
      const { index, countryCode } = action.payload;
      state.mobileNumbers[index].countryCode = countryCode;
    },
    addMobileNumber: (state) => {
      state.mobileNumbers.push({ countryCode: '', number: '' });
    },
    removeMobileNumber: (state, action) => {
      state.mobileNumbers.splice(action.payload, 1);  
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    toggleFormVisibility: (state) => {
      state.isFormVisible = !state.isFormVisible;
    },
    resetForm: (state) => {
      state.groupName = '';
      state.mobileNumbers = [];
      state.status = 'Active';
    },
  },
});

export const {
  setGroupName,
  setMobileNumber,
  setCountryCode,
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



