
// trying code 2---------final code ------------------

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import UserModal from './UserModal';
// import { FaSyncAlt } from 'react-icons/fa';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

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
//         });
//     }
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
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


//                   {/* <td className="p-3 cursor-pointer text-black-500">
//                     {item.groupCode || 'N/A'}
//                     <button
//                       className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       onClick={() => handleRegenerate(item.groupId)}
//                     >
//                       Regenerate
//                     </button>
//                   </td> */}


// <td className="p-3 cursor-pointer text-black-500">
//   {item.groupCode || 'N/A'}
//   <button
//     className="ml-2 text-blue-500 hover:text-blue-600"
//     onClick={() => handleRegenerate(item.groupId)}
//     title="Reload Code"
//   >
//     <FaSyncAlt size={16} />
//   </button>
// </td>


//                   <td className="p-3">
//                     {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
//                       <select className="border border-gray-300 rounded-lg px-2 py-1">
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


//                   {/* <td className={`p-3 ${item.isActive ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.isActive ? 'Active' : 'Inactive'}
//                   </td> */}

//             <td className="p-3 text-green-500">
//              Active
//             </td>


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



// selecting number code -------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { fetchRelatedNumbers, clearRelatedNumbers } from '../redux/relatedNumbersSlice';
// import UserModal from './UserModal';
// import { FaSyncAlt } from 'react-icons/fa';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);

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

  // const handleEdit = (id, isEditMode) => {
  //   dispatch(fetchGroupDetails(id));
  //   setIsEditing(isEditMode);
  //   setIsModalOpen(true);
  // };

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
//         });
//     }
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
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
//     const selectedNumber = e.target.value;
//     setSelectedNumber(selectedNumber);
//     if (selectedNumber) {
//       dispatch(fetchRelatedNumbers(selectedNumber));
//     } else {
//       dispatch(clearRelatedNumbers());
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

//       {selectedNumber && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Related Numbers:</h3>
//           {relatedNumbersStatus === 'loading' && <p>Loading related numbers...</p>}
//           {relatedNumbersStatus === 'failed' && <p>Error: {relatedNumbersError}</p>}
//           {relatedNumbersStatus === 'succeeded' && (
//             <ul>
//               {relatedNumbers.length > 0 ? (
//                 relatedNumbers.map((number, index) => (
//                   <li key={index}>{number.receiverNumber}</li>
//                 ))
//               ) : (
//                 <li>No related numbers found</li>
//               )}
//             </ul>
//           )}
//         </div>
//       )}

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



// showing history-----------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { fetchRelatedNumbers, clearRelatedNumbers, fetchRelatedNumberDetails } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import UserModal from './UserModal';
// import NoteHistory from './NoteHistory';
// import { FaSyncAlt } from 'react-icons/fa';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector((state) => state.relatedNumbers.selectedNumberDetails);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNumber, setSelectedNumber] = useState('');
//   const [selectedRelatedNumber, setSelectedRelatedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const handleEdit = (id) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(fetchGroupDetails({ groupId: id, token })).then(() => {
//         setIsEditing(true);
//         setIsModalOpen(true);
//       });
//     }
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
//     setSelectedRelatedNumber('');
//     dispatch(clearNotes());
//     dispatch(clearRelatedNumbers());
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//   };

