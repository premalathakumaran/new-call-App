

// this is the second most most importan code to remove duplicate adding numbers..........................
// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Add FaEdit and FaSave icons
// import { useDispatch, useSelector } from "react-redux";
// import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person: selectedPerson,
//   onSave, // onSave prop passed from parent component
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [addedPhones, setAddedPhones] = useState([]);
//   const [editingPhone, setEditingPhone] = useState(null); // Track which phone is being edited
//   const [editPhoneValue, setEditPhoneValue] = useState(""); // Track edited phone value

//   // Initialize formData state
//   const [formState, setFormState] = useState(formData);

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   useEffect(() => {
//     // Sync local form state with updated formData prop
//     setFormState(formData);
//   }, [formData]);

//   if (!isOpen) return null;

//   // Add phone number to the table without form submission
//   const handleAddPhone = () => {
//     if (phoneNumber) {
//       // Check if the phone number already exists in addedPhones or existing phones
//       const phoneExists = [
//         ...formState?.data?.mobileNumbers,
//         ...addedPhones,
//       ].some((p) => p.mobileNumber === phoneNumber);

//       // Add phone number only if it does not exist
//       if (!phoneExists) {
//         setAddedPhones((prevPhones) => [
//           ...prevPhones,
//           { mobileNumber: phoneNumber },
//         ]);
//       }
//       setPhoneNumber(""); // Clear input field after adding
//     }
//   };


//   // Delete phone number (existing or newly added)
//   const handleDeletePhone = (phone) => {
//     if (phone.groupDetailsId) {
//       // Handle deletion for existing phones
//       const { data } = selectedPerson;
//       dispatch(
//         deletePhone({
//           phoneId: phone.groupDetailsId,
//           groupId: data?.groupId,
//         })
//       );
//     } else {
//       // Handle deletion for newly added phones
//       setAddedPhones(addedPhones.filter((p) => p.mobileNumber !== phone.mobileNumber));
//     }
//   };



//   // Enable editing for a specific phone
//   const handleEditPhone = (phone) => {
//     setEditingPhone(phone.mobileNumber); // Track which phone is being edited
//     setEditPhoneValue(phone.mobileNumber); // Set the current value to edit
//   };

//   // Save the updated phone number
//   const handleSaveEditedPhone = (phone) => {
//     // Clone the formState object to avoid directly mutating it
//     const updatedFormState = {
//       ...formState, 
//       data: { ...formState.data }
//     };

//     if (phone.groupDetailsId) {
//       // Update the mobileNumbers array immutably
//       const updatedPhones = updatedFormState.data.mobileNumbers.map((p) =>
//         p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//       );
//       updatedFormState.data.mobileNumbers = updatedPhones; // Assign the updated phones back to the copied object
//     } else {
//       // Update addedPhones immutably
//       const updatedAddedPhones = addedPhones.map((p) =>
//         p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//       );
//       setAddedPhones(updatedAddedPhones); // Update the state with new phone values
//     }

//     // Update the form state with the modified form data
//     setFormState(updatedFormState);
//     setEditingPhone(null); // Stop editing after saving
//   };



//   const handleSave = () => {
//     // Combine existing and newly added phones
//     const allPhones = [
//       ...formState?.data?.mobileNumbers.map(({ groupDetailsId, mobileNumber }) => ({ groupDetailsId, mobileNumber })),
//       ...addedPhones, // Add newly added phone numbers
//     ];

//     // Remove duplicates based on mobileNumber
//     const uniquePhones = Array.from(
//       new Map(allPhones.map((phone) => [phone.mobileNumber, phone])).values()
//     );

//     const updateFormData = {
//       groupId: formState?.data?.groupId,
//       groupName: groupName,
//       isActive: formState?.data?.groupStatus === "Active", // Ensure this is a boolean
//       mobileNumber: uniquePhones, // Use unique phones
//       // updatedBy: 1, // Add these if required
//       // createdBy: 1,
//     };

//     // Dispatch the update action
//     dispatch(updateGroupDetails({ formData: updateFormData }));

//     // Call onSave to notify parent component
//     if (onSave) {
//       onSave(updateFormData); // Notify parent after saving
//     }
//   };
  

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
//           &times;
//         </button>

//         {isEditing && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave(); // Call handleSave on form submit
//               }}
//               className="space-y-6"
//             >
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={groupName}
//                   onChange={({ target: { value } }) => setGroupName(value)}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     name="newPhoneNumber"
//                     value={phoneNumber}
//                     onChange={({ target: { value } }) => setPhoneNumber(value)}
//                     className="border border-gray-300 rounded-lg p-3 w-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddPhone}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>

//               {/* <div>
//                 <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
//                 {formState?.data?.mobileNumbers?.length > 0 || addedPhones.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         ...formState?.data?.mobileNumbers,
//                         ...addedPhones,
//                       ]
//                         .filter((phone, index, self) =>
//                           index === self.findIndex((p) => p.mobileNumber === phone.mobileNumber)
//                         )
//                         .map((phone, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="p-3">
//                               {editingPhone === phone.mobileNumber ? (
//                                 <input
//                                   type="text"
//                                   value={editPhoneValue}
//                                   onChange={({ target: { value } }) => setEditPhoneValue(value)}
//                                   className="border border-gray-300 rounded-lg p-3 w-full"
//                                 />
//                               ) : (
//                                 phone.mobileNumber
//                               )}
//                             </td>
//                             <td className="p-3 flex space-x-2">
//                               {editingPhone === phone.mobileNumber ? (
//                                 <button
//                                   type="button" // Ensure this button does not submit the form
//                                   onClick={() => handleSaveEditedPhone(phone)}
//                                   className="text-green-500 hover:text-green-600"
//                                 >
//                                   <FaSave />
//                                 </button>
//                               ) : (
//                                 <button
//                                   type="button" // Ensure this button does not submit the form
//                                   onClick={() => handleEditPhone(phone)}
//                                   className="text-blue-500 hover:text-blue-600"
//                                 >
//                                   <FaEdit />
//                                 </button>
//                               )}
//                               <button
//                                 type="button" // Ensure this button does not submit the form
//                                 onClick={() => handleDeletePhone(phone)}
//                                 className="text-red-500 hover:text-red-600"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p>No phone numbers added.</p>
//                 )}
//               </div> */}

// <div>
//       <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
//       {formState?.data?.mobileNumbers?.length > 0 || addedPhones.length > 0 ? (
//         <div className="overflow-auto" style={{ maxHeight: '200px' }}>
//           <table className="w-full border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left">Mobile Number</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 ...formState?.data?.mobileNumbers,
//                 ...addedPhones,
//               ]
//                 .filter((phone, index, self) =>
//                   index === self.findIndex((p) => p.mobileNumber === phone.mobileNumber)
//                 )
//                 .map((phone, idx) => (
//                   <tr key={idx} className="border-t">
//                     <td className="p-3">
//                       {editingPhone === phone.mobileNumber ? (
//                         <input
//                           type="text"
//                           value={editPhoneValue}
//                           onChange={({ target: { value } }) => setEditPhoneValue(value)}
//                           className="border border-gray-300 rounded-lg p-3 w-full"
//                         />
//                       ) : (
//                         phone.mobileNumber
//                       )}
//                     </td>
//                     <td className="p-3 flex space-x-2">
//                       {editingPhone === phone.mobileNumber ? (
//                         <button
//                           type="button" // Ensure this button does not submit the form
//                           onClick={() => handleSaveEditedPhone(phone)}
//                           className="text-green-500 hover:text-green-600"
//                         >
//                           <FaSave />
//                         </button>
//                       ) : (
//                         <button
//                           type="button" // Ensure this button does not submit the form
//                           onClick={() => handleEditPhone(phone)}
//                           className="text-blue-500 hover:text-blue-600"
//                         >
//                           <FaEdit />
//                         </button>
//                       )}
//                       <button
//                         type="button" // Ensure this button does not submit the form
//                         onClick={() => handleDeletePhone(phone)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No phone numbers added.</p>
//       )}
//     </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;








// sample checking code ------most most this is also the same main code with selecting the country code of the number ---------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import axios from 'axios';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person: selectedPerson,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [editingPhone, setEditingPhone] = useState(null);
//   const [editPhoneValue, setEditPhoneValue] = useState("");
//   const [error, setError] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [selectedCountryCode, setSelectedCountryCode] = useState('+1'); // Default to USA
//   const [addedPhones, setAddedPhones] = useState([]);

//   const [formState, setFormState] = useState(formData);

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   useEffect(() => {
//     setFormState(formData);
//   }, [formData]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//           callingCode: country?.idd?.root + (country?.idd?.suffixes?.[0] || ''),
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleAddPhone = () => {
//     if (phoneNumber.trim() !== '') {
//       const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
//       const phoneNumberObject = parsePhoneNumberFromString(fullPhoneNumber);

//       if (phoneNumberObject && phoneNumberObject.isValid()) {
//         const formattedNumber = `+${selectedCountryCode.substring(1)}-${phoneNumberObject.nationalNumber}`;

//         const phoneExists = [
//           ...formState?.data?.mobileNumbers,
//           ...addedPhones,
//         ].some((p) => p.mobileNumber === formattedNumber);

//         if (!phoneExists) {
//           setAddedPhones([...addedPhones, { mobileNumber: formattedNumber }]);
//           setPhoneNumber('');
//           setError('');
//         } else {
//           setError('Phone number already exists.');
//         }
//       } else {
//         setError('Invalid phone number.');
//       }
//     }
//   };

//   // const handleDeletePhone = (phone) => {
//   //   if (phone.groupDetailsId) {
//   //     const { data } = selectedPerson;
//   //     dispatch(
//   //       deletePhone({
//   //         phoneId: phone.groupDetailsId,
//   //         groupId: data?.groupId,
//   //       })
//   //     );
//   //   } else {
//   //     setAddedPhones(addedPhones.filter((p) => p.mobileNumber !== phone.mobileNumber));
//   //   }
//   // };


//   //main delete code ------------------------
//   const handleDeletePhone = async (phone) => {
//     try {
//       if (phone.groupDetailsId) {
//         // Immediately remove the phone from the UI
//         const updatedMobileNumbers = formState.data.mobileNumbers.filter(
//           (p) => p.mobileNumber !== phone.mobileNumber
//         );
//         setFormState((prevState) => ({
//           ...prevState,
//           data: {
//             ...prevState.data,
//             mobileNumbers: updatedMobileNumbers,
//           },
//         }));
  
//         // Dispatch the Redux action to delete the phone from the server
//         await dispatch(
//           deletePhone({
//             phoneId: phone.groupDetailsId,
//             groupId: selectedPerson?.data?.groupId,
//           })
//         );
//       } else {
//         // If it's a newly added phone, remove it from the addedPhones array
//         setAddedPhones(addedPhones.filter((p) => p.mobileNumber !== phone.mobileNumber));
//       }
//     } catch (error) {
//       setError('Failed to delete phone number. Please try again.');
//     }
//   };
  

//   const handleEditPhone = (phone) => {
//     setEditingPhone(phone.mobileNumber);
//     setEditPhoneValue(phone.mobileNumber);
//   };

//   const handleSaveEditedPhone = (phone) => {
//     if (editPhoneValue.trim() !== "") {
//       if (phone.groupDetailsId) {
//         // Editing an existing phone number
//         const updatedMobileNumbers = formState.data.mobileNumbers.map((p) =>
//           p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//         );
  
//         // Update state with the modified array
//         setFormState((prevState) => ({
//           ...prevState,
//           data: {
//             ...prevState.data,
//             mobileNumbers: updatedMobileNumbers,
//           },
//         }));
//       } else {
//         // Editing a newly added phone number
//         const updatedPhones = addedPhones.map((p) =>
//           p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//         );
  
//         // Update state with the modified array
//         setAddedPhones(updatedPhones);
//       }
  
//       setEditingPhone(null); // Exit editing mode
//       setError("");
//     } else {
//       setError("Phone number cannot be empty.");
//     }
//   };


//   // const handleSaveEditedPhone = (phone) => {
//   //   if (editPhoneValue.trim() !== "") {
//   //     if (phone.groupDetailsId) {
//   //       // Editing an existing phone number
//   //       const updatedMobileNumbers = formState.data.mobileNumbers.map((p) =>
//   //         p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//   //       );
//   //       setFormState((prevState) => ({
//   //         ...prevState,
//   //         data: {
//   //           ...prevState.data,
//   //           mobileNumbers: updatedMobileNumbers,
//   //         },
//   //       }));
//   //     } else {
//   //       // Editing a newly added phone number
//   //       const updatedPhones = addedPhones.map((p) =>
//   //         p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//   //       );
//   //       setAddedPhones(updatedPhones);
//   //     }
  
//   //     setEditingPhone(null); // Exit editing mode
//   //     setError("");
//   //   } else {
//   //     setError("Phone number cannot be empty.");
//   //   }
//   // };
  


//   // Updated handleSave function to close the form after saving
//   const handleSave = () => {
//     const allPhones = [
//       ...formState?.data?.mobileNumbers.map(({ groupDetailsId, mobileNumber }) => ({ groupDetailsId, mobileNumber })),
//       ...addedPhones,
//     ];

//     const uniquePhones = Array.from(
//       new Map(allPhones.map((phone) => [phone.mobileNumber, phone])).values()
//     );

//     const updateFormData = {
//       groupId: formState?.data?.groupId,
//       groupName: groupName,
//       isActive: formState?.data?.groupStatus === "Active",
//       mobileNumber: uniquePhones,
//     };

//     dispatch(updateGroupDetails({ formData: updateFormData }));

//     if (onSave) {
//       onSave(updateFormData);
//     }

//     // Close the form/modal after saving
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
//           &times;
//         </button>

//         {isEditing && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave();
//               }}
//               className="space-y-6"
//             >
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={groupName}
//                   onChange={({ target: { value } }) => setGroupName(value)}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
//                 <div className="flex space-x-2">
//                   <select
//                     value={selectedCountryCode}
//                     onChange={({ target: { value } }) => setSelectedCountryCode(value)}
//                     className="border border-gray-300 rounded-lg p-3"
//                   >
//                     {countries.map((country) => (
//                       <option key={country.isoCode} value={country.callingCode}>
//                         {country.name} ({country.callingCode})
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="text"
//                     name="newPhoneNumber"
//                     value={phoneNumber}
//                     onChange={({ target: { value } }) => setPhoneNumber(value)}
//                     className="border border-gray-300 rounded-lg p-3 w-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddPhone}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     style={{ backgroundColor: '#134572' }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//               </div>

//     <div>
//   <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
//   <div className="overflow-y-auto h-64"> {/* Adjust height as needed */}
//     <table className="w-full border border-gray-300 rounded-lg">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="p-3 text-left">Mobile Number</th>
//           <th className="p-3 text-left">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {[...formState?.data?.mobileNumbers, ...addedPhones]
//           .filter((phone, index, self) =>
//             index === self.findIndex((p) => p.mobileNumber === phone.mobileNumber)
//           )
//           .map((phone, idx) => (
//             <tr key={idx} className="border-t">
//               <td className="p-3">
//                 {editingPhone === phone.mobileNumber ? (
//                   <input
//                     type="text"
//                     value={editPhoneValue}
//                     onChange={({ target: { value } }) => setEditPhoneValue(value)}
//                     className="border border-gray-300 rounded-lg p-3 w-full"
//                   />
//                 ) : (
//                   phone.mobileNumber
//                 )}
//               </td>
//               <td className="p-3 flex space-x-2">
//                 {editingPhone === phone.mobileNumber ? (
//                   <button
//                     type="button"
//                     onClick={() => handleSaveEditedPhone(phone)}
//                     className="text-green-500"
//                   >
//                     <FaSave />
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => handleEditPhone(phone)}
//                     className="text-blue-500"
//                   >
//                     <FaEdit />
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => handleDeletePhone(phone)}
//                   className="text-red-500"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;





// // trying code --------------- main code ---------------------------
// import React, { useState, useEffect, useMemo } from "react";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import axios from 'axios';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person: selectedPerson,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [editingPhone, setEditingPhone] = useState(null);
//   const [editPhoneValue, setEditPhoneValue] = useState("");
//   const [error, setError] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [selectedCountryCode, setSelectedCountryCode] = useState('+1'); // Default to USA
//   const [addedPhones, setAddedPhones] = useState([]);

//   const [formState, setFormState] = useState(formData);

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   useEffect(() => {
//     setFormState(formData);
//   }, [formData]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//           callingCode: country?.idd?.root + (country?.idd?.suffixes?.[0] || ''),
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);

//   const allUniquePhones = useMemo(() => {
//     const allPhones = [...(formState?.data?.mobileNumbers || []), ...addedPhones];
//     return Array.from(new Map(allPhones.map(phone => [phone.mobileNumber, phone])).values());
//   }, [formState?.data?.mobileNumbers, addedPhones]);

//   const handleAddPhone = () => {
//     if (phoneNumber.trim() === '') return;
  
//     const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
//     const phoneNumberObject = parsePhoneNumberFromString(fullPhoneNumber);
  
//     if (!phoneNumberObject || !phoneNumberObject.isValid()) {
//       setError('Invalid phone number.');
//       return;
//     }
  
//     const formattedNumber = `+${selectedCountryCode.substring(1)}-${phoneNumberObject.nationalNumber}`;
  
//     if (allUniquePhones.some((p) => p.mobileNumber === formattedNumber)) {
//       setError('Phone number already exists.');
//       return;
//     }
  
//     // If it reaches here, the phone number is valid and doesn't exist.
//     setAddedPhones((prevPhones) => [...prevPhones, { mobileNumber: formattedNumber }]);
//     setPhoneNumber(''); // Clear input field
//     setError(''); // Clear error message
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
//       handleAddPhone();
//     }
//   };

//   const handleDeletePhone = async (phone) => {
//     try {
//       if (phone.groupDetailsId) {
//         // Immediately remove the phone from the UI
//         const updatedMobileNumbers = formState.data.mobileNumbers.filter(
//           (p) => p.mobileNumber !== phone.mobileNumber
//         );
//         setFormState((prevState) => ({
//           ...prevState,
//           data: {
//             ...prevState.data,
//             mobileNumbers: updatedMobileNumbers,
//           },
//         }));
  
//         // Dispatch the Redux action to delete the phone from the server
//         await dispatch(
//           deletePhone({
//             phoneId: phone.groupDetailsId,
//             groupId: selectedPerson?.data?.groupId,
//           })
//         );
//       } else {
//         // If it's a newly added phone, remove it from the addedPhones array
//         setAddedPhones(addedPhones.filter((p) => p.mobileNumber !== phone.mobileNumber));
//       }
//     } catch (error) {
//       setError('Failed to delete phone number. Please try again.');
//     }
//   };

//   const handleEditPhone = (phone) => {
//     setEditingPhone(phone.mobileNumber);
//     setEditPhoneValue(phone.mobileNumber);
//   };

//   const handleSaveEditedPhone = (phone) => {
//     if (editPhoneValue.trim() !== "") {
//       if (phone.groupDetailsId) {
//         // Editing an existing phone number
//         const updatedMobileNumbers = formState.data.mobileNumbers.map((p) =>
//           p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//         );
  
//         // Update state with the modified array
//         setFormState((prevState) => ({
//           ...prevState,
//           data: {
//             ...prevState.data,
//             mobileNumbers: updatedMobileNumbers,
//           },
//         }));
//       } else {
//         // Editing a newly added phone number
//         const updatedPhones = addedPhones.map((p) =>
//           p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//         );
  
//         // Update state with the modified array
//         setAddedPhones(updatedPhones);
//       }
  
//       setEditingPhone(null); // Exit editing mode
//       setError("");
//     } else {
//       setError("Phone number cannot be empty.");
//     }
//   };

//   const handleSave = () => {
//     const updateFormData = {
//       groupId: formState?.data?.groupId,
//       groupName: groupName,
//       isActive: formState?.data?.groupStatus === "Active",
//       mobileNumber: allUniquePhones,
//     };

//     dispatch(updateGroupDetails({ formData: updateFormData }));

//     if (onSave) {
//       onSave(updateFormData);
//     }

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
//           &times;
//         </button>

//         {isEditing && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave();
//               }}
//               className="space-y-6"
//             >
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={groupName}
//                   onChange={({ target: { value } }) => setGroupName(value)}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
//                 <div className="flex space-x-2">
//                   <select
//                     value={selectedCountryCode}
//                     onChange={({ target: { value } }) => setSelectedCountryCode(value)}
//                     className="border border-gray-300 rounded-lg p-3"
//                   >
//                     {countries.map((country) => (
//                       <option key={country.isoCode} value={country.callingCode}>
//                         {country.name} ({country.callingCode})
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="text"
//                     name="newPhoneNumber"
//                     value={phoneNumber}
//                     onChange={({ target: { value } }) => setPhoneNumber(value)}
//                     onKeyPress={handleKeyPress}
//                     className="border border-gray-300 rounded-lg p-3 w-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddPhone}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     style={{ backgroundColor: '#134572' }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//               </div>

//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
//                 <div className="overflow-y-auto h-64">
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allUniquePhones.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">
//                             {editingPhone === phone.mobileNumber ? (
//                               <input
//                                 type="text"
//                                 value={editPhoneValue}
//                                 onChange={({ target: { value } }) => setEditPhoneValue(value)}
//                                 className="border border-gray-300 rounded-lg p-3 w-full"
//                               />
//                             ) : (
//                               phone.mobileNumber
//                             )}
//                           </td>
//                           <td className="p-3 flex space-x-2">
//                             {editingPhone === phone.mobileNumber ? (
//                               <button
//                                 type="button"
//                                 onClick={() => handleSaveEditedPhone(phone)}
//                                 className="text-green-500"
//                               >
//                                 <FaSave />
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 onClick={() => handleEditPhone(phone)}
//                                 className="text-blue-500"
//                               >
//                                 <FaEdit />
//                               </button>
//                             )}
//                             <button
//                               type="button"
//                               onClick={() => handleDeletePhone(phone)}
//                               className="text-red-500"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;





// main code -----------------------------final code ---------------------------
// import React, { useState, useEffect, useMemo } from "react";
// import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person: selectedPerson,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [editingPhone, setEditingPhone] = useState(null);
//   const [editPhoneValue, setEditPhoneValue] = useState("");
//   const [error, setError] = useState('');
//   const [countries, setCountries] = useState([]);
//   const [selectedCountryCode, setSelectedCountryCode] = useState('+91'); // Default to USA
//   const [allPhoneNumbers, setAllPhoneNumbers] = useState([]);

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   useEffect(() => {
//     if (formData?.data?.mobileNumbers) {
//       console.log('Fetched mobile numbers from group details:', formData.data.mobileNumbers);
//       setAllPhoneNumbers(formData.data.mobileNumbers);
//     }
//   }, [formData]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//           callingCode: country?.idd?.root + (country?.idd?.suffixes?.[0] || ''),
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);




  

//   const handleAddPhone = () => {
//     if (phoneNumber.trim() === '') return;
  
//     const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
//     const phoneNumberObject = parsePhoneNumberFromString(fullPhoneNumber);
  
//     if (!phoneNumberObject || !phoneNumberObject.isValid()) {
//       setError('Invalid phone number.');
//       return;
//     }
  
//     const formattedNumber = `+${selectedCountryCode.substring(1)}-${phoneNumberObject.nationalNumber}`;
//     console.log('Newly added phone number:', formattedNumber);
  
//     if (allPhoneNumbers.some((p) => p.mobileNumber === formattedNumber)) {
//       setError('Phone number already exists.');
//       return;
//     }
  
//     setAllPhoneNumbers((prevPhones) => [...prevPhones, { mobileNumber: formattedNumber }]);
//     setPhoneNumber('');
//     setError('');
//   };







//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddPhone();
//     }
//   };

//   // const handleDeletePhone = async (phone) => {
//   //   try {
//   //     if (phone.groupDetailsId) {
//   //       await dispatch(
//   //         deletePhone({
//   //           phoneId: phone.groupDetailsId,
//   //           groupId: selectedPerson?.data?.groupId,
//   //         })
//   //       );
//   //     }
//   //     setAllPhoneNumbers(allPhoneNumbers.filter((p) => p.mobileNumber !== phone.mobileNumber));
//   //   } catch (error) {
//   //     setError('Failed to delete phone number. Please try again.');
//   //   }
//   // };

//   const handleDeletePhone = async (phone) => {
//     // Optimistically update UI before the async call
//     const updatedPhoneNumbers = allPhoneNumbers.filter((p) => p.mobileNumber !== phone.mobileNumber);
//     setAllPhoneNumbers(updatedPhoneNumbers);
  
//     try {
//       if (phone.groupDetailsId && selectedPerson?.data?.groupId) {
        
//         const phoneId = phone.groupDetailsId;
//         const groupId = selectedPerson.data.groupId;
  
//         // Retrieve the token from local storage
//         const token = localStorage.getItem('jwt');
  
//         // Make the API call to delete the phone
//         const response = await axios.post(
//           `https://www.annulartech.net/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`,
//           {
//             groupDetailsId: phoneId,
//             groupId: groupId,
//             flag: 1,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         // Check for successful response (e.g., status 200)
//         if (response.status === 200) {
//           console.log('Phone number deleted successfully');
//         } else {
//           // Handle unexpected response statuses
//           setError('Failed to delete phone number. Please try again.');
//           // Revert the optimistic update
//           setAllPhoneNumbers((prevPhones) => [...prevPhones, phone]);
//         }
//       }
//     } catch (error) {
//       // Provide more detailed error logging for debugging
//       console.error('Error deleting phone number:', error);
//       setError('Failed to delete phone number. Please try again.');
//       // Revert the optimistic update
//       setAllPhoneNumbers((prevPhones) => [...prevPhones, phone]);
//     }
//   };




//   const handleEditPhone = (phone) => {
//     setEditingPhone(phone.mobileNumber);
//     setEditPhoneValue(phone.mobileNumber);
//   };

//   const handleSaveEditedPhone = (phone) => {
//     if (editPhoneValue.trim() !== "") {
//       setAllPhoneNumbers(allPhoneNumbers.map((p) =>
//         p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
//       ));
//       setEditingPhone(null);
//       setError("");
//     } else {
//       setError("Phone number cannot be empty.");
//     }
//   };

//   const handleSave = () => {
//     const updateFormData = {
//       groupId: formData?.data?.groupId,
//       groupName: groupName,
//       isActive: formData?.data?.groupStatus === "Active",
//       mobileNumber: allPhoneNumbers,
//     };

//     // dispatch(updateGroupDetails({ formData: updateFormData }));

//     if (onSave) {
//       onSave(updateFormData);
//     }

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
//           {/* &times; */}
//           <FaTimes className="text-xl mt-12  mr-6" />
//         </button>

//         {isEditing && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave();
//               }}
//               className="space-y-6"
//             >
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={groupName}
//                   onChange={({ target: { value } }) => setGroupName(value)}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
//                 <div className="flex space-x-2">
//                   <select
//                     value={selectedCountryCode}
//                     onChange={({ target: { value } }) => setSelectedCountryCode(value)}
//                     className="border border-gray-300 rounded-lg p-3"
//                   >
//                     {countries.map((country) => (
//                       <option key={country.isoCode} value={country.callingCode}>
//                         {country.name} ({country.callingCode})
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="text"
//                     name="newPhoneNumber"
//                     value={phoneNumber}
//                     onChange={({ target: { value } }) => setPhoneNumber(value)}
//                     onKeyPress={handleKeyPress}
//                     className="border border-gray-300 rounded-lg p-3 w-full"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddPhone}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     style={{ backgroundColor: '#134572' }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//               </div>

// <div>
//   <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
  
//   {/* Container for table with fixed height and scroll */}
//   <div className="overflow-y-auto h-36 border border-gray-300 rounded-lg">
//     <table className="w-full border-collapse">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="p-3 text-left">Mobile Number</th>
//           <th className="p-3 text-left">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {allPhoneNumbers.map((phone, idx) => (
//           <tr key={idx} className="border-t">
//             <td className="p-3">
//               {editingPhone === phone.mobileNumber ? (
//                 <input
//                   type="text"
//                   value={editPhoneValue}
//                   onChange={({ target: { value } }) => setEditPhoneValue(value)}

//   //-----------------------
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       handleSaveEditedPhone(phone);
//                     }
//                   }}
// // ----------------------

//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 />
//               ) : (

//               //   <>
//               //   {console.log('Displaying phone number:', phone.mobileNumber)}
//               //   {phone.mobileNumber}
//               // </>
                
//                 phone.mobileNumber
//               )}
//             </td>
//             <td className="p-3 flex space-x-2">
//               {editingPhone === phone.mobileNumber ? (
//                 <button
//                   type="button"
//                   onClick={() => handleSaveEditedPhone(phone)}
//                   className="text-green-500"
//                 >
//                   <FaSave />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => handleEditPhone(phone)}
//                   className="text-blue-500"
//                 >
//                   <FaEdit />
//                 </button>
//               )}
//               <button
//                 type="button"
//                 onClick={() => handleDeletePhone(phone)}
//                 className="text-red-500"
//               >
//                 <FaTrash />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>


//               <div className="flex justify-end">
//                 {/* <button
//                   type="button"
//                   onClick={onCancel}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Cancel
//                 </button> */}
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;



import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from 'axios';

const UserModal = ({
  isOpen,
  onClose,
  person: selectedPerson,
  onSave,
  formData,
  isEditing,
}) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingPhone, setEditingPhone] = useState(null);
  const [editPhoneValue, setEditPhoneValue] = useState("");
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [allPhoneNumbers, setAllPhoneNumbers] = useState([]);

  useEffect(() => {
    if (formData?.data?.mobileNumbers) {
      setAllPhoneNumbers(formData.data.mobileNumbers.map(phone => ({
        ...phone,
        groupDetailsId: phone.groupDetailsId || null,
        displayNumber: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber)
      })));
    }
  }, [formData]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = response.data.map((country) => ({
          isoCode: country.cca2,
          name: country.name.common,
          callingCode: country?.idd?.root + (country?.idd?.suffixes?.[0] || ''),
        }));
        setCountries(countryData);
      } catch (error) {
        setError('Error fetching country data');
      }
    };
    fetchCountries();
  }, []);

  const formatPhoneNumberWithHyphen = (number) => {
    if (!number) return '';
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{10})$/);
    if (match) {
      return `+${match[1]}-${match[2]}`;
    }
    return number;
  };

  const removeHyphenFromNumber = (number) => {
    return number.replace(/-/g, '');
  };

  const handleAddPhone = () => {
    if (phoneNumber.trim() === '') return;

    const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`;
    const phoneNumberObject = parsePhoneNumberFromString(fullPhoneNumber);

    if (!phoneNumberObject || !phoneNumberObject.isValid()) {
      setError('Invalid phone number.');
      return;
    }

    const numberWithoutHyphen = removeHyphenFromNumber(fullPhoneNumber);
    const numberWithHyphen = formatPhoneNumberWithHyphen(fullPhoneNumber);

    // console.log('Number without hyphens:', numberWithoutHyphen);
    // console.log('Number with hyphens:', numberWithHyphen);

    if (allPhoneNumbers.some((p) => p.mobileNumber === numberWithoutHyphen)) {
      setError('Phone number already exists.');
      return;
    }

    const newPhoneEntry = {
      mobileNumber: numberWithoutHyphen,
      mobileNumberWithHypens: numberWithHyphen,
      displayNumber: numberWithHyphen,
      groupDetailsId: null // Set initial groupDetailsId as null for new entries
    };

    setAllPhoneNumbers((prevPhones) => [...prevPhones, newPhoneEntry]);
    setPhoneNumber('');
    setError('');
  };

  const handleDeletePhone = async (phone) => {
    const updatedPhoneNumbers = allPhoneNumbers.filter((p) => p.mobileNumber !== phone.mobileNumber);
    setAllPhoneNumbers(updatedPhoneNumbers);

    try {
      if (phone.groupDetailsId && selectedPerson?.data?.groupId) {
        const phoneId = phone.groupDetailsId;
        const groupId = selectedPerson.data.groupId;
        const token = localStorage.getItem('jwt');

        const response = await axios.post(
          `https://www.annulartech.net/group/deleteGroupAndGroupDetails?flag=1&groupDetailsId=${phoneId}&groupId=${groupId}`,
          {
            groupDetailsId: phoneId,
            groupId: groupId,
            flag: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          setError('Failed to delete phone number. Please try again.');
          setAllPhoneNumbers((prevPhones) => [...prevPhones, phone]);
        }
      }
    } catch (error) {
      console.error('Error deleting phone number:', error);
      setError('Failed to delete phone number. Please try again.');
      setAllPhoneNumbers((prevPhones) => [...prevPhones, phone]);
    }
  };

  const handleEditPhone = (phone) => {
    setEditingPhone(phone.mobileNumber);
    setEditPhoneValue(phone.displayNumber);
  };

  const handleSaveEditedPhone = (phone) => {
    if (editPhoneValue.trim() === "") {
      setError("Phone number cannot be empty.");
      return;
    }

    const numberWithoutHyphen = removeHyphenFromNumber(editPhoneValue);
    const numberWithHyphen = formatPhoneNumberWithHyphen(editPhoneValue);

    setAllPhoneNumbers(allPhoneNumbers.map((p) =>
      p.mobileNumber === phone.mobileNumber
        ? {
            ...p,
            mobileNumber: numberWithoutHyphen,
            mobileNumberWithHypens: numberWithHyphen,
            displayNumber: numberWithHyphen
          }
        : p
    ));
    setEditingPhone(null);
    setError("");
  };

  const handleSave = () => {
    const updateFormData = {
      groupId: formData?.data?.groupId,
      groupName: groupName,
      isActive: formData?.data?.groupStatus === "Active",
      mobileNumber: allPhoneNumbers.map(phone => ({
        mobileNumber: phone.mobileNumber,
        mobileNumberWithHypens: phone.mobileNumberWithHypens,
        groupDetailsId: phone.groupDetailsId
      }))
    };

    if (onSave) {
      onSave(updateFormData);
    }

    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPhone();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
          <FaTimes className="text-xl mt-12 mr-6" />
        </button>

        {isEditing && (
          <>
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">Name:</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={({ target: { value } }) => setGroupName(value)}
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
                <div className="flex space-x-2">
                  <select
                    value={selectedCountryCode}
                    onChange={({ target: { value } }) => setSelectedCountryCode(value)}
                    className="border border-gray-300 rounded-lg p-3"
                  >
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.callingCode}>
                        {country.name} ({country.callingCode})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={({ target: { value } }) => setPhoneNumber(value)}
                    onKeyPress={handleKeyPress}
                    className="border border-gray-300 rounded-lg p-3 w-full"
                    placeholder="Enter phone number"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#134572' }}
                  >
                    Add
                  </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
                <div className="overflow-y-auto h-36 border border-gray-300 rounded-lg">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Mobile Number</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPhoneNumbers.map((phone, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3">
                            {editingPhone === phone.mobileNumber ? (
                              <input
                                type="text"
                                value={editPhoneValue}
                                onChange={({ target: { value } }) => setEditPhoneValue(value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSaveEditedPhone(phone);
                                  }
                                }}
                                className="border border-gray-300 rounded-lg p-3 w-full"
                              />
                            ) : (
                              phone.displayNumber
                            )}
                          </td>
                          <td className="p-3 flex space-x-2">
                            {editingPhone === phone.mobileNumber ? (
                              <button
                                type="button"
                                onClick={() => handleSaveEditedPhone(phone)}
                                className="text-green-500"
                              >
                                <FaSave />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleEditPhone(phone)}
                                className="text-blue-500"
                              >
                                <FaEdit />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeletePhone(phone)}
                              className="text-red-500"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#134572' }}
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserModal;