


// the most main code -----------------------------
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

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

// // // Update (edit) group details
// export const updateGroupDetails = createAsyncThunk(
//   'group/updateGroupDetails',
//   async ({ formData }, { rejectWithValue }) => {

//     try {
//       const token = localStorage.getItem('jwt');
//       if (!token) throw new Error('No token found');

//       const response = await axios.post(
//         'http://13.202.193.62:8085/group/updateGroupDetailsById',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update group details'
//       );
//     }
//     // export { updateGroupDetails };
//   }
// );
// // export const updateGroupDetails = createAsyncThunk(
// //   'group/updateGroupDetails',
// //   async ({ formData, token }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         'http://13.202.193.62:8085/group/updateGroupDetailsById',
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || 'Failed to update group details'
// //       );
// //     }
// //   }
// // );




// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   "table/deleteGroup",
//   async ({ groupId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       if (!token) throw new Error("No token found");

//       await axios.post(
//         `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
//         {},
//         {
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

// // Delete a phone number
// export const deletePhone = createAsyncThunk(
//   "table/deletePhone",
//   async ({ phoneId, groupId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       if (!token) throw new Error("No token found");

//       const url = `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`;
//       await axios.post(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return { phoneId, groupId }; // Return phoneId and groupId to identify which phone was deleted
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete phone number"
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
//     groupDetails: null, // Added for editing purposes
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
//         const phoneIndex = person.phones?.findIndex((phone) => phone.id === oldPhone.id); // Find index of the phone to update
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { phoneId, groupId } = action.payload;
//       const person = state.data.find((person) => person.id === groupId);
//       if (person) {
//         if (person.phones) {
//           person.phones = person.phones.filter((phone) => phone.id !== phoneId);
//         }
//       }
//     },
//     setGroupDetailsForEdit: (state, action) => {
//       state.groupDetails = action.payload; // Set group details for editing
//     },
//     resetEditState: (state) => {
//       state.groupDetails = null; // Clear group details after editing
//       state.status = "idle"; // Reset status
//       state.error = null; // Clear errors
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch table data
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

//       // Fetch group details
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

//       // Update group details (edit functionality)
//       .addCase(updateGroupDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       // .addCase(updateGroupDetails.fulfilled, (state, action) => {
//       //   state.status = "succeeded";
//       //   const updatedGroup = action.payload;
//       //   // Update the corresponding group in the state
//       //   state.data = state.data.map((group) =>
//       //     group.id === updatedGroup.id ? updatedGroup : group
//       //   );
//       //   state.groupDetails = null; // Clear group details after a successful update
//       // })
//       .addCase(updateGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const updatedGroup = action.payload;
//         state.data = state.data.map((group) =>
//           group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
//         );
//       })
      
//       .addCase(updateGroupDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete group
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete phone number
//       .addCase(deletePhone.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deletePhone.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const { phoneId, groupId } = action.payload;
//         // console.log("phoneid", phoneId)
//         // console.log("phoneid", groupId)
//         // Update the corresponding person's phones in the state
//         state.data = state.data.map((group) => {
//           if (group.id === groupId) {
//             return {
//               ...group,
//               phones: group.phones?.filter((phone) => phone.id !== phoneId) || [],
//             };
//           }
//           return group;
//         });
//       })
//       .addCase(deletePhone.rejected, (state, action) => {
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
//   setGroupDetailsForEdit,
//   resetEditState,
  
// } = tableSlice.actions;

// export default tableSlice.reducer;






// checking code for fetch the data --------------resolve all error code  final code -----------------------------------

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

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

// // // Update (edit) group details
// export const updateGroupDetails = createAsyncThunk(
//   'group/updateGroupDetails',
//   async ({ formData }, { rejectWithValue }) => {

//     try {
//       const token = localStorage.getItem('jwt');
//       if (!token) throw new Error('No token found');