//   const handleRelatedNumberClick = (relatedNumber) => {
//     setSelectedRelatedNumber(relatedNumber);
//     const token = localStorage.getItem('jwt');
//     if (token && selectedNumber && relatedNumber) {
//       dispatch(fetchNotes({ senderNumber: selectedNumber, receiverNumber: relatedNumber, token }));
//       dispatch(fetchRelatedNumberDetails({ senderNumber: selectedNumber, receiverNumber: relatedNumber, token }));
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
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Numbers</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Code</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredData.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{item.groupName}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <select 
//                     onChange={(e) => handleNumberSelect(e, item.id)}
//                     className="border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select a number</option>
//                     {deduplicatePhones(item.mobileNumbers).map((phone, index) => (
//                       <option key={index} value={phone.mobileNumber}>
//                         {phone.mobileNumberWithHypens || phone.mobileNumber}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {item.groupCode}
//                   <button
//                     onClick={() => handleRegenerate(item.id)}
//                     className="ml-2 text-blue-600 hover:text-blue-900"
//                   >
//                     <FaSyncAlt />
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {item.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button onClick={() => handleEdit(item.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
//                   <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedNumber && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Related Numbers:</h3>
//           {relatedNumbersStatus === 'loading' && <p>Loading related numbers...</p>}
//           {relatedNumbersStatus === 'failed' && <p>Error: {relatedNumbersError}</p>}
//           {relatedNumbersStatus === 'succeeded' && (
//             <ul>
//               {relatedNumbers.length > 0 ? (
//                 relatedNumbers.map((number, index) => (
//                   <li 
//                     key={index} 
//                     onClick={() => handleRelatedNumberClick(number.receiverNumber)}
//                     className="cursor-pointer text-blue-500 hover:text-blue-700"
//                   >
//                     {number.receiverNumber}
//                   </li>
//                 ))
//               ) : (
//                 <li>No related numbers found</li>
//               )}
//             </ul>
//           )}
//         </div>
//       )}

//       {selectedRelatedNumber && selectedNumberDetails && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Selected Number Details:</h3>
//           <p><strong>Number:</strong> {selectedNumberDetails.number}</p>
//           <p><strong>Name:</strong> {selectedNumberDetails.name}</p>
//           <p><strong>Email:</strong> {selectedNumberDetails.email}</p>
//           {/* Add more details as needed */}
//         </div>
//       )}

//       {selectedNumber && selectedRelatedNumber && <NoteHistory />}

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


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
//   regenerateGroupCode,
// } from '../redux/tableSlice';
// import { selectMobileNumbers } from '../redux/groupSlice';
// import { fetchRelatedNumbers, clearRelatedNumbers, fetchRelatedNumberDetails } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import UserModal from './UserModal';
// import NoteHistory from './NoteHistory';
// import { FaSyncAlt } from 'react-icons/fa';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector((state) => state.relatedNumbers.selectedNumberDetails);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedNumber, setSelectedNumber] = useState('');
//   const [selectedRelatedNumber, setSelectedRelatedNumber] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   // const handleEdit = (id) => {
//   //   const token = localStorage.getItem('jwt');
//   //   if (token) {
//   //     dispatch(fetchGroupDetails({ groupId: id, token })).then(() => {
//   //       setIsEditing(true);
//   //       setIsModalOpen(true);
//   //     });
//   //   }
//   // };

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
//     setSelectedRelatedNumber('');
//     dispatch(clearNotes());
//     dispatch(clearRelatedNumbers());
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//   };

//   const handleRelatedNumberClick = (relatedNumber) => {
//     setSelectedRelatedNumber(relatedNumber);
//     const token = localStorage.getItem('jwt');
//     if (token && selectedNumber && relatedNumber) {
//       dispatch(fetchNotes({ senderNumber: selectedNumber, receiverNumber: relatedNumber, token }));
//       dispatch(fetchRelatedNumberDetails({ senderNumber: selectedNumber, receiverNumber: relatedNumber, token }));
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

//       {selectedNumber && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Related Numbers:</h3>
//           {relatedNumbersStatus === 'loading' && <p>Loading related numbers...</p>}
//           {relatedNumbersStatus === 'failed' && <p>Error: {relatedNumbersError}</p>}
//           {relatedNumbersStatus === 'succeeded' && (
//             <ul>
//               {relatedNumbers.length > 0 ? (
//                 relatedNumbers.map((number, index) => (
//                   <li 
//                     key={index} 
//                     onClick={() => handleRelatedNumberClick(number.receiverNumber)}
//                     className="cursor-pointer text-blue-500 hover:text-blue-700"
//                   >
//                     {number.receiverNumber}
//                   </li>
//                 ))
//               ) : (
//                 <li>No related numbers found</li>
//               )}
//             </ul>
//           )}
//         </div>
//       )}

//       {selectedRelatedNumber && selectedNumberDetails && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Selected Number Details:</h3>
//           {/* <p><strong>Number:</strong> {selectedNumberDetails.number}</p>
//           <p><strong>Name:</strong> {selectedNumberDetails.name}</p>
//           <p><strong>Email:</strong> {selectedNumberDetails.email}</p> */}
//           {/* Add more details as needed */}
//         </div>
//       )}

//       {selectedNumber && selectedRelatedNumber && <NoteHistory />}

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


// main code---------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.table.data);
  const status = useSelector((state) => state.table.status);
  const error = useSelector((state) => state.table.error);
  const selectedPerson = useSelector((state) => state.table.selectedPerson);
  const mobileNumbers = useSelector(selectMobileNumbers);

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (status === 'idle' && token) {
      dispatch(fetchTableData(token));
    }
  }, [status, dispatch]);

  const handleEdit = (id, isEditMode) => {
    dispatch(fetchGroupDetails(id));
    setIsEditing(isEditMode);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      const token = localStorage.getItem('jwt');
      if (token) {
        dispatch(deleteGroup({ groupId: id, token })).then(() => {
          dispatch(fetchTableData(token));
        });
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSave = (formData) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      dispatch(updateGroupDetails({ formData, token }))
        .then(() => {
          dispatch(fetchTableData(token));
          setIsModalOpen(false);
          setIsEditing(false);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    dispatch(clearSelectedPerson());
  };

  const handleRegenerate = (groupId) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      dispatch(regenerateGroupCode({ groupId, token }))
        .then(() => {
          dispatch(fetchTableData(token));
        });
    }
  };

  const handleNumberSelect = (e, groupId) => {
    const number = e.target.value;
    setSelectedNumber(number);
    if (number) {
      navigate(`/admin/group?number=${number}`);
    }
  };

  const filteredData = data.filter((item) =>
    item?.groupName?.toLowerCase().includes(searchQuery) ||
    item?.mobileNumbers?.some((phone) => 
      phone.mobileNumber.toLowerCase().includes(searchQuery) ||
      (phone.mobileNumberWithHypens && phone.mobileNumberWithHypens.toLowerCase().includes(searchQuery))
    ) ||
    item?.groupCode?.toLowerCase().includes(searchQuery) ||
    (item?.isActive ? 'active' : 'inactive').includes(searchQuery)
  );

  const deduplicatePhones = (phones) => {
    return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
      .map((mobileNumber) => 
        phones.find((phone) => phone.mobileNumber === mobileNumber)
      );
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="flex-1 p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-500 rounded-lg px-4 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="p-3 text-left">Group Name</th>
              <th className="p-3 text-left">GroupCode</th>
              <th className="p-3 text-left">Mobile Numbers</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.groupId}>
                  <td className="p-3 cursor-pointer text-black-500">
                    {item.groupName || 'N/A'} 
                  </td>
                  <td className="p-3 cursor-pointer text-black-500">
                    {item.groupCode || 'N/A'}
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-600"
                      onClick={() => handleRegenerate(item.groupId)}
                      title="Reload Code"
                    >
                      <FaSyncAlt size={16} />
                    </button>
                  </td>
                  <td className="p-3">
                    {item.mobileNumbers && item.mobileNumbers.length > 0 ? (
                      <select 
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        onChange={(e) => handleNumberSelect(e, item.groupId)}
                        value={selectedNumber}
                      >
                        <option value="">Select a number</option>
                        {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
                          <option key={idx} value={phone.mobileNumber}>
                            {phone.mobileNumberWithHypens || phone.mobileNumber}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td className="p-3 text-green-500">
                    Active
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
                    <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">No data available</td>
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