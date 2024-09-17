
// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   updatePhoneNumber,
//   deletePhoneNumber,
//   addPhoneNumber,
//   fetchGroupDetails
// } from '../redux/tableSlice';
// import { closeModal, updateFormData, savePerson, setEditing } from '../redux/modalSlice';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [newPhone, setNewPhone] = useState('');
//   const [phoneToEdit, setPhoneToEdit] = useState('');
//   const [isEditingPhone, setIsEditingPhone] = useState(false);

// console.log({isEditing,isOpen});
//   // Fetch group details when modal opens
//   useEffect(() => {
//     if (isOpen && person?.groupId) {
//       debugger
//       dispatch(fetchGroupDetails(person?.groupId));
//     }
//   }, [isOpen, person, dispatch]);

//   if (!isOpen) return null;

//   const handleEditPhone = (phone) => {
//     setPhoneToEdit(phone);
//     setNewPhone(phone);
//     setIsEditingPhone(true); // Show the edit input
//   };

//   const handleSaveEdit = () => {
//     if (newPhone.trim()) {
//       dispatch(updatePhoneNumber({ id: person.id, oldPhone: phoneToEdit, newPhone: newPhone.trim() }));
//       setPhoneToEdit('');
//       setNewPhone('');
//       setIsEditingPhone(false); // Hide the edit input
//     }
//   };

//   const handleCancelEdit = () => {
//     setPhoneToEdit('');
//     setNewPhone('');
//     setIsEditingPhone(false); // Hide the edit input
//   };

//   const handleDeletePhone = (phone) => {
//     dispatch(deletePhoneNumber({ id: person.id, phone }));
//   };

//   const handleAddPhone = () => {
//     if (newPhone.trim()) {
//       dispatch(addPhoneNumber({ id: person.id, phone: newPhone.trim() }));
//       setNewPhone('');
//     }
//   };

//   const handleSave = () => {
//     dispatch(savePerson()); // Dispatch to save the updated person details
//     onSave(); // Additional callback if needed
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Number:</label>
//                 <select
//                   name="phone"
//                   value={formData.phone}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   {formData.phones?.length > 0 ? (
//                     formData.phones.map((phone, idx) => (
//                       <option key={idx} value={phone}>
//                         {phone}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">N/A</option>
//                   )}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Status:</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <div className="overflow-auto max-h-[calc(90vh-4rem)] p-6 border border-gray-300 rounded-lg">
//               <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Name:</label>
//                   <p className="border border-gray-300 rounded-lg p-3">{person?.groupName || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                   {person?.phones && person?.phones?.length > 0 ? (
//                     <table className="w-full border border-gray-300 rounded-lg">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="p-3 text-left">Mobile Number</th>
//                           <th className="p-3 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {person?.phones.map((phone, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="p-3">{phone}</td>
//                             <td className="p-3 flex space-x-2">
//                               <button
//                                 onClick={() => handleEditPhone(phone)}
//                                 className="text-blue-500 hover:text-blue-600"
//                               >
//                                 <FaEdit />
//                               </button>
//                               <button
//                                 onClick={() => handleDeletePhone(phone)}
//                                 className="text-red-500 hover:text-red-600"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                   )}
//                 </div>

//                 <div className="mt-4 relative">
//                   <label className="block text-lg font-medium mb-2">
//                     {isEditingPhone ? 'Edit Phone Number:' : 'Add New Phone Number:'}
//                   </label>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       value={newPhone}
//                       onChange={(e) => setNewPhone(e.target.value)}
//                       className="border border-gray-300 rounded-lg p-3 w-full"
//                       placeholder={isEditingPhone ? 'Enter phone number' : 'Enter new phone number'}
//                     />
//                     <button
//                       onClick={isEditingPhone ? handleSaveEdit : handleAddPhone}
//                       className={`text-white py-2 px-4 rounded-lg ${isEditingPhone ? 'hover:bg-blue-600' : 'hover:bg-green-600'}`}
//                       style={{ backgroundColor: '#134572' }}
//                     >
//                       {isEditingPhone ? 'Save' : 'Add'}
//                     </button>
//                     {isEditingPhone && (
//                       <button
//                         onClick={handleCancelEdit}
//                         className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                         style={{ backgroundColor: '#134572' }}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Status:</label>
//                   <p className={`border border-gray-300 rounded-lg p-3 ${person?.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
//                     {person?.status || 'N/A'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={onClose}
//                 className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 style={{ backgroundColor: '#134572' }}
//               >
//                 Close
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;