//       const response = await axios.post(
//         'http://13.202.193.62:8085/group/updateGroupDetailsById',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update group details'
//       );
//     }
//     // export { updateGroupDetails };
//   }
// );
// // export const updateGroupDetails = createAsyncThunk(
// //   'group/updateGroupDetails',
// //   async ({ formData, token }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         'http://13.202.193.62:8085/group/updateGroupDetailsById',
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data?.message || 'Failed to update group details'
// //       );
// //     }
// //   }
// // );




// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   "table/deleteGroup",
//   async ({ groupId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       if (!token) throw new Error("No token found");

//       await axios.post(
//         `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
//         {},
//         {
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

// // Delete a phone number
// export const deletePhone = createAsyncThunk(
//   "table/deletePhone",
//   async ({ phoneId, groupId }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       if (!token) throw new Error("No token found");

//       const url = `http://13.202.193.62:8085/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`;
//       await axios.post(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return { phoneId, groupId }; // Return phoneId and groupId to identify which phone was deleted
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete phone number"
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
//     groupDetails: null, // Added for editing purposes
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
//         const phoneIndex = person.phones?.findIndex((phone) => phone.id === oldPhone.id); // Find index of the phone to update
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { phoneId, groupId } = action.payload;
//       const person = state.data.find((person) => person.id === groupId);
//       if (person) {
//         if (person.phones) {
//           person.phones = person.phones.filter((phone) => phone.id !== phoneId);
//         }
//       }
//     },
//     setGroupDetailsForEdit: (state, action) => {
//       state.groupDetails = action.payload; // Set group details for editing
//     },
//     resetEditState: (state) => {
//       state.groupDetails = null; // Clear group details after editing
//       state.status = "idle"; // Reset status
//       state.error = null; // Clear errors
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch table data
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

//       // Fetch group details
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

//       // Update group details (edit functionality)
//       .addCase(updateGroupDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       // .addCase(updateGroupDetails.fulfilled, (state, action) => {
//       //   state.status = "succeeded";
//       //   const updatedGroup = action.payload;
//       //   // Update the corresponding group in the state
//       //   state.data = state.data.map((group) =>
//       //     group.id === updatedGroup.id ? updatedGroup : group
//       //   );
//       //   state.groupDetails = null; // Clear group details after a successful update
//       // })
//       .addCase(updateGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const updatedGroup = action.payload;
//         state.data = state.data.map((group) =>
//           group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
//         );
//       })
      
//       .addCase(updateGroupDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete group
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete phone number
//       .addCase(deletePhone.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deletePhone.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const { phoneId, groupId } = action.payload;
//         // console.log("phoneid", phoneId)
//         // console.log("phoneid", groupId)
//         // Update the corresponding person's phones in the state
//         state.data = state.data.map((group) => {
//           if (group.id === groupId) {
//             return {
//               ...group,
//               phones: group.phones?.filter((phone) => phone.id !== phoneId) || [],
//             };
//           }
//           return group;
//         });
//       })
//       .addCase(deletePhone.rejected, (state, action) => {
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
//   setGroupDetailsForEdit,
//   resetEditState,
  
// } = tableSlice.actions;

// export default tableSlice.reducer;







