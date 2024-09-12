

// modalSlice.js --------------any error occurse use this code ------------------main code for that ----------------------------------------

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
//       // Save person logic here
//     },
//     setEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//   },
// });

// export const { openModal, closeModal, updateFormData, savePerson, setEditing } = modalSlice.actions;

// export default modalSlice.reducer;








// main line of code ------------------- main code i am using now for good source -----------UPDATED CODE 1--------------------------------------

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
//       // Save person logic here
//     },
//     setEditing: (state, action) => {
//       state.isEditing = action.payload;
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

// export const { openModal, closeModal, updateFormData, savePerson, setEditing, editPhone, deletePhone } = modalSlice.actions;

// export default modalSlice.reducer;




// try this code  when use did not use api for delete and edit ---------------------

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
//   loading: false,
//   error: null,
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
//       state.isEditing = !!action.payload; // Set editing state based on whether the payload exists
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//       state.person = null;
//       state.formData = {
//         name: '',
//         phone: '',
//         status: 'Active',
//       };
//       state.isEditing = false; // Reset editing state when the modal is closed
//     },
//     updateFormData: (state, action) => {
//       state.formData = { ...state.formData, ...action.payload };
//     },
//     savePersonStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     savePersonSuccess: (state, action) => {
//       state.loading = false;
//       state.person = action.payload; // Update person data
//       state.isOpen = false; // Close modal after saving
//       state.isEditing = false; // Reset editing state
//       state.formData = { name: '', phone: '', status: 'Active' }; // Clear formData after saving
//     },
//     savePersonFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload; // Capture error message
//     },
//     setEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//     editPhone: (state, action) => {
//       if (state.person) {
//         const updatedPhones = state.person.phones.map(phone =>
//           phone === action.payload.oldPhone ? action.payload.newPhone : phone
//         );
//         state.person.phones = updatedPhones;
//         state.formData.phone = ''; // Clear selected phone in formData after editing
//       }
//     },
//     deletePhone: (state, action) => {
//       if (state.person) {
//         state.person.phones = state.person.phones.filter(phone => phone !== action.payload);
//         state.formData.phone = ''; // Clear selected phone in formData after deletion
//       }
//     },
//   },
// });

// export const {
//   openModal,
//   closeModal,
//   updateFormData,
//   savePersonStart,
//   savePersonSuccess,
//   savePersonFailure,
//   setEditing,
//   editPhone,
//   deletePhone,
// } = modalSlice.actions;

// export default modalSlice.reducer;




// main code file for trying ------------UPDATED CODE 2 -------------------------

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
//    savePerson: (state) => {
//     },
//     setEditing: (state, action) => {
//       state.isEditing = action.payload;
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

// export const { openModal, closeModal, updateFormData, savePerson, setEditing, editPhone, deletePhone } = modalSlice.actions;

// export default modalSlice.reducer;



// UPDATED CODE 3-------------------------------------------Final

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isEditing: false,
  person: null,
  formData: {
    name: '',
    phone: '',
    status: 'Active',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.person = action.payload;
      state.formData = {
        name: action.payload?.name || '',
        phone: action.payload?.phone || '',
        status: action.payload?.status || 'Active',
      };
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.person = null;
      state.formData = {
        name: '',
        phone: '',
        status: 'Active',
      };
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    savePerson: (state) => {
      if (state.person) {
        // Here you could handle saving the updated person data, e.g., sending it to an API.
        state.person = { ...state.person, ...state.formData };
      }
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    addPhone: (state, action) => {
      if (state.person) {
        state.person.phones = [...(state.person.phones || []), action.payload];
      }
    },
    editPhone: (state, action) => {
      if (state.person) {
        const updatedPhones = state.person.phones.map(phone =>
          phone === action.payload.oldPhone ? action.payload.newPhone : phone
        );
        state.person.phones = updatedPhones;
      }
    },
    deletePhone: (state, action) => {
      if (state.person) {
        state.person.phones = state.person.phones.filter(phone => phone !== action.payload);
      }
    },
  },
});

export const { openModal, closeModal, updateFormData, savePerson, setEditing, addPhone, editPhone, deletePhone } = modalSlice.actions;

export default modalSlice.reducer;
