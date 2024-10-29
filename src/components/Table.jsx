
// routing code ----------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { FaSyncAlt } from 'react-icons/fa';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNumber, setSelectedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const handleEdit = (id, isEditMode) => {
//     dispatch(fetchGroupDetails(id));
//     setIsEditing(isEditMode);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token })).then(() => {
//           dispatch(fetchTableData(token));
//         });
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(updateGroupDetails({ formData, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//           setIsModalOpen(false);
//           setIsEditing(false);
//         });
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setIsEditing(false);
//     dispatch(clearSelectedPerson());
//   };

//   const handleRegenerate = (groupId) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(regenerateGroupCode({ groupId, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//         });
//     }
//   };

//   const handleNumberSelect = (e, groupId) => {
//     const number = e.target.value;
//     setSelectedNumber(number);
//     if (number) {
//       navigate(`/group2/${number}`);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => 
//       phone.mobileNumber.toLowerCase().includes(searchQuery) ||
//       (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery))
//     ) ||
//     item?.groupCode?.toLowerCase().includes(searchQuery) ||
//     (item?.isActive ? 'active' : 'inactive').includes(searchQuery)
//   );

//   const deduplicatePhones = (phones) => {
//     return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
//       .map((mobileNumber) => 
//         phones.find((phone) => phone.mobileNumber === mobileNumber)
//       );
//   };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="flex-1 p-4">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="border border-gray-500 rounded-lg px-4 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="overflow-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="p-3 text-left">Group Name</th>
//               <th className="p-3 text-left">GroupCode</th>
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td className="p-3 cursor-pointer text-black-500">
//                     {item.groupName || 'N/A'} 
//                   </td>
//                   <td className="p-3 cursor-pointer text-black-500">
//                     {item.groupCode || 'N/A'}
//                     <button
//                       className="ml-2 text-blue-500 hover:text-blue-600"
//                       onClick={() => handleRegenerate(item.groupId)}
//                       title="Reload Code"
//                     >
//                       <FaSyncAlt size={16} />
//                     </button>
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
//                       <select 
//                         className="border border-gray-300 rounded-lg px-2 py-1"
//                         onChange={(e) => handleNumberSelect(e, item.groupId)}
//                         value={selectedNumber}
//                       >
//                         <option value="">Select a number</option>
//                         {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
//                           <option key={idx} value={phone.mobileNumber}>
//                             {phone.mobileNumberWithHypens || phone.mobileNumber}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className="p-3 text-green-500">
//                     Active
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="p-3 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={handleCancel}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;


// main code------------final code---------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { FaSyncAlt } from 'react-icons/fa';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNumber, setSelectedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const handleEdit = (id, isEditMode) => {
//     dispatch(fetchGroupDetails(id));
//     setIsEditing(isEditMode);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token })).then(() => {
//           dispatch(fetchTableData(token));
//         });
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(updateGroupDetails({ formData, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//           setIsModalOpen(false);
//           setIsEditing(false);
//         });
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setIsEditing(false);
//     dispatch(clearSelectedPerson());
//   };

//   const handleRegenerate = (groupId) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(regenerateGroupCode({ groupId, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//         });
//     }
//   };

//   const handleNumberSelect = (e, groupId) => {
//     const number = e.target.value;
//     setSelectedNumber(number);
//     if (number) {
//       navigate(`/admin/group?number=${number}`);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => 
//       phone.mobileNumber.toLowerCase().includes(searchQuery) ||
//       (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery))
//     ) ||
//     item?.groupCode?.toLowerCase().includes(searchQuery) ||
//     (item?.isActive ? 'active' : 'inactive').includes(searchQuery)
//   );

//   const deduplicatePhones = (phones) => {
//     return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
//       .map((mobileNumber) => 
//         phones.find((phone) => phone.mobileNumber === mobileNumber)
//       );
//   };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="flex-1 p-4">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="border border-gray-500 rounded-lg px-4 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="overflow-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="p-3 text-left">Group Name</th>
//               <th className="p-3 text-left">GroupCode</th>
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td className="p-3 cursor-pointer text-black-500">
//                     {item.groupName || 'N/A'} 
//                   </td>
//                   <td className="p-3 cursor-pointer text-black-500">
//                     {item.groupCode || 'N/A'}
//                     <button
//                       className="ml-2 text-blue-500 hover:text-blue-600"
//                       onClick={() => handleRegenerate(item.groupId)}
//                       title="Reload Code"
//                     >
//                       <FaSyncAlt size={16} />
//                     </button>
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
//                       <select 
//                         className="border border-gray-300 rounded-lg px-2 py-1"
//                         onChange={(e) => handleNumberSelect(e, item.groupId)}
//                         value={selectedNumber}
//                       >
//                         <option value="">Select a number</option>
//                         {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
//                           <option key={idx} value={phone.mobileNumber}>
//                             {phone.mobileNumberWithHypens || phone.mobileNumber}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className="p-3 text-green-500">
//                     Active
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="p-3 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={handleCancel}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;


//------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { FaSyncAlt } from 'react-icons/fa';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNumber, setSelectedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const handleEdit = (id, isEditMode) => {
//     dispatch(fetchGroupDetails(id));
//     setIsEditing(isEditMode);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token })).then(() => {
//           dispatch(fetchTableData(token));
//         });
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       // Ensure mobileNumber array has proper structure
//       const updatedFormData = {
//         ...formData,
//         mobileNumber: formData.mobileNumber.map(phone => ({
//           ...phone,
//           groupDetailsId: phone.groupDetailsId || null, // Handle undefined groupDetailsId
//           mobileNumber: phone.mobileNumber,
//           mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber)
//         }))
//       };

//       dispatch(updateGroupDetails({ formData: updatedFormData, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//           setIsModalOpen(false);
//           setIsEditing(false);
//         });
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setIsEditing(false);
//     dispatch(clearSelectedPerson());
//   };

//   const handleRegenerate = (groupId) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(regenerateGroupCode({ groupId, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//         });
//     }
//   };

//   const handleNumberSelect = (e, groupId) => {
//     const number = e.target.value;
//     setSelectedNumber(number);
//     if (number) {
//       navigate(`/admin/group?number=${number}`);
//     }
//   };

//   const formatPhoneNumberWithHyphen = (number) => {
//     if (!number) return '';
//     const cleaned = number.replace(/\D/g, '');
//     const match = cleaned.match(/^(\d{2})(\d{10})$/);
//     if (match) {
//       return `+${match[1]}-${match[2]}`;
//     }
//     return number;
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => 
//       phone.mobileNumber.toLowerCase().includes(searchQuery) ||
//       (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery))
//     ) ||
//     item?.groupCode?.toLowerCase().includes(searchQuery) ||
//     (item?.isActive ? 'active' : 'inactive').includes(searchQuery)
//   );

//   const deduplicatePhones = (phones) => {
//     return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
//       .map((mobileNumber) => {
//         const phone = phones.find((p) => p.mobileNumber === mobileNumber);
//         return {
//           ...phone,
//           mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber)
//         };
//       });
//   };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="flex-1 p-4">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="border border-gray-500 rounded-lg px-4 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="overflow-auto max-h-96">
//       <table className="min-w-full  divide-y divide-gray-300">
//   <thead style={{ backgroundColor: '#E6E6E6' }}>
//     <tr>
//       <th className="p-4 text-left">Group Name</th>
//       <th className="p-4 text-left">Group Code</th>
//       <th className="p-4 text-left">Mobile Numbers</th>
//       <th className="p-4 text-left">Status</th>
//       <th className="p-4 text-left">Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {filteredData.length > 0 ? (
//       filteredData.map((item) => (
//         <React.Fragment key={item.groupId}>
//           <tr>
//             <td className="p-4 cursor-pointer text-black">
//               {item.groupName || 'N/A'} 
//             </td>
//             <td className="p-4 cursor-pointer text-black">
//               {item.groupCode || 'N/A'}
//               <button
//                 className="ml-2 text-blue-500 hover:text-blue-600"
//                 onClick={() => handleRegenerate(item.groupId)}
//                 title="Reload Code"
//               >
//                 <FaSyncAlt size={16} />
//               </button>
//             </td>
//             <td className="p-4">
//               {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
//                 <select 
//                   className="border border-gray-300 rounded-lg px-2 py-1"
//                   onChange={(e) => handleNumberSelect(e, item.groupId)}
//                   value={selectedNumber}
//                 >
//                   <option value="">Select a number</option>
//                   {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
//                     <option key={idx} value={phone.mobileNumber}>
//                       {phone.mobileNumberWithHypens}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <span>N/A</span>
//               )}
//             </td>
//             <td className="p-4 text-green-500">
//               {item.isActive ? 'Active' : 'Inactive'}
//             </td>
//             <td className="p-4">
//               <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//               <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//             </td>
//           </tr>
//           {/* Line separating each group */}
//           <tr>
//             <td colSpan="5" className="border-b border-gray-300"></td>
//           </tr>
//         </React.Fragment>
//       ))
//     ) : (
//       <tr>
//         <td colSpan="5" className="p-4 text-center">No data available</td>
//       </tr>
//     )}
//   </tbody>
// </table>

//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={handleCancel}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;

// ------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useOutletContext } from 'react-router-dom';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { FaSyncAlt } from 'react-icons/fa';
// import UserModal from './UserModal';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const Table = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchQuery = useOutletContext();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedNumber, setSelectedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const formatPhoneNumberWithHyphen = (number) => {
//     if (!number) return '';
    
//     // Remove any existing formatting
//     const cleaned = number.replace(/\D/g, '');
    
//     // Try to parse the phone number
//     const phoneObj = parsePhoneNumberFromString('+' + cleaned);
//     if (!phoneObj) return number;

//     // Return formatted number with hyphen after country code
//     return `+${phoneObj.countryCallingCode}-${phoneObj.nationalNumber}`;
//   };

//   const handleEdit = (id, isEditMode) => {
//     dispatch(fetchGroupDetails(id));
//     setIsEditing(isEditMode);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token })).then(() => {
//           dispatch(fetchTableData(token));
//         });
//       }
//     }
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       const updatedFormData = {
//         ...formData,
//         mobileNumber: formData.mobileNumber.map(phone => ({
//           ...phone,
//           groupDetailsId: phone.groupDetailsId || null,
//           mobileNumber: phone.mobileNumber,
//           mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber),
//         })),
//       };

//       dispatch(updateGroupDetails({ formData: updatedFormData, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//           setIsModalOpen(false);
//           setIsEditing(false);
//         });
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setIsEditing(false);
//     dispatch(clearSelectedPerson());
//   };

//   const handleRegenerate = (groupId) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(regenerateGroupCode({ groupId, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//         });
//     }
//   };

//   const handleNumberSelect = (e, groupId) => {
//     const number = e.target.value;
//     setSelectedNumber(number);
//     if (number) {
//       navigate(`/admin/group?number=${number}`);
//     }
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) =>
//       phone.mobileNumber.toLowerCase().includes(searchQuery) ||
//       (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery))
//     ) ||
//     item?.groupCode?.toLowerCase().includes(searchQuery) ||
//     (item?.isActive ? 'active' : 'inactive').includes(searchQuery)
//   );

//   const deduplicatePhones = (phones) => {
//     return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
//       .map((mobileNumber) => {
//         const phone = phones.find((p) => p.mobileNumber === mobileNumber);
//         return {
//           ...phone,
//           mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber),
//         };
//       });
//   };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="flex-1">
//       <div className="overflow-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead style={{ backgroundColor: '#F7F7F7' }}>
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold">Group Name</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold">Group Code</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold">Mobile Numbers</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <React.Fragment key={item.groupId}>
//                   <tr>
//                     <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
//                       {item.groupName || 'N/A'}
//                     </td>
//                     <td className="px-4 py-2 text-gray-500 text-sm cursor-pointer">
//                       {item.groupCode || 'N/A'}
//                       <button
//                         className="ml-1 text-blue-500 hover:text-blue-600"
//                         onClick={() => handleRegenerate(item.groupId)}
//                         title="Reload Code"
//                       >
//                         <FaSyncAlt size={16} />
//                       </button>
//                     </td>
//                     <td className="px-4 py-2 text-sm">
//                       {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
//                         <select
//                           className="border border-gray-300 rounded-lg px-1 py-1 text-sm"
//                           onChange={(e) => handleNumberSelect(e, item.groupId)}
//                           value={selectedNumber}
//                         >
//                           <option value="">Select a number</option>
//                           {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
//                             <option key={idx} value={phone.mobileNumber}>
//                               {phone.mobileNumberWithHypens}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <span>N/A</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-green-500">
//                      {item.isActive !== false ? 'Active' : 'Inactive'}
//                     </td>
//                     <td className="px-4 py-2 text-sm">
//                       <button onClick={() => handleEdit(item.groupId, true)} className="mr-4 text-blue-500">Edit</button>
//                       <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="5" className="border-b border-gray-300"></td>
//                   </tr>
//                 </React.Fragment>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={handleCancel}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;


// extra feature like toastyting is added----------------------------------
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  fetchTableData,
  fetchGroupDetails,
  clearSelectedPerson,
  deleteGroup,
  updateGroupDetails,
  regenerateGroupCode,
} from '../redux/tableSlice';
import { selectMobileNumbers } from '../redux/groupSlice';
import { FaSyncAlt } from 'react-icons/fa';
import UserModal from './UserModal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useOutletContext();
  const data = useSelector((state) => state.table.data);
  const status = useSelector((state) => state.table.status);
  const error = useSelector((state) => state.table.error);
  const selectedPerson = useSelector((state) => state.table.selectedPerson);
  const mobileNumbers = useSelector(selectMobileNumbers);

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (status === 'idle' && token) {
      dispatch(fetchTableData(token));
    }
  }, [status, dispatch]);

  const formatPhoneNumberWithHyphen = (number) => {
    if (!number) return '';
    const cleaned = number.replace(/\D/g, '');
    const phoneObj = parsePhoneNumberFromString('+' + cleaned);
    if (!phoneObj) return number;
    return `+${phoneObj.countryCallingCode}-${phoneObj.nationalNumber}`;
  };

  const handleEdit = (id, isEditMode) => {
    dispatch(fetchGroupDetails(id));
    setIsEditing(isEditMode);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          await dispatch(deleteGroup({ groupId: id, token })).unwrap();
          await dispatch(fetchTableData(token));
          toast.success('Group has been successfully deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          toast.error(error.message || 'Failed to delete group', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    }
  };

  const handleSave = (formData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const updatedFormData = {
        ...formData,
        mobileNumber: formData.mobileNumber.map(phone => ({
          ...phone,
          groupDetailsId: phone.groupDetailsId || null,
          mobileNumber: phone.mobileNumber,
          mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber),
        })),
      };

      dispatch(updateGroupDetails({ formData: updatedFormData, token }))
        .then(() => {
          dispatch(fetchTableData(token));
          setIsModalOpen(false);
          setIsEditing(false);
          toast.success('Group details updated successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to update group details', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  };

  const handleRegenerate = async (groupId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        await dispatch(regenerateGroupCode({ groupId, token })).unwrap();
        await dispatch(fetchTableData(token));
        toast.success('Group code regenerated successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        toast.error(error.message || 'Failed to regenerate group code', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    dispatch(clearSelectedPerson());
  };

  const handleNumberSelect = (e, groupId) => {
    const number = e.target.value;
    setSelectedNumber(number);
    if (number) {
      navigate(`/admin/group?number=${number}`);
    }
  };

  const filteredData = data.filter((item) =>
    item?.groupName?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    item?.mobileNumbers?.some((phone) =>
      phone.mobileNumber.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
      (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery?.toLowerCase() || ''))
    ) ||
    item?.groupCode?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    (item?.isActive ? 'active' : 'inactive').includes(searchQuery?.toLowerCase() || '')
  );

  const deduplicatePhones = (phones) => {
    return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
      .map((mobileNumber) => {
        const phone = phones.find((p) => p.mobileNumber === mobileNumber);
        return {
          ...phone,
          mobileNumberWithHypens: phone.mobileNumberWithHypens || formatPhoneNumberWithHyphen(phone.mobileNumber),
        };
      });
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="flex-1">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="overflow-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-300">
          <thead style={{ backgroundColor: '#F7F7F7' }}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Group Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Group Code</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Mobile Numbers</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <React.Fragment key={item.groupId}>
                  <tr>
                    <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
                      {item.groupName || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-gray-500 text-sm cursor-pointer">
                      {item.groupCode || 'N/A'}
                      <button
                        className="ml-1 text-blue-500 hover:text-blue-600"
                        onClick={() => handleRegenerate(item.groupId)}
                        title="Reload Code"
                      >
                        <FaSyncAlt size={16} />
                      </button>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
                        <select
                          className="border border-gray-300 rounded-lg px-1 py-1 text-sm"
                          onChange={(e) => handleNumberSelect(e, item.groupId)}
                          value={selectedNumber}
                        >
                          <option value="">Select a number</option>
                          {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
                            <option key={idx} value={phone.mobileNumber}>
                              {phone.mobileNumberWithHypens}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-green-500">
                      {item.isActive !== false ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button 
                        onClick={() => handleEdit(item.groupId, true)} 
                        className="mr-4 text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.groupId)} 
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="border-b border-gray-300"></td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedPerson && (
        <UserModal
          isOpen={isModalOpen}
          onClose={handleCancel}
          person={selectedPerson}
          onSave={handleSave}
          formData={selectedPerson}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Table;