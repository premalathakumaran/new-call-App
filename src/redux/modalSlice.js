
// UPDATED CODE 3-------------------------------------------Final

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isOpen: false,
//   isEditing: false,
//   person: null,
//   formData: {
//     name: '',
//     phone: '',
//     status: 'Active',
//   },
// };

// const modalSlice = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       state.isOpen = true;
//       state.person = action.payload;
//       state.formData = {
//         name: action.payload?.name || '',
//         phone: action.payload?.phone || '',
//         status: action.payload?.status || 'Active',
//       };
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//       state.person = null;
//       state.formData = {
//         name: '',
//         phone: '',
//         status: 'Active',
//       };
//     },
//     updateFormData: (state, action) => {
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     savePerson: (state) => {
//       if (state.person) {
//         // Here you could handle saving the updated person data, e.g., sending it to an API.
//         state.person = { ...state.person, ...state.formData };
//       }
//     },
//     setEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//     addPhone: (state, action) => {
//       if (state.person) {
//         state.person.phones = [...(state.person.phones || []), action.payload];
//       }
//     },
//     editPhone: (state, action) => {
//       if (state.person) {
//         const updatedPhones = state.person.phones.map(phone =>
//           phone === action.payload.oldPhone ? action.payload.newPhone : phone
//         );
//         state.person.phones = updatedPhones;
//       }
//     },
//     deletePhone: (state, action) => {
//       if (state.person) {
//         state.person.phones = state.person.phones.filter(phone => phone !== action.payload);
//       }
//     },
//   },
// });

// export const { openModal, closeModal, updateFormData, savePerson, setEditing, addPhone, editPhone, deletePhone } = modalSlice.actions;

// export default modalSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    person: null,
    formData: {
      name: '',
      phone: '',
      status: '',
      phones: [],
    },
    isEditing: false,
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.person = action.payload.person || null; // Default to null if person is not provided
      state.formData = {
        ...state.formData,
        ...action.payload.formData, // Merge formData from action payload
      };
      state.isEditing = action.payload.isEditing || false; // Default to false if isEditing is not provided
    },
    closeModal(state) {
      state.isOpen = false;
    },
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload, // Merge updates into existing formData
      };
    },
    savePerson() {
      // Logic for saving the person data
      // This might involve making an API call or dispatching another action
    },
    setEditing(state, action) {
      state.isEditing = action.payload; // Set editing status
    },
  },
});

export const { openModal, closeModal, updateFormData, savePerson, setEditing } = modalSlice.actions;

export default modalSlice.reducer;
