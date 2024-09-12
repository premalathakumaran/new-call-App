

// if second code work delete this code ---- main code i am using now for good source --------UPDATED CODE 1--------------------------

// import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa'; 

// const UserModal = ({
//   isOpen,
//   onClose,
//   person,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
//   onEditPhone,
//   onDeletePhone
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form onSubmit={onSave} className="space-y-6">
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
//                   {formData.phones.length > 0 ? (
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
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <p className="border border-gray-300 rounded-lg p-3">{person?.name || 'N/A'}</p>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                 {person?.phones && person.phones.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {person.phones.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone}</td>
//                           <td className="p-3 flex space-x-2">
//                             <button
//                               onClick={() => onEditPhone(phone)}
//                               className="text-blue-500 hover:text-blue-600"
//                             >
//                               <FaEdit />
//                             </button>
//                             <button
//                               onClick={() => onDeletePhone(phone)}
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
//                 <p className={`border border-gray-300 rounded-lg p-3 ${person?.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
//                   {person?.status || 'N/A'}
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={onClose}
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;






// try this code  when use did not use api for delete and edit ---------------------
// import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { deletePhone } from '../redux/modalSlice'; // Adjust the path as needed

// const UserModal = ({
//   isOpen,
//   onClose,
//   person,
//   onSave,
//   formData,
//   onChange,
//   isEditing,
//   onCancel,
//   onEditPhone
// }) => {
//   const dispatch = useDispatch();

//   const handleDeletePhone = (phone) => {
//     if (window.confirm(`Are you sure you want to delete the phone number ${phone}?`)) {
//       dispatch(deletePhone(phone));
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
        
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form onSubmit={onSave} className="space-y-6">
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
//                   {formData.phones.length > 0 ? (
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
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <p className="border border-gray-300 rounded-lg p-3">{person?.name || 'N/A'}</p>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                 {person?.phones && person.phones.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {person.phones.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone}</td>
//                           <td className="p-3 flex space-x-2">
//                             <button
//                               onClick={() => onEditPhone(phone)}
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
//                 <p className={`border border-gray-300 rounded-lg p-3 ${person?.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
//                   {person?.status || 'N/A'}
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={onClose}
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;





// main code file for trying ------------UPDATED CODE 2-------------------------


// import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { updatePhoneNumber, deletePhoneNumber } from '../redux/tableSlice'; // Adjust path if necessary

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

//   if (!isOpen) return null;

//   const handleEditPhone = (phone) => {
//     dispatch(updatePhoneNumber({ id: person.id, phone }));
//     // console.log("Edit button clicked for phone:", phone);
//   };

//   const handleDeletePhone = (phone) => {
//     dispatch(deletePhoneNumber({ id: person.id, phone }));
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//       <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
//         {isEditing ? (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Edit User</h2>
//             <form onSubmit={onSave} className="space-y-6">
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
//                   {formData.phones.length > 0 ? (
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
//                   className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Person Details</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2">Name:</label>
//                 <p className="border border-gray-300 rounded-lg p-3">{person?.name || 'N/A'}</p>
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//                 {person?.phones && person.phones.length > 0 ? (
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-3 text-left">Mobile Number</th>
//                         <th className="p-3 text-left">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {person.phones.map((phone, idx) => (
//                         <tr key={idx} className="border-t">
//                           <td className="p-3">{phone}</td>
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
//                 <p className={`border border-gray-300 rounded-lg p-3 ${person?.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
//                   {person?.status || 'N/A'}
//                 </p>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserModal;






// UPDATED CODE 3-------------- Final


import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhoneNumber, deletePhoneNumber, addPhoneNumber } from '../redux/tableSlice';
import { closeModal, updateFormData, savePerson, setEditing } from '../redux/modalSlice';

const UserModal = ({
  isOpen,
  onClose,
  person,
  onSave,
  formData,
  onChange,
  isEditing,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const [newPhone, setNewPhone] = useState('');
  const [phoneToEdit, setPhoneToEdit] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  if (!isOpen) return null;

  const handleEditPhone = (phone) => {
    setPhoneToEdit(phone);
    setNewPhone(phone);
    setIsEditingPhone(true); // Show the edit input edit in person details
  };

  const handleSaveEdit = () => {
    if (newPhone.trim()) {
      dispatch(updatePhoneNumber({ id: person.id, oldPhone: phoneToEdit, newPhone: newPhone.trim() }));
      setPhoneToEdit('');
      setNewPhone('');
      setIsEditingPhone(false); // Hide the edit input
    }
  };

  const handleCancelEdit = () => {
    setPhoneToEdit('');
    setNewPhone('');
    setIsEditingPhone(false); // Hide the edit input
  };

  const handleDeletePhone = (phone) => {
    dispatch(deletePhoneNumber({ id: person.id, phone }));
  };

  const handleAddPhone = () => {
    if (newPhone.trim()) {
      dispatch(addPhoneNumber({ id: person.id, phone: newPhone.trim() }));
      setNewPhone('');
    }
  };

  const handleSave = () => {
    dispatch(savePerson()); // Dispatch to save the updated person details
    onSave(); // Additional callback if needed
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white p-16 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
        {isEditing ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="border border-gray-300 rounded-lg p-3 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Phone Number:</label>
                <select
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  className="border border-gray-300 rounded-lg p-3 w-full"
                >
                  {formData.phones.length > 0 ? (
                    formData.phones.map((phone, idx) => (
                      <option key={idx} value={phone}>
                        {phone}
                      </option>
                    ))
                  ) : (
                    <option value="">N/A</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="border border-gray-300 rounded-lg p-3 w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  style={{ backgroundColor: '#134572' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  style={{ backgroundColor: '#134572' }}
                >
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="overflow-auto max-h-[calc(90vh-4rem)] p-6 border border-gray-300 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Person Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Name:</label>
                  <p className="border border-gray-300 rounded-lg p-3">{person?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
                  {person?.phones && person.phones.length > 0 ? (
                    <table className="w-full border border-gray-300 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left">Mobile Number</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {person.phones.map((phone, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-3">{phone}</td>
                            <td className="p-3 flex space-x-2">
                              <button
                                onClick={() => handleEditPhone(phone)}
                                className="text-blue-500 hover:text-blue-600"
                              >
                                <FaEdit />
                              </button>
                              <button
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
                    <p className="border border-gray-300 rounded-lg p-3">N/A</p>
                  )}
                </div>
                {/* Phone Input (Add/Edit) */}
                <div className="mt-4 relative">
                  <label className="block text-lg font-medium mb-2">
                    {isEditingPhone ? 'Edit Phone Number:' : 'Add New Phone Number:'}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="border border-gray-300 rounded-lg p-3 w-full"
                      placeholder={isEditingPhone ? 'Enter phone number' : 'Enter new phone number'}
                    />
                    <button
                      onClick={isEditingPhone ? handleSaveEdit : handleAddPhone}
                      className={`text-white py-2 px-4 rounded-lg ${isEditingPhone ? 'hover:bg-blue-600' : 'hover:bg-green-600'}`}
                      style={{ backgroundColor: '#134572' }}
                    >
                      {isEditingPhone ? 'Save' : 'Add'}
                    </button>
                    {isEditingPhone && (
                      <button
                        onClick={handleCancelEdit}
                        className="text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                        style={{ backgroundColor: '#134572' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Status:</label>
                  <p className={`border border-gray-300 rounded-lg p-3 ${person?.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                    {person?.status || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserModal;



