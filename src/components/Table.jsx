
// main code with backend api--------for group form -----------------------

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   updateTableItem,
//   deleteTableItem,
//   selectPerson,
//   clearSelectedPerson,
// } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

//   const [isEditing, setIsEditing] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [formData, setFormData] = useState({ groupName: '', mobileNumbers: [], groupStatus: '' });
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch data when component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('jwt'); // Use JWT token for authentication
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   // If a person is selected, populate formData
//   useEffect(() => {
//     if (selectedPerson) {
//       setFormData({
//         groupName: selectedPerson.groupName || '',
//         mobileNumbers: selectedPerson.mobileNumbers || [],
//         groupStatus: selectedPerson.groupStatus || 'true',
//       });
//       setIsEditing(false);
//     }
//   }, [selectedPerson]);

//   // Handle edit
//   const handleEdit = (id) => {
//     const index = data.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       setCurrentIndex(index);
//       setFormData({
//         groupName: data[index].groupName || '',
//         mobileNumbers: data[index].mobileNumbers || [],
//         groupStatus: data[index].groupStatus || 'true',
//       });
//       setIsEditing(true);
//     }
//   };

//   // Handle delete
//   const handleDelete = (id) => {
//     dispatch(deleteTableItem(id));
//   };

//   // Handle search
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   // Filter data based on search query
//   const filteredData = data.filter((item) =>
//     item.groupName.toLowerCase().includes(searchQuery) ||
//     item.mobileNumbers.some((phone) => typeof phone.mobileNumber === 'string' && phone.mobileNumber.includes(searchQuery)) ||
//     item.groupStatus.toLowerCase().includes(searchQuery)
//   );

//   // Render status messages or errors
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

//       <table className="min-w-full divide-y divide-gray-200">
//         <thead>
//           <tr>
//             <th className="p-3 text-left">Group Name</th>
//             <th className="p-3 text-left">Mobile Numbers</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((item) => (
//               <tr key={item.id}> {/* Use a unique identifier as key */}
//                 <td className="p-3 cursor-pointer text-blue-500 underline" onClick={() => handleEdit(item.id)}>
//                   {item.groupName || 'N/A'}
//                 </td>
//                 <td className="p-3">
//                   {item.mobileNumbers.length > 0 ? (
//                     item.mobileNumbers.map((phone, idx) => (
//                       <span key={idx} className="block">{phone.mobileNumber}</span>
//                     ))
//                   ) : (
//                     <span>N/A</span>
//                   )}
//                 </td>
//                 <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                   {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                 </td>
//                 <td className="p-3">
//                   <button onClick={() => handleEdit(item.id)} className="mr-6 text-blue-500">Edit</button>
//                   <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="p-3 text-center">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {isEditing && (
//         <UserModal
//           formData={formData}
//           setFormData={setFormData}
//           onClose={() => setIsEditing(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;



// main file ---------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTableData, fetchGroupDetails, clearSelectedPerson, deleteGroup } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModelOpen, setIsModelOpen] = useState(false);

//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (status === 'idle' && token) {
//       dispatch(fetchTableData(token));
//     }
//   }, [status, dispatch]);

//   const handleEdit = (id,isEditMode) => {
  