// main code 1--file ----------------
// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import {
//   updatePhoneNumber,
//   deletePhoneNumber,
//   addPhoneNumber,
//   fetchGroupDetails
// } from '../redux/tableSlice';
// import { closeModal, savePerson, setEditing } from '../redux/modalSlice';

// const UserModal = ({
//   isOpen,
//   onClose,
//   person:selectedPerson, // The person object containing the data to be displayed
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [newPhone, setNewPhone] = useState('');
//   const [phoneToEdit, setPhoneToEdit] = useState('');
//   const [isEditingPhone, setIsEditingPhone] = useState(false);

//   console.log({selectedPerson});

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {

//       dispatch(fetchGroupDetails(selectedPerson?.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   if (!isOpen) return null;

//   const handleEditPhone = (phone) => {
//     setPhoneToEdit(phone.mobileNumber);
//     setNewPhone(phone.mobileNumber);
//     setIsEditingPhone(true); // Show the edit input
//   };

//   const handleSaveEdit = () => {
//     if (newPhone.trim()) {
//       dispatch(updatePhoneNumber({ id: selectedPerson.groupId, oldPhone: phoneToEdit, newPhone: newPhone.trim() }));
//       setPhoneToEdit('');
//       setNewPhone('');
//       setIsEditingPhone(false); // Hide the edit input
//     }
//   };

//   const handleCancelEdit = () => {
//     setPhoneToEdit('');
//     setNewPhone('');
//     setIsEditingPhone(false); // Hide the edit input
//   };

//   const handleDeletePhone = (phone) => {
//     dispatch(deletePhoneNumber({ id: selectedPerson.groupId, phone: phone.mobileNumber }));
//   };

//   const handleAddPhone = () => {
//     if (newPhone.trim()) {
//       dispatch(addPhoneNumber({ id: selectedPerson.groupId, phone: newPhone.trim() }));
//       setNewPhone('');
//     }
//   };

//   const handleSave = () => {
//     dispatch(savePerson()); // Dispatch to save the updated person details
//     onSave(); // Additional callback if needed
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Number:</label>
//                 <select
//                   name="phone"
//                   value={formData.phone}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   {formData.phones?.length > 0 ? (
//                     formData.phones.map((phone, idx) => (
//                       <option key={idx} value={phone}>
//                         {phone}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">N/A</option>
//                   )}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Status:</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: '#134572' }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <div className="overflow-auto max-h-[calc(90vh-4rem)] p-6 border border-gray-300 rounded-lg">
//               <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Name:</label>
//                   <p className="border border-gray-300 rounded-lg p-3">{selectedPerson?.data?.groupName || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                   {selectedPerson?.data?.mobileNumbers && selectedPerson?.data?.mobileNumbers?.length > 0 ? (
//                     <table className="w-full border border-gray-300 rounded-lg">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="p-3 text-left">Mobile Number</th>
//                           <th className="p-3 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedPerson?.data?.mobileNumbers.map((phone, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="p-3">{phone.mobileNumber}</td>
//                             <td className="p-3 flex space-x-2">
//                               <button
//                                 onClick={() => handleEditPhone(phone)}
//                                 className="text-blue-500 hover:text-blue-600"
//                               >
//                                 <FaEdit />
//                               </button>
//                               <button
//                                 onClick={() => handleDeletePhone(phone)}
//                                 className="text-red-500 hover:text-red-600"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                   )}
//                 </div>

//                 <div className="mt-4 relative">
//                   <label className="block text-lg font-medium mb-2">
//                     {isEditingPhone ? 'Edit Phone Number:' : 'Add New Phone Number:'}
//                   </label>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       value={newPhone}
//                       onChange={(e) => setNewPhone(e.target.value)}
//                       className="border border-gray-300 rounded-lg p-3 w-full"
//                       placeholder={isEditingPhone ? 'Enter phone number' : 'Enter new phone number'}
//                     />
//                     <button
//                       onClick={isEditingPhone ? handleSaveEdit : handleAddPhone}
//                       className={`text-white py-2 px-4 rounded-lg ${isEditingPhone ? 'hover:bg-blue-600' : 'hover:bg-green-600'}`}
//                       style={{ backgroundColor: '#134572' }}
//                     >
//                       {isEditingPhone ? 'Save' : 'Add'}
//                     </button>
//                     {isEditingPhone && (
//                       <button
//                         onClick={handleCancelEdit}
//                         className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                         style={{ backgroundColor: '#134572' }}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Status:</label>
//                   <p className={`border border-gray-300 rounded-lg p-3 ${selectedPerson?.data?.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {selectedPerson?.data?.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={onClose}
//                 className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 style={{ backgroundColor: '#134572' }}
//               >
//                 Close
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;





//dommi file ----------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import {
//   // updatePhoneNumber,
//   deletePhoneNumber,
//   // addPhoneNumber,
//   fetchGroupDetails,
// } from "../redux/tableSlice";
// import { savePerson, setEditing } from "../redux/modalSlice";

// const UserModal = ({
//   isOpen,
//   onClose,
//   person: selectedPerson, // The person object containing the data to be displayed
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
//   const [newPhone, setNewPhone] = useState("");
//   const [phoneToEdit, setPhoneToEdit] = useState("");
//   const [isEditingPhone, setIsEditingPhone] = useState(false);
//   const { groupName: gname = "" } = formData?.data;
//   const [groupName, setGroupName] = useState(gname);
//   const [phoneNumber, setPhonenumer] = useState("");



//   console.log({ formData });
//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson?.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   if (!isOpen) return null;

//   // const handleEditPhone = (phone) => {
//   //   setPhoneToEdit(phone.mobileNumber);
//   //   setNewPhone(phone.mobileNumber);
//   //   setIsEditingPhone(true); // Show the edit input
//   // };

//   // const handleSaveEdit = () => {
//   //   if (newPhone.trim()) {
//   //     dispatch(updatePhoneNumber({ id: selectedPerson.groupId, oldPhone: phoneToEdit, newPhone: newPhone.trim() }));
//   //     setPhoneToEdit('');
//   //     setNewPhone('');
//   //     setIsEditingPhone(false); // Hide the edit input
//   //   }
//   // };

//   // const handleCancelEdit = () => {
//   //   setPhoneToEdit('');
//   //   setNewPhone('');
//   //   setIsEditingPhone(false); // Hide the edit input
//   // };

//   const handleDeletePhone = (phone) => {
//     dispatch(
//       deletePhoneNumber({
//         id: selectedPerson.groupId,
//         phone: phone.mobileNumber,
//       })
//     );
//   };

//   // const handleAddPhone = () => {
//   //   if (newPhone.trim()) {
//   //     dispatch(addPhoneNumber({ id: selectedPerson.groupId, phone: newPhone.trim() }));
//   //     setNewPhone('');
//   //   }
//   // };

//   const handleSave = () => {
//     dispatch(savePerson());
//      // Dispatch to save the updated person details
//      const updateFormData = {
//       "groupId": formData?.data?.groupId,
//     "groupName": groupName,
//     "isActive": formData?.data?.groupStatus,
//     "mobileNumber": [phoneNumber, ...formData?.data?.mobileNumbers?.filter(({mobileNumber})=>mobileNumber!==phoneNumber).map(({mobileNumber})=>mobileNumber)].filter(e=>e!==""),
//     };

//      console.log(updateFormData);
//     onSave(updateFormData,); // Additional callback if needed
//   };




//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 text-2xl"
//         >
//           &times;
//         </button>

//         {/* If isEditing is true, show edit form */}
//         {isEditing ? (
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
//                   onChange={({ target: { value } }) => {
//                     setGroupName(value);
//                   }}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">
//                   Phone Number:
//                 </label>
//                 <select
//                   name="phone"
//                   value={phoneNumber}
//                   onChange={(event) => {
//                     setPhonenumer(event.target.value);
//                   }}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   {formData?.data?.mobileNumbers?.length > 0 ? (
//                     formData?.data?.mobileNumbers.map((phone, idx) => (
//                       <option key={idx} value={phone.mobileNumber}>
//                         {phone.mobileNumber}
//                       </option>
//                     ))
//                   ) : (
//                     <option value="">N/A</option>
//                   )}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">
//                   Status:
//                 </label>
//                 <select
//                   name="status"
//                   value={formData?.data?.groupStatus || "n/a"}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             {/* Display personal details */}
//             <div className="overflow-auto max-h-[calc(90vh-4rem)] p-6 border border-gray-300 rounded-lg">
//               <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium mb-2">
//                     Name:
//                   </label>
//                   <p className="border border-gray-300 rounded-lg p-3">
//                     {selectedPerson?.data?.groupName || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">
//                     Mobile Numbers:
//                   </label>
//                   {selectedPerson?.data?.mobileNumbers?.length > 0 ? (
//                     <table className="w-full border border-gray-300 rounded-lg">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="p-3 text-left">Mobile Number</th>
//                           <th className="p-3 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedPerson?.data?.mobileNumbers.map(
//                           (phone, idx) => (
//                             <tr key={idx} className="border-t">
//                               <td className="p-3">{phone.mobileNumber}</td>
//                               <td className="p-3 flex space-x-2">
//                                 <button
//                                 onClick={() => handleEditPhone(phone)}
//                                 className="text-blue-500 hover:text-blue-600"
//                               >
//                                 <FaEdit />
//                               </button>
//                                 <button
//                                   onClick={() => handleDeletePhone(phone)}
//                                   className="text-red-500 hover:text-red-600"
//                                 >
//                                   <FaTrash />
//                                 </button>
//                               </td>
//                             </tr>
//                           )
//                         )}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                   )}
//                 </div>

//                 {/* <div className="mt-4 relative">
//                   <label className="block text-lg font-medium mb-2">
//                     {isEditingPhone ? 'Edit Phone Number:' : 'Add New Phone Number:'}
//                   </label>
//                   <div className="flex space-x-2">
//                     <input
//                       type="text"
//                       value={newPhone}
//                       onChange={(e) => setNewPhone(e.target.value)}
//                       className="border border-gray-300 rounded-lg p-3 w-full"
//                       placeholder={isEditingPhone ? 'Enter phone number' : 'Enter new phone number'}
//                     />
//                     <button
//                       onClick={isEditingPhone ? handleSaveEdit : handleAddPhone}
//                       className={`text-white py-2 px-4 rounded-lg ${isEditingPhone ? 'hover:bg-blue-600' : 'hover:bg-green-600'}`}
//                       style={{ backgroundColor: '#134572' }}
//                     >
//                       {isEditingPhone ? 'Save' : 'Add'}
//                     </button>
//                     {isEditingPhone && (
//                       <button
//                         onClick={handleCancelEdit}
//                         className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                         style={{ backgroundColor: '#134572' }}
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </div>
//                 </div> */}
//                 <div>
//                   <label className="block text-lg font-medium mb-2">
//                     Status:
//                   </label>
//                   <p className="border border-gray-300 rounded-lg p-3">
//                     {/* {selectedPerson?.data?.status === 'Active' ? 'Active' : 'Inactive'} */}
//                     {selectedPerson?.data?.status === "Active" ||
//                     selectedPerson?.data?.status === undefined
//                       ? "Active"
//                       : "Inactive"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 onClick={onClose}
//                 className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 style={{ backgroundColor: "#134572" }}
//               >
//                 Close
//               </button>
//               {/* <button
//                 onClick={() => dispatch(setEditing(true))}
//                 className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 style={{ backgroundColor: '#134572' }}
//               >
//                 Edit
//               </button> */}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;









// // the most main code with added functionallyty------------------------------
// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePhone, fetchGroupDetails } from "../redux/tableSlice";
// import { savePerson } from "../redux/modalSlice";

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
//   const [newPhone, setNewPhone] = useState("");
//   const [phoneToEdit, setPhoneToEdit] = useState("");
//   const [isEditingPhone, setIsEditingPhone] = useState(false);
//   const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   if (!isOpen) return null;

//   // const handleCancelEdit = () => {
//   //   setPhoneToEdit('');
//   //   setNewPhone('');
//   //   setIsEditingPhone(false); // Hide the edit input
//   // };



//   const handleDeletePhone = (phone) => {
//     const { groupId } = selectedPerson;

//     // console.log("Phone ID:", phone.groupDetailsId);  // Logs the phone ID (groupDetailsId)
//     // console.log("Group ID:", formData?.data?.groupId,); 
//     dispatch(
//       deletePhone({
//         phoneId: phone.groupDetailsId, // Use groupDetailsId for the phone
//         groupId: groupId,
//       })
//     );
//   };

//   const handleSave = () => {
//     const updateFormData = {
//       groupId: formData?.data?.groupId,
//       groupName: groupName,
//       isActive: formData?.data?.groupStatus,
//       mobileNumber: [
//         phoneNumber,
//         ...formData?.data?.mobileNumbers
//           ?.filter(({ mobileNumber }) => mobileNumber !== phoneNumber)
//           .map(({ mobileNumber }) => mobileNumber),
//       ].filter(e => e !== ""),
//     };
//     console.log(updateFormData);
//     dispatch(savePerson());
//     onSave(updateFormData);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 text-2xl"
//         >
//           &times;
//         </button>

//         {isEditing ? (
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
//                   onChange={({ target: { value } }) => {
//                     setGroupName(value);
//                   }}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Number:</label>
//                 {formData?.data?.mobileNumbers?.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {formData?.data?.mobileNumbers.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone.mobileNumber}</td>
//                           <td className="p-3 flex space-x-2">
//                             <button
//                               onClick={() => handleEditPhone(phone)}
//                               className="text-blue-500 hover:text-blue-600"
//                             >
//                               <FaEdit />
//                             </button>
//                             <button
//                               onClick={() => handleDeletePhone(phone)}
//                               className="text-red-500 hover:text-red-600"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Status:</label>
//                 <select
//                   name="status"
//                   value={formData?.data?.groupStatus || "n/a"}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <div className="overflow-auto max-h-[calc(90vh-4rem)] p-6 border border-gray-300 rounded-lg">
//               <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Name:</label>
//                   <p className="border border-gray-300 rounded-lg p-3">
//                     {selectedPerson?.data?.groupName || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                   {selectedPerson?.data?.mobileNumbers?.length > 0 ? (
//                     <table className="w-full border border-gray-300 rounded-lg">
//                       <thead>
//                         <tr className="bg-gray-100">
//                           <th className="p-3 text-left">Mobile Number</th>
//                           <th className="p-3 text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedPerson?.data?.mobileNumbers.map((phone, idx) => (
//                           <tr key={idx} className="border-t">
//                             <td className="p-3">{phone.mobileNumber}</td>
//                             <td className="p-3 flex space-x-2">
//                               <button
//                                 onClick={() => handleDeletePhone(phone)}
//                                 className="text-red-500 hover:text-red-600"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-blue-500 hover:text-blue-600 mt-4"
//             >
//               Edit
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;



// this code as only edit user ----------------------------------------------
// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePhone, fetchGroupDetails } from "../redux/tableSlice";
// import { updateGroupDetails } from "../redux/groupSlice"; // Make sure the path is correct

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

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   if (!isOpen) return null;

//   const handleDeletePhone = (phone) => {
//     const { groupId } = selectedPerson;
//     dispatch(
//       deletePhone({
//         phoneId: phone.groupDetailsId,
//         groupId: groupId,
//       })
//     );
//   };

//   const handleSave = () => {
//     const updateFormData = {
//       groupId: formData?.data?.groupId,
//       groupName: groupName,
//       isActive: formData?.data?.groupStatus, // Use formData if that's where it's set
//       mobileNumber: [
//         phoneNumber,
//         ...formData?.data?.mobileNumbers
//           ?.filter(({ mobileNumber }) => mobileNumber !== phoneNumber)
//           .map(({ mobileNumber }) => mobileNumber),
//       ].filter(e => e !== ""),
//     };

//     console.log("Update Form Data:", updateFormData);

//     // Make sure dispatch is correctly called with updateFormData
//     dispatch(updateGroupDetails({ formData: updateFormData, token: localStorage.getItem("jwt") }));
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 text-2xl"
//         >
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
//                   onChange={({ target: { value } }) => {
//                     setGroupName(value);
//                   }}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Number:</label>
//                 {formData?.data?.mobileNumbers?.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {formData?.data?.mobileNumbers.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone.mobileNumber}</td>
//                           <td className="p-3 flex space-x-2">
//                             <button
//                               onClick={() => handleDeletePhone(phone)}
//                               className="text-red-500 hover:text-red-600"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Status:</label>
//                 <select
//                   name="status"
//                   value={formData?.data?.groupStatus || "n/a"}
//                   onChange={onChange}
//                   className="border border-gray-300 rounded-lg p-3 w-full"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: "#134572" }}
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



// most most main code ----------------------------------
// import React, { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";

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

//   useEffect(() => {
//     if (isOpen && selectedPerson?.groupId) {
//       dispatch(fetchGroupDetails(selectedPerson.groupId));
//     }
//   }, [isOpen, selectedPerson, dispatch]);

//   if (!isOpen) return null;

//   // Add phone number to the table without form submission
//   const handleAddPhone = () => {
//     if (phoneNumber) {
//       setAddedPhones([...addedPhones, { mobileNumber: phoneNumber }]);
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

//   const handleSave = () => {
//     const updateFormData = {
//       groupId: formData?.data?.groupId,
//       groupName: groupName,
//       isActive: formData?.data?.groupStatus === "Active", // Ensure this is a boolean
//       mobileNumber: [
//         ...formData?.data?.mobileNumbers
//           .map(({ groupDetailsId, mobileNumber }) => ({ groupDetailsId, mobileNumber })),
//         ...addedPhones, // Add newly added phone numbers
//       ],
//       updatedBy: 1, // Add these if required
//       createdBy: 1,
//     };

//     // Dispatch the update action
//     dispatch(updateGroupDetails({ formData: updateFormData }));

//     // Call onSave to notify parent component
//     if (onSave) {
//       debugger
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

//               <div>
//                 <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
//                 {formData?.data?.mobileNumbers?.length > 0 || addedPhones.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         ...formData?.data?.mobileNumbers,
//                         ...addedPhones, // Combine existing and added phones
//                       ].map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone.mobileNumber}</td>
//                           <td className="p-3 flex space-x-2">
//                             <button
//                               onClick={(e) => {
//                                 // e.defaultPrevented();
//                                 handleDeletePhone(phone);
//                               }}
//                               className="text-red-500 hover:text-red-600"
//                             >
//                               <FaTrash />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p className="border border-gray-300 rounded-lg p-3">N/A</p>
//                 )}
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                   style={{ backgroundColor: "#134572" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                   style={{ backgroundColor: "#134572" }}
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
import { FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Add FaEdit and FaSave icons
import { useDispatch, useSelector } from "react-redux";
import { deletePhone, fetchGroupDetails, updateGroupDetails } from "../redux/tableSlice";

const UserModal = ({
  isOpen,
  onClose,
  person: selectedPerson,
  onSave, // onSave prop passed from parent component
  formData,
  onChange,
  isEditing,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState(formData?.data?.groupName || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addedPhones, setAddedPhones] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null); // Track which phone is being edited
  const [editPhoneValue, setEditPhoneValue] = useState(""); // Track edited phone value

  // Initialize formData state
  const [formState, setFormState] = useState(formData);

  useEffect(() => {
    if (isOpen && selectedPerson?.groupId) {
      dispatch(fetchGroupDetails(selectedPerson.groupId));
    }
  }, [isOpen, selectedPerson, dispatch]);

  useEffect(() => {
    // Sync local form state with updated formData prop
    setFormState(formData);
  }, [formData]);

  if (!isOpen) return null;

  // Add phone number to the table without form submission
  const handleAddPhone = () => {
    if (phoneNumber) {
      setAddedPhones([...addedPhones, { mobileNumber: phoneNumber }]);
      setPhoneNumber(""); // Clear input field after adding
    }
  };

  // Delete phone number (existing or newly added)
  const handleDeletePhone = (phone) => {
    if (phone.groupDetailsId) {
      // Handle deletion for existing phones
      const { data } = selectedPerson;
      dispatch(
        deletePhone({
          phoneId: phone.groupDetailsId,
          groupId: data?.groupId,
        })
      );
    } else {
      // Handle deletion for newly added phones
      setAddedPhones(addedPhones.filter((p) => p.mobileNumber !== phone.mobileNumber));
    }
  };

  // Enable editing for a specific phone
  const handleEditPhone = (phone) => {
    setEditingPhone(phone.mobileNumber); // Track which phone is being edited
    setEditPhoneValue(phone.mobileNumber); // Set the current value to edit
  };

  // Save the updated phone number
  const handleSaveEditedPhone = (phone) => {
    // Clone the formState object to avoid directly mutating it
    const updatedFormState = {
      ...formState, 
      data: { ...formState.data }
    };

    if (phone.groupDetailsId) {
      // Update the mobileNumbers array immutably
      const updatedPhones = updatedFormState.data.mobileNumbers.map((p) =>
        p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
      );
      updatedFormState.data.mobileNumbers = updatedPhones; // Assign the updated phones back to the copied object
    } else {
      // Update addedPhones immutably
      const updatedAddedPhones = addedPhones.map((p) =>
        p.mobileNumber === phone.mobileNumber ? { ...p, mobileNumber: editPhoneValue } : p
      );
      setAddedPhones(updatedAddedPhones); // Update the state with new phone values
    }

    // Update the form state with the modified form data
    setFormState(updatedFormState);
    setEditingPhone(null); // Stop editing after saving
  };

  const handleSave = () => {
    const updateFormData = {
      groupId: formState?.data?.groupId,
      groupName: groupName,
      isActive: formState?.data?.groupStatus === "Active", // Ensure this is a boolean
      mobileNumber: [
        ...formState?.data?.mobileNumbers
          .map(({ groupDetailsId, mobileNumber }) => ({ groupDetailsId, mobileNumber })),
        ...addedPhones, // Add newly added phone numbers
      ],
      updatedBy: 1, // Add these if required
      createdBy: 1,
    };

    // Dispatch the update action
    dispatch(updateGroupDetails({ formData: updateFormData }));

    // Call onSave to notify parent component
    if (onSave) {
      onSave(updateFormData); // Notify parent after saving
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">
          &times;
        </button>

        {isEditing && (
          <>
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(); // Call handleSave on form submit
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-lg font-medium mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={groupName}
                  onChange={({ target: { value } }) => setGroupName(value)}
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Add New Phone Number:</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="newPhoneNumber"
                    value={phoneNumber}
                    onChange={({ target: { value } }) => setPhoneNumber(value)}
                    className="border border-gray-300 rounded-lg p-3 w-full"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Phone Numbers:</label>
                {formState?.data?.mobileNumbers?.length > 0 || addedPhones.length > 0 ? (
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left">Mobile Number</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ...formState?.data?.mobileNumbers,
                        ...addedPhones, // Combine existing and added phones
                      ].map((phone, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3">
                            {editingPhone === phone.mobileNumber ? (
                              <input
                                type="text"
                                value={editPhoneValue}
                                onChange={({ target: { value } }) => setEditPhoneValue(value)}
                                className="border border-gray-300 rounded-lg p-3 w-full"
                              />
                            ) : (
                              phone.mobileNumber
                            )}
                          </td>
                          <td className="p-3 flex space-x-2">
                            {editingPhone === phone.mobileNumber ? (
                              <button
                                type="button" // Ensure this button does not submit the form
                                onClick={() => handleSaveEditedPhone(phone)}
                                className="text-green-500 hover:text-green-600"
                              >
                                <FaSave />
                              </button>
                            ) : (
                              <button
                                type="button" // Ensure this button does not submit the form
                                onClick={() => handleEditPhone(phone)}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                <FaEdit />
                              </button>
                            )}
                            <button
                              type="button" // Ensure this button does not submit the form
                              onClick={() => handleDeletePhone(phone)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="border border-gray-300 rounded-lg p-3 text-gray-500">
                    No phone numbers added.
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onCancel} // Call onCancel to cancel editing
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
// ...................................................................