// refresh token ------------------------------

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { refreshToken } from "../redux/authSlice"; // Import the refreshToken function

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (_, { rejectWithValue, dispatch }) => {
//     let token = localStorage.getItem('jwt');

//     if (!token) {
//       return rejectWithValue('No token found');
//     }

//     try {
//       const response = await axios.get(
//         'http://13.127.211.81:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data; // Adjust according to your API's response structure
//     } catch (error) {
//       // Handle token expiration (401 error)
//       if (error.response && error.response.status === 401) {
//         const newToken = await dispatch(refreshToken()); // Refresh the token
//         if (newToken.payload) { // Check if the new token was successfully fetched
//           // Retry the original request with the new token
//           const retryResponse = await axios.get(
//             'http://13.127.211.81:8085/group/getGroupDetails',
//             {
//               headers: {
//                 Authorization: `Bearer ${newToken.payload}`,
//               },
//             }
//           );
//           return retryResponse.data.data; // Return the new data
//         } else {
//           return rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       // Log other errors
//       console.error('Fetch table data error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch table data'
//       );
//     }
//   }
// );





// // Fetch group details using the token
// export const fetchGroupDetails = createAsyncThunk(
//   "table/fetchGroupDetails",
//   async (groupId, { rejectWithValue, dispatch }) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const response = await axios.get(
//         `http://13.127.211.81:8085/group/getGroupDetailsById?groupId=${groupId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       // Handle token expiration (401 error)
//       if (error.response && error.response.status === 401) {
//         const newToken = await dispatch(refreshToken()); // Refresh the token
//         if (newToken.payload) { // Check if the new token was successfully fetched
//           // Retry the original request with the new token
//           const retryResponse = await axios.get(
//             `http://13.127.211.81:8085/group/getGroupDetailsById?groupId=${groupId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${newToken.payload}`,
//               },
//             }
//           );
//           return retryResponse.data; // Return the new data
//         } else {
//           return rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch group details"
//       );
//     }
//   }
// );

// // Update (edit) group details
// export const updateGroupDetails = createAsyncThunk(
//   'group/updateGroupDetails',
//   async ({ formData }, { rejectWithValue }) => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const response = await axios.post(
//         'http://13.127.211.81:8085/group/updateGroupDetailsById',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update group details'
//       );
//     }
//   }
// );

// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   "table/deleteGroup",
//   async ({ groupId }, { rejectWithValue }) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       await axios.post(
//         `http://13.127.211.81:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return groupId; // Return the ID of the deleted group to remove from state
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete group"
//       );
//     }
//   }
// );

// // Delete a phone number
// export const deletePhone = createAsyncThunk(
//   "table/deletePhone",
//   async ({ phoneId, groupId }, { rejectWithValue, dispatch }) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const url = `http://13.127.211.81:8085/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`;
//       await axios.post(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Fetch updated group details after deletion
//       await dispatch(fetchGroupDetails(groupId));

//       return { phoneId, groupId };
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete phone number"
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
//     groupDetails: null, // Added for editing purposes
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     // addPhoneNumber: (state, action) => {
//     //   const { id, phone } = action.payload;
//     //   const person = state.data.find((person) => person.id === id);
//     //   if (person) {
//     //     if (!person.phones) person.phones = []; // Ensure phones is defined
//     //     person.phones.push(phone);
//     //   }
//     // },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((person) => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.findIndex((phone) => phone.id === oldPhone.id);
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { phoneId, groupId } = action.payload;
//       const person = state.data.find((person) => person.id === groupId);
//       if (person) {
//         if (person.phones) {
//           person.phones = person.phones.filter((phone) => phone.id !== phoneId);
//         }
//       }
//     },
//     setGroupDetailsForEdit: (state, action) => {
//       state.groupDetails = action.payload; // Set group details for editing
//     },
//     resetEditState: (state) => {
//       state.groupDetails = null; // Clear group details after editing
//       state.status = "idle"; // Reset status
//       state.error = null; // Clear errors
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch table data
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

//       // Fetch group details
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

//       // Update group details (edit functionality)
//       .addCase(updateGroupDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const updatedGroup = action.payload;
//         state.data = state.data.map((group) =>
//           group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
//         );
//       })
//       .addCase(updateGroupDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete a group
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = state.data.filter((group) => group.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete a phone number
//       // Update the deletePhone cases
//       .addCase(deletePhone.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deletePhone.fulfilled, (state, action) => {
//         const { phoneId, groupId } = action.payload;
//         state.status = "succeeded";
        
//         // Update the selectedPerson state
//         if (state.selectedPerson && state.selectedPerson.data.groupId === groupId) {
//           state.selectedPerson.data.mobileNumbers = state.selectedPerson.data.mobileNumbers.filter(
//             (phone) => phone.groupDetailsId !== phoneId
//           );
//         }

//         // Update the main data state
//         const groupIndex = state.data.findIndex(group => group.id === groupId);
//         if (groupIndex !== -1) {
//           state.data[groupIndex].phones = state.data[groupIndex].phones.filter(
//             (phone) => phone.id !== phoneId
//           );
//         }
//       })
//       .addCase(deletePhone.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });


// export const {
//   clearSelectedPerson,
//   // addPhoneNumber,
//   updatePhoneNumber,
//   deletePhoneNumber,
//   setGroupDetailsForEdit,
//   resetEditState,
// } = tableSlice.actions;

// export default tableSlice.reducer;





// sample tryin code -----------------


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { refreshToken } from "../redux/authSlice"; // Import the refreshToken function

// // Fetch table data
// export const fetchTableData = createAsyncThunk(
//   'table/fetchTableData',
//   async (_, { rejectWithValue, dispatch }) => {
//     let token = localStorage.getItem('jwt');

//     if (!token) {
//       return rejectWithValue('No token found');
//     }

//     try {
//       const response = await axios.get(
//         'http://13.202.135.240:8085/group/getGroupDetails',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("data", response.data.data )
//       return response.data.data; 
      
    
//       // Adjust according to your API's response structure
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         const newToken = await dispatch(refreshToken());
//         if (newToken.payload) {
//           const retryResponse = await axios.get(
//             'http://13.202.135.240:8085/group/getGroupDetails',
//             {
//               headers: {
//                 Authorization: `Bearer ${newToken.payload}`,
//               },
//             }
//           );
//           return retryResponse.data.data;
//         } else {
//           return rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       console.error('Fetch table data error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch table data'
//       );
//     }
//   }
// );

// // Fetch group details by ID
// export const fetchGroupDetails = createAsyncThunk(
//   "table/fetchGroupDetails",
//   async (groupId, { rejectWithValue, dispatch }) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const response = await axios.get(
//         `http://13.202.135.240:8085/group/getGroupDetailsById?groupId=${groupId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         const newToken = await dispatch(refreshToken());
//         if (newToken.payload) {
//           const retryResponse = await axios.get(
//             `http://13.202.135.240:8085/group/getGroupDetailsById?groupId=${groupId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${newToken.payload}`,
//               },
//             }
//           );
//           return retryResponse.data;
//         } else {
//           return rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch group details"
//       );
//     }
//   }
// );

// // Update group details
// export const updateGroupDetails = createAsyncThunk(
//   'group/updateGroupDetails',
//   async ({ formData }, { rejectWithValue }) => {
//     console.log("groupid", formData)
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const response = await axios.post(
//         'http://13.202.135.240:8085/group/updateGroupDetailsById',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to update group details'
//       );
//     }
//   }
// );

// // Delete a group
// export const deleteGroup = createAsyncThunk(
//   "table/deleteGroup",
//   async ({ groupId }, { rejectWithValue }) => {
    
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       await axios.post(
//         `http://13.202.135.240:8085/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return groupId;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete group"
//       );
//     }
//   }
// );

// // Delete a phone number
// export const deletePhone = createAsyncThunk(
//   "table/deletePhone",
//   async ({ phoneId, groupId }, { rejectWithValue, dispatch }) => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       return rejectWithValue("No token found");
//     }

//     try {
//       const url = `http://13.202.135.240:8085/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`;
//       await axios.post(url, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       await dispatch(fetchGroupDetails(groupId));

//       return { phoneId, groupId };
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete phone number"
//       );
//     }
//   }
// );



// export const regenerateGroupCode = createAsyncThunk(
//   'table/regenerateGroupCode',
//   async ({ groupId, token }, { rejectWithValue, dispatch }) => {
//     if (!token) {
//       return rejectWithValue('No token found');
//     }

//     try {
//       const response = await axios.put(
//         `http://13.202.135.240:8085/group/updateGroupCodeByGroupId?groupId=${groupId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         const newToken = await dispatch(refreshToken());
//         if (newToken.payload) {
//           const retryResponse = await axios.put(
//             `http://13.202.135.240:8085/group/updateGroupCodeByGroupId?groupId=${groupId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${newToken.payload}`,
//               },
//             }
//           );
//           return retryResponse.data.data;
//         } else {
//           return rejectWithValue('Session expired. Please log in again.');
//         }
//       }
//       console.error('Regenerate group code error:', error);
//       return rejectWithValue(
//         error.response?.data?.message || 'Failed to regenerate group code'
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
//     groupDetails: null,
//   },
//   reducers: {
//     clearSelectedPerson: (state) => {
//       state.selectedPerson = null;
//     },
//     updatePhoneNumber: (state, action) => {
//       const { id, oldPhone, newPhone } = action.payload;
//       const person = state.data.find((person) => person.id === id);
//       if (person) {
//         const phoneIndex = person.phones?.findIndex((phone) => phone.id === oldPhone.id);
//         if (phoneIndex > -1) {
//           person.phones[phoneIndex] = newPhone;
//         }
//       }
//     },
//     deletePhoneNumber: (state, action) => {
//       const { phoneId, groupId } = action.payload;
//       const person = state.data.find((person) => person.id === groupId);
//       if (person) {
//         if (person.phones) {
//           person.phones = person.phones.filter((phone) => phone.id !== phoneId);
//         }
//       }
//     },
//     setGroupDetailsForEdit: (state, action) => {
//       state.groupDetails = action.payload;
//     },
//     resetEditState: (state) => {
//       state.groupDetails = null;
//       state.status = "idle";
//       state.error = null;
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
//       .addCase(updateGroupDetails.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateGroupDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const updatedGroup = action.payload;
//         state.data = state.data.map((group) =>
//           group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
//         );
//       })
//       .addCase(updateGroupDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(deleteGroup.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteGroup.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = state.data.filter((group) => group.id !== action.payload);
//       })
//       .addCase(deleteGroup.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
      
//       .addCase(deletePhone.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deletePhone.fulfilled, (state, action) => {
//         const { phoneId, groupId } = action.payload;
//         state.status = "succeeded";
//         if (state.selectedPerson && state.selectedPerson.data.groupId === groupId) {
//           state.selectedPerson.data.mobileNumbers = state.selectedPerson.data.mobileNumbers.filter(
//             (phone) => phone.groupDetailsId !== phoneId
//           );
//         }
//         const groupIndex = state.data.findIndex(group => group.id === groupId);
//         if (groupIndex > -1) {
//           const phoneIndex = state.data[groupIndex].mobileNumbers.findIndex(phone => phone.groupDetailsId === phoneId);
//           if (phoneIndex > -1) {
//             state.data[groupIndex].mobileNumbers.splice(phoneIndex, 1);
//           }
//         }
//       })
//       .addCase(deletePhone.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(regenerateGroupCode.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(regenerateGroupCode.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const updatedGroup = action.payload;
//         state.data = state.data.map((group) =>
//           group.groupId === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
//         );
//       })
//       .addCase(regenerateGroupCode.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
      
      
//   },
// });

// // Export actions
// export const { clearSelectedPerson, updatePhoneNumber, deletePhoneNumber, setGroupDetailsForEdit, resetEditState } = tableSlice.actions;

// // Export selectors
// export const selectTableData = (state) => state.table.data;
// export const selectGroupDetails = (state) => state.table.selectedPerson;
// export const selectTableStatus = (state) => state.table.status;
// export const selectTableError = (state) => state.table.error;
// export const selectEditGroupDetails = (state) => state.table.groupDetails;

// export default tableSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshToken } from "../redux/authSlice"; // Import the refreshToken function

// Define the base URL and getToken function for reuse
const BASE_URL = "https://www.annulartech.net";


// const BASE_URL = "http://13.202.135.240:8085";
const getToken = () => localStorage.getItem("jwt");

const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch table data
export const fetchTableData = createAsyncThunk(
  "table/fetchTableData",
  async (_, { rejectWithValue, dispatch }) => {
    let token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/group/getGroupDetails`,
        getAuthHeaders(token)
      );
      return response.data.data; // Adjust according to your API's response structure
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await dispatch(refreshToken());
        if (newToken.payload) {
          const retryResponse = await axios.get(
            `${BASE_URL}/group/getGroupDetails`,
            getAuthHeaders(newToken.payload)
          );
          return retryResponse.data.data;
        }
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch table data"
      );
    }
  }
);

// Fetch group details by ID
export const fetchGroupDetails = createAsyncThunk(
  "table/fetchGroupDetails",
  async (groupId, { rejectWithValue, dispatch }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/group/getGroupDetailsById?groupId=${groupId}`,
        getAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await dispatch(refreshToken());
        if (newToken.payload) {
          const retryResponse = await axios.get(
            `${BASE_URL}/group/getGroupDetailsById?groupId=${groupId}`,
            getAuthHeaders(newToken.payload)
          );
          return retryResponse.data;
        }
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch group details"
      );
    }
  }
);

// Update group details
export const updateGroupDetails = createAsyncThunk(
  "group/updateGroupDetails",
  async ({ formData }, { rejectWithValue }) => {
    const token = getToken();
    console.log("formData", formData)
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/group/updateGroupDetailsById`,
        formData,
        getAuthHeaders(token)
      );
      // console.log("response.data.data", response.data.data)
      return response.data.data;
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
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      await axios.post(
        `${BASE_URL}/group/deleteGroupAndGroupDetails?flag=0&groupId=${groupId}`,
        {},
        getAuthHeaders(token)
      );
      return groupId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete group"
      );
    }
  }
);

// Delete a phone number
export const deletePhone = createAsyncThunk(
  "table/deletePhone",
  async ({ phoneId, groupId }, { rejectWithValue, dispatch }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      await axios.post(
        `${BASE_URL}/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`,
        {},
        getAuthHeaders(token)
      );
      await dispatch(fetchGroupDetails(groupId));
      return { phoneId, groupId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete phone number"
      );
    }
  }
);

// Regenerate group code
export const regenerateGroupCode = createAsyncThunk(
  "table/regenerateGroupCode",
  async ({ groupId }, { rejectWithValue, dispatch }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/group/updateGroupCodeByGroupId?groupId=${groupId}`,
        {},
        getAuthHeaders(token)
      );
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await dispatch(refreshToken());
        if (newToken.payload) {
          const retryResponse = await axios.put(
            `${BASE_URL}/group/updateGroupCodeByGroupId?groupId=${groupId}`,
            {},
            getAuthHeaders(newToken.payload)
          );
          return retryResponse.data.data;
        }
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to regenerate group code"
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
    groupDetails: null,
  },
  reducers: {
    clearSelectedPerson: (state) => {
      state.selectedPerson = null;
    },
    updatePhoneNumber: (state, action) => {
      const { id, oldPhone, newPhone } = action.payload;
      const person = state.data.find((person) => person.id === id);
      if (person) {
        const phoneIndex = person.phones?.findIndex((phone) => phone.id === oldPhone.id);
        if (phoneIndex > -1) {
          person.phones[phoneIndex] = newPhone;
        }
      }
    },
    // deletePhoneNumber: (state, action) => {
    //   const { phoneId, groupId } = action.payload;
    //   const person = state.data.find((person) => person.id === groupId);
    //   if (person && person.phones) {
    //     person.phones = person.phones.filter((phone) => phone.id !== phoneId);
    //   }
    // },
    setGroupDetailsForEdit: (state, action) => {
      state.groupDetails = action.payload;
    },
    resetEditState: (state) => {
      state.groupDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(updateGroupDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGroupDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedGroup = action.payload;
        state.data = state.data.map((group) =>
          group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
        );
      })
      .addCase(updateGroupDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter((group) => group.id !== action.payload);
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePhone.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePhone.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { phoneId, groupId } = action.payload;
        const group = state.data.find((group) => group.id === groupId);
        if (group && group.phones) {
          group.phones = group.phones.filter((phone) => phone.id !== phoneId);
        }
      })
      .addCase(deletePhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(regenerateGroupCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(regenerateGroupCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedGroup = action.payload;
        state.data = state.data.map((group) =>
          group.id === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
        );
      })
      .addCase(regenerateGroupCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedPerson,
  updatePhoneNumber,
  deletePhoneNumber,
  setGroupDetailsForEdit,
  resetEditState,
} = tableSlice.actions;

export default tableSlice.reducer;