//     dispatch(fetchGroupDetails(id));
//     setIsEditing(isEditMode);
//     setIsModelOpen(true);
//   };

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token }));
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredData = data.filter((item) =>
//     item.groupName.toLowerCase().includes(searchQuery) ||
//     item.mobileNumbers.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
//     item.groupStatus.toLowerCase().includes(searchQuery)
//   );

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

//       {/* Table container with horizontal and vertical scrolling */}
//       <div className="overflow-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="p-3 text-left">Group Name</th>
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td className="p-3 cursor-pointer text-blue-500 underline" onClick={() => handleEdit(item.groupId,false)}>
//                     {item.groupName || 'N/A'}
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers.length > 0 ? (
//                       item.mobileNumbers.map((phone, idx) => (
//                         <span key={idx} className="block">{phone.mobileNumber}</span>
//                       ))
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId,true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModelOpen}
//           onClose={() => {
//             setIsModelOpen(false);
//             dispatch(clearSelectedPerson());
//           }}
//           person={selectedPerson}
//           onSave={(e) => {
//             e.preventDefault();
//             // Implement your form submission logic here
//             setIsModelOpen(false);
//           }}
//           formData={{
//             groupName: selectedPerson.groupName || '',
//             mobileNumbers: selectedPerson.mobileNumbers || [],
//             groupStatus: selectedPerson.groupStatus || 'true',
//           }}
//           onChange={(e) => {
//             // Implement your form change logic here
//           }}
//           isEditing={isEditing}
//           onEdit={() => setIsModelOpen(true)}
//           onCancel={() => setIsModelOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;


// domi file ----------------------------------------------------------------------

// import React, { useState, useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails, // Add this new action in your slice
// } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
// console.log({selectedPerson});
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
        
//         dispatch(deleteGroup({ groupId: id, token }));
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(updateGroupDetails({ formData, token }));
//     }
//     setIsModalOpen(false);
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
//     item?.groupStatus?.toLowerCase().includes(searchQuery)
//   );

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
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td className="p-3 cursor-pointer text-blue-500 underline" onClick={() => handleEdit(item.groupId, false)}>
//                     {item.groupName || 'N/A'}
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers.length > 0 ? (
//                       item.mobileNumbers.map((phone, idx) => (
//                         <span key={idx} className="block">{phone.mobileNumber}</span>
//                       ))
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             dispatch(clearSelectedPerson());
//           }}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//           onEdit={() => setIsModalOpen(true)}  
//           onCancel={() => setIsModalOpen(false)}  
//         />
//       )}
//     </div>
//   );
// };

// export default Table;





//  All error cleared code -------------------------------------..............................
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
// } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

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
//         dispatch(deleteGroup({ groupId: id, token }));
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       // Dispatch update and refetch the table data after the update
//       dispatch(updateGroupDetails({ formData, token }))
//         .then(() => {
//           // Refetch table data after update is successful
//           dispatch(fetchTableData(token));
//         });
//     }
//     setIsModalOpen(false); // Close the modal after saving
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
//     item?.groupStatus?.toLowerCase().includes(searchQuery)
//   );

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
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td
//                     className="p-3 cursor-pointer text-blue-500 underline"
//                     onClick={() => handleEdit(item.groupId, false)}
//                   >
//                     {item.groupName || 'N/A'}
//                   </td>
//                   {/* <td className="p-3">
//                     {item.mobileNumbers.length > 0 ? (
//                       item.mobileNumbers.map((phone, idx) => (
//                         <span key={idx} className="block">{phone.mobileNumber}</span>
//                       ))
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td> */}

// <td className="p-3">
//   {item.mobileNumbers.length > 0 ? (
//     <select className="border border-gray-300 rounded-lg px-2 py-1">
//       {item.mobileNumbers.map((phone, idx) => (
//         <option key={idx} value={phone.mobileNumber}>
//           {phone.mobileNumber}
//         </option>
//       ))}
//     </select>
//   ) : (
//     <span>N/A</span>
//   )}
// </td>
//                   <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {selectedPerson && (
//         <UserModal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             dispatch(clearSelectedPerson());
//           }}
//           person={selectedPerson}
//           onSave={handleSave}
//           formData={selectedPerson}
//           isEditing={isEditing}
//         />
//       )}
//     </div>
//   );
// };

// export default Table;

// most most mporant code ------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
// } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

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
//         dispatch(deleteGroup({ groupId: id, token }));
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const handleSave = (formData) => {
//     debugger
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       dispatch(updateGroupDetails({ formData, token }))
//         .then(() => {
//           dispatch(fetchTableData(token));
//         });
//     }
//     setIsModalOpen(false); // Close the modal after saving
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     dispatch(clearSelectedPerson()); // Clear selected person if necessary
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
//     item?.groupStatus?.toLowerCase().includes(searchQuery)
//   );

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
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td
//                     className="p-3 cursor-pointer text-black-500"
//                     // onClick={() => handleEdit(item.groupId, false)}
//                   >
//                     {item.groupName || 'N/A'}
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers.length > 0 ? (
//                       <select className="border border-gray-300 rounded-lg px-2 py-1">
//                         {item.mobileNumbers.map((phone, idx) => (
//                           <option key={idx} value={phone.mobileNumber}>
//                             {phone.mobileNumber}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available</td>
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




// this for editing within the table ---------to remove duplicate values in mobile number ----------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchTableData,
//   fetchGroupDetails,
//   clearSelectedPerson,
//   deleteGroup,
//   updateGroupDetails,
// } from '../redux/tableSlice';
// import UserModal from './UserModal';

// const Table = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.table.data);
//   const status = useSelector((state) => state.table.status);
//   const error = useSelector((state) => state.table.error);
//   const selectedPerson = useSelector((state) => state.table.selectedPerson);

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

//   // const handleDelete = (id) => {
//   //   const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//   //   if (confirmDelete) {
//   //     const token = localStorage.getItem('jwt');
//   //     if (token) {
//   //       dispatch(deleteGroup({ groupId: id, token }));
//   //     }
//   //   }
//   // };


//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this group?');
//     if (confirmDelete) {
//       const token = localStorage.getItem('jwt');
//       if (token) {
//         dispatch(deleteGroup({ groupId: id, token })).then(() => {
//           // After successful deletion, re-fetch the updated data
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
//     setIsModalOpen(false); // Close the modal after saving
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     dispatch(clearSelectedPerson()); // Clear selected person if necessary
//   };

//   const filteredData = data.filter((item) =>
//     item?.groupName?.toLowerCase().includes(searchQuery) ||
//     item?.mobileNumbers?.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
//     item?.groupStatus?.toLowerCase().includes(searchQuery)
//   );

//   // Deduplicate phone numbers in each item
//   const deduplicatePhones = (phones) => {
//     return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
//       .map((mobileNumber) => phones.find((phone) => phone.mobileNumber === mobileNumber));
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
//               <th className="p-3 text-left">Mobile Numbers</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <tr key={item.groupId}>
//                   <td
//                     className="p-3 cursor-pointer text-black-500"
//                     // onClick={() => handleEdit(item.groupId, false)}
//                   >
//                     {item.groupName || 'N/A'}
//                   </td>
//                   <td className="p-3">
//                     {item.mobileNumbers.length > 0 ? (
//                       <select className="border border-gray-300 rounded-lg px-2 py-1">
//                         {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
//                           <option key={idx} value={phone.mobileNumber}>
//                             {phone.mobileNumber}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <span>N/A</span>
//                     )}
//                   </td>
//                   <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
//                     {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
//                   </td>
//                   <td className="p-3">
//                     <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
//                     <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-3 text-center">No data available</td>
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


// checking code for fetch the data -----------------resolve all error code  final code --------------------------------

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTableData,
  fetchGroupDetails,
  clearSelectedPerson,
  deleteGroup,
  updateGroupDetails,
} from '../redux/tableSlice';
import UserModal from './UserModal';

const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);
  const status = useSelector((state) => state.table.status);
  const error = useSelector((state) => state.table.error);
  const selectedPerson = useSelector((state) => state.table.selectedPerson);

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this group?');
  //   if (confirmDelete) {
  //     const token = localStorage.getItem('jwt');
  //     if (token) {
  //       dispatch(deleteGroup({ groupId: id, token }));
  //     }
  //   }
  // };


  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      const token = localStorage.getItem('jwt');
      if (token) {
        dispatch(deleteGroup({ groupId: id, token })).then(() => {
          // After successful deletion, re-fetch the updated data
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
        });
    }
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedPerson()); // Clear selected person if necessary
  };

  const filteredData = data.filter((item) =>
    item?.groupName?.toLowerCase().includes(searchQuery) ||
    item?.mobileNumbers?.some((phone) => phone.mobileNumber.includes(searchQuery)) ||
    item?.groupStatus?.toLowerCase().includes(searchQuery)
  );

  // Deduplicate phone numbers in each item
  const deduplicatePhones = (phones) => {
    return Array.from(new Set(phones.map((phone) => phone.mobileNumber)))
      .map((mobileNumber) => phones.find((phone) => phone.mobileNumber === mobileNumber));
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
              <th className="p-3 text-left">Mobile Numbers</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.groupId}>
                  <td
                    className="p-3 cursor-pointer text-black-500"
                    // onClick={() => handleEdit(item.groupId, false)}
                  >
                    {item.groupName || 'N/A'}
                  </td>
                  <td className="p-3">
                    {item.mobileNumbers.length > 0 ? (
                      <select className="border border-gray-300 rounded-lg px-2 py-1">
                        {deduplicatePhones(item.mobileNumbers).map((phone, idx) => (
                          <option key={idx} value={phone.mobileNumber}>
                            {phone.mobileNumber}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td className={`p-3 ${item.groupStatus === 'true' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.groupStatus === 'true' ? 'Active' : 'Inactive'}
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(item.groupId, true)} className="mr-6 text-blue-500">Edit</button>
                    <button onClick={() => handleDelete(item.groupId)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center">No data available</td>
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
