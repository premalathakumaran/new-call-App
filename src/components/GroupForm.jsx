
// main code with backend api--------for group form -----------------------

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setGroupName,
//   setMobileNumber,
//   setCountryCode,
//   addMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
//   selectMobileNumbers,
//   selectGroupName,
//   selectStatus,
//   selectIsFormVisible,
//   removeMobileNumber,
// } from '../redux/groupSlice';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { saveGroupDetails } from '../redux/groupSlice';

// const GroupForm = () => {
//   const dispatch = useDispatch();
//   const groupName = useSelector(selectGroupName);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const status = useSelector(selectStatus);
//   const isFormVisible = useSelector(selectIsFormVisible);
//   const [currentMobileNumber, setCurrentMobileNumber] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('US');
//   const [countries, setCountries] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,  // ISO 3166-1 alpha-2 country code
//           name: country.name.common,
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//         console.error('Error fetching country data:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleGroupNameChange = (e) => dispatch(setGroupName(e.target.value));
//   const handleMobileNumberChange = (e) => setCurrentMobileNumber(e.target.value);
//   const handleCountryCodeChange = (e) => setSelectedCountryCode(e.target.value);
//   const handleStatusChange = (e) => dispatch(setStatus(e.target.value));

//   const handleAddMobileNumber = () => {
//     if (currentMobileNumber.trim() !== '') {
//       const phoneNumber = parsePhoneNumberFromString(currentMobileNumber, selectedCountryCode);
//       if (phoneNumber && phoneNumber.isValid()) {
//         dispatch(addMobileNumber());
//         const index = mobileNumbers.length;
//         dispatch(setCountryCode({ index: index, countryCode: phoneNumber.country }));
//         dispatch(setMobileNumber({ index: index, number: phoneNumber.number }));
//         setCurrentMobileNumber('');
//         setError('');
//       } else {
//         setError('Invalid phone number for the selected country code');
//       }
//     }
//   };

//   const handleDeleteMobileNumber = (index) => {
//     dispatch(removeMobileNumber(index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (groupName.trim() === '') {
//       setError('Group name is required');
//       return;
//     }
//     dispatch(saveGroupDetails({ groupName, mobileNumbers, status }))
//       .unwrap()
//       .then(() => {
//         dispatch(resetForm());
//         dispatch(toggleFormVisibility());
//       })
//       .catch((error) => {
//         setError(error || 'Failed to save group details');
//       });
//   };

//   if (!isFormVisible) return null;

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6">New Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && <p className="text-red-500">{error}</p>}
//         <div>
//           <label className="block text-lg font-medium mb-2">Group Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={handleGroupNameChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//           <div className="flex">
//             <select
//               value={selectedCountryCode}
//               onChange={handleCountryCodeChange}
//               className="border border-gray-300 rounded-lg p-3 w-24"
//             >
//               {countries.map((country, index) => (
//                 <option key={index} value={country.isoCode}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               value={currentMobileNumber}
//               onChange={handleMobileNumberChange}
//               placeholder="Enter mobile number"
//               className="border border-gray-300 rounded-lg p-3 flex-1"
//             />
//             <button
//               type="button"
//               onClick={handleAddMobileNumber}
//               className="text-white p-2 rounded ml-2"
//               style={{ backgroundColor: '#134572' }}
//             >
//               Add
//             </button>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-medium mb-2">Added Mobile Numbers:</h3>
//             <div className="overflow-auto" style={{ maxHeight: '100px' }}>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Country</th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Number</th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mobileNumbers.map((mobile, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mobile.countryCode}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mobile.number}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteMobileNumber(index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Status:</label>
//           <select
//             value={status}
//             onChange={handleStatusChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button type="submit" className="text-white py-2 px-4 rounded-lg" style={{ backgroundColor: '#134572' }}>
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => dispatch(toggleFormVisibility())}
//             className="text-white py-2 px-4 rounded-lg"
//             style={{ backgroundColor: '#134572' }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GroupForm;




//  the most most main code --------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import {
//   setGroupName,
//   addMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
//   selectMobileNumbers,
//   selectGroupName,
//   selectStatus,
//   selectIsFormVisible,
//   removeMobileNumber,
//   saveGroupDetails,
// } from '../redux/groupSlice';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const GroupForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const groupName = useSelector(selectGroupName);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const status = useSelector(selectStatus);
//   const isFormVisible = useSelector(selectIsFormVisible);
//   const [currentMobileNumber, setCurrentMobileNumber] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('US');
//   const [countries, setCountries] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleGroupNameChange = (e) => dispatch(setGroupName(e.target.value));
//   const handleMobileNumberChange = (e) => setCurrentMobileNumber(e.target.value);
//   const handleCountryCodeChange = (e) => setSelectedCountryCode(e.target.value);
//   const handleStatusChange = (e) => dispatch(setStatus(e.target.value));

//   const handleAddMobileNumber = () => {
//     if (currentMobileNumber.trim() !== '') {
//       const phoneNumber = parsePhoneNumberFromString(currentMobileNumber, selectedCountryCode);
//       if (phoneNumber && phoneNumber.isValid()) {
//         const countryCode = phoneNumber.countryCallingCode;
//         const nationalNumber = phoneNumber.nationalNumber;
//         const formattedNumber = `+${countryCode}-${nationalNumber}`;
//         dispatch(addMobileNumber({ number: formattedNumber }));
//         setCurrentMobileNumber('');
//         setError('');
//       } else {
//         setError('Invalid phone number for the selected country code');
//       }
//     }
//   };

//   const handleDeleteMobileNumber = (index) => {
//     dispatch(removeMobileNumber(index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (groupName.trim() === '') {
//       setError('Group name is required');
//       return;
//     }

//     dispatch(saveGroupDetails({ groupName, mobileNumbers, status }))
//       .unwrap()
//       .then(() => {
//         dispatch(resetForm()); // Reset the form values
//         setError(''); // Clear any existing error
//         dispatch(toggleFormVisibility()); // Automatically hide the form
//         navigate('/admin'); // Navigate to the admin page after successful submission
//       })
//       .catch((error) => {
//         setError(error || 'Failed to save group details');
//       });
//   };

//   if (!isFormVisible) return null;

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6">New Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && <p className="text-red-500">{error}</p>}
//         <div>
//           <label className="block text-lg font-medium mb-2">Group Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={handleGroupNameChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//           <div className="flex">
//             <select
//               value={selectedCountryCode}
//               onChange={handleCountryCodeChange}
//               className="border border-gray-300 rounded-lg p-3 w-24"
//             >
//               {countries.map((country, index) => (
//                 <option key={index} value={country.isoCode}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               value={currentMobileNumber}
//               onChange={handleMobileNumberChange}
//               placeholder="Enter mobile number"
//               className="border border-gray-300 rounded-lg p-3 flex-1"
//             />
//             <button
//               type="button"
//               onClick={handleAddMobileNumber}
//               className="text-white p-2 rounded ml-2"
//               style={{ backgroundColor: '#134572' }}
//             >
//               Add
//             </button>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-medium mb-2">Added Mobile Numbers:</h3>
//             <div className="overflow-auto" style={{ maxHeight: '100px' }}>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mobileNumbers.map((number, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{number}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteMobileNumber(index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Status:</label>
//           <select
//             value={status}
//             onChange={handleStatusChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button type="submit" className="text-white py-2 px-4 rounded-lg" style={{ backgroundColor: '#134572' }}>
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => dispatch(toggleFormVisibility())}
//             className="text-white py-2 px-4 rounded-lg"
//             style={{ backgroundColor: '#134572' }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GroupForm;
      


// checking code for fetch the data ---------------------resolve all error code  final code ----------------------------


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import {
//   setGroupName,
//   addMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
//   selectMobileNumbers,
//   selectGroupName,
//   selectStatus,
//   selectIsFormVisible,
//   removeMobileNumber,
//   saveGroupDetails,
// } from '../redux/groupSlice';
// import { fetchTableData } from '../redux/tableSlice';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const GroupForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const groupName = useSelector(selectGroupName);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const status = useSelector(selectStatus);
//   const isFormVisible = useSelector(selectIsFormVisible);
//   const [currentMobileNumber, setCurrentMobileNumber] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('US');
//   const [countries, setCountries] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleGroupNameChange = (e) => dispatch(setGroupName(e.target.value));
//   const handleMobileNumberChange = (e) => setCurrentMobileNumber(e.target.value);
//   const handleCountryCodeChange = (e) => setSelectedCountryCode(e.target.value);
//   const handleStatusChange = (e) => dispatch(setStatus(e.target.value));

//   const handleAddMobileNumber = () => {
//     if (currentMobileNumber.trim() !== '') {
//       const phoneNumber = parsePhoneNumberFromString(currentMobileNumber, selectedCountryCode);
//       if (phoneNumber && phoneNumber.isValid()) {
//         const countryCode = phoneNumber.countryCallingCode;
//         const nationalNumber = phoneNumber.nationalNumber;
//         const formattedNumber = `+${countryCode}-${nationalNumber}`;
//         dispatch(addMobileNumber({ number: formattedNumber }));
//         setCurrentMobileNumber('');
//         setError('');
//       } else {
//         setError('Invalid phone number for the selected country code');
//       }
//     }
//   };

//   const handleDeleteMobileNumber = (index) => {
//     dispatch(removeMobileNumber(index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (groupName.trim() === '') {
//       setError('Group name is required');
//       return;
//     }

//     dispatch(saveGroupDetails({ groupName, mobileNumbers, status }))
//       .unwrap()
//       .then(() => {
//          // Dispatch action to fetch updated table data

//          const token = localStorage.getItem('jwt');

//          if (token) {
 
//            dispatch(fetchTableData(token)); // Fetch updated data
 
//          }
//         dispatch(resetForm()); // Reset the form values
//         setError(''); // Clear any existing error
//         dispatch(toggleFormVisibility()); // Automatically hide the form
//         navigate('/admin'); // Navigate to the admin page after successful submission
//       })
//       .catch((error) => {
//         setError(error || 'Failed to save group details');
//       });
//   };

//   if (!isFormVisible) return null;

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6">New Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && <p className="text-red-500">{error}</p>}
//         <div>
//           <label className="block text-lg font-medium mb-2">Group Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={handleGroupNameChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//           <div className="flex">
//             <select
//               value={selectedCountryCode}
//               onChange={handleCountryCodeChange}
//               className="border border-gray-300 rounded-lg p-3 w-24"
//             >
//               {countries.map((country, index) => (
//                 <option key={index} value={country.isoCode}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               value={currentMobileNumber}
//               onChange={handleMobileNumberChange}
//               placeholder="Enter mobile number"
//               className="border border-gray-300 rounded-lg p-3 flex-1"
//             />
//             <button
//               type="button"
//               onClick={handleAddMobileNumber}
//               className="text-white p-2 rounded ml-2"
//               style={{ backgroundColor: '#134572' }}
//             >
//               Add
//             </button>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-medium mb-2">Added Mobile Numbers:</h3>
//             <div className="overflow-auto" style={{ maxHeight: '100px' }}>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mobileNumbers.map((number, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{number}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteMobileNumber(index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Status:</label>
//           <select
//             value={status}
//             onChange={handleStatusChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button type="submit" className="text-white py-2 px-4 rounded-lg" style={{ backgroundColor: '#134572' }}>
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => dispatch(toggleFormVisibility())}
//             className="text-white py-2 px-4 rounded-lg"
//             style={{ backgroundColor: '#134572' }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GroupForm;
      



// trying code ---------------


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import {
//   setGroupName,
//   addMobileNumber,
//   setStatus,
//   toggleFormVisibility,
//   resetForm,
//   selectMobileNumbers,
//   selectGroupName,
//   selectStatus,
//   selectIsFormVisible,
//   removeMobileNumber,
//   saveGroupDetails,
// } from '../redux/groupSlice';
// import { fetchTableData } from '../redux/tableSlice';
// import axios from 'axios';
// import { FaTrash } from 'react-icons/fa';
// import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const GroupForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const groupName = useSelector(selectGroupName);
//   const mobileNumbers = useSelector(selectMobileNumbers);
//   const status = useSelector(selectStatus);
//   const isFormVisible = useSelector(selectIsFormVisible);
//   const [currentMobileNumber, setCurrentMobileNumber] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('US');
//   const [countries, setCountries] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const countryData = response.data.map((country) => ({
//           isoCode: country.cca2,
//           name: country.name.common,
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         setError('Error fetching country data');
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleGroupNameChange = (e) => dispatch(setGroupName(e.target.value));
//   const handleMobileNumberChange = (e) => setCurrentMobileNumber(e.target.value);
//   const handleCountryCodeChange = (e) => setSelectedCountryCode(e.target.value);
//   const handleStatusChange = (e) => dispatch(setStatus(e.target.value));

//   const handleAddMobileNumber = () => {
//     if (currentMobileNumber.trim() !== '') {
//       const phoneNumber = parsePhoneNumberFromString(currentMobileNumber, selectedCountryCode);
//       if (phoneNumber && phoneNumber.isValid()) {
//         const countryCode = phoneNumber.countryCallingCode;
//         const nationalNumber = phoneNumber.nationalNumber;
//         const formattedNumber = `+${countryCode}-${nationalNumber}`;
//         const apiNumber = `+${countryCode}${nationalNumber}`
//          dispatch(addMobileNumber({ number: formattedNumber }));
//         setCurrentMobileNumber('');
//         setError('');
//       } else {
//         setError('Invalid phone number for the selected country code');
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddMobileNumber();
//     }
//   };

//   const handleDeleteMobileNumber = (index) => {
//     dispatch(removeMobileNumber(index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (groupName.trim() === '') {
//       setError('Group name is required');
//       return;
//     }

//     dispatch(saveGroupDetails({ groupName, mobileNumbers, status }))
//       .unwrap()
//       .then(() => {
//         // Dispatch action to fetch updated table data
//         const token = localStorage.getItem('jwt');
//         if (token) {
//           dispatch(fetchTableData(token)); // Fetch updated data
//         }
//         dispatch(resetForm()); // Reset the form values
//         setError(''); // Clear any existing error
//         dispatch(toggleFormVisibility()); // Automatically hide the form
//         navigate('/admin'); // Navigate to the admin page after successful submission
//       })
//       .catch((error) => {
//         setError(error || 'Failed to save group details');
//       });
//   };

//   if (!isFormVisible) return null;

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6">New Group</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && <p className="text-red-500">{error}</p>}
//         <div>
//           <label className="block text-lg font-medium mb-2">Group Name:</label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={handleGroupNameChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Mobile Numbers:</label>
//           <div className="flex">
//             <select
//               value={selectedCountryCode}
//               onChange={handleCountryCodeChange}
//               className="border border-gray-300 rounded-lg p-3 w-24"
//             >
//               {countries.map((country, index) => (
//                 <option key={index} value={country.isoCode}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               value={currentMobileNumber}
//               onChange={handleMobileNumberChange}
//               onKeyDown={handleKeyDown} // Add keydown event
//               placeholder="Enter mobile number"
//               className="border border-gray-300 rounded-lg p-3 flex-1"
//             />
//             <button
//               type="button"
//               onClick={handleAddMobileNumber}
//               className="text-white p-2 rounded ml-2"
//               style={{ backgroundColor: '#134572' }}
//             >
//               Add
//             </button>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-medium mb-2">Added Mobile Numbers:</h3>
//             <div className="overflow-auto" style={{ maxHeight: '100px' }}>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mobileNumbers.map((number, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{number}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteMobileNumber(index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-lg font-medium mb-2">Status:</label>
//           <select
//             value={status}
//             onChange={handleStatusChange}
//             className="border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex justify-end gap-4">
//           <button type="submit" className="text-white py-2 px-4 rounded-lg" style={{ backgroundColor: '#134572' }}>
//             Save
//           </button>
//           <button
//             type="button"
//             onClick={() => dispatch(toggleFormVisibility())}
//             className="text-white py-2 px-4 rounded-lg"
//             style={{ backgroundColor: '#134572' }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GroupForm;



// trying code ------------

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setGroupName,
  addMobileNumber,
  setStatus,
  toggleFormVisibility,
  resetForm,
  selectMobileNumbers,
  selectGroupName,
  selectStatus,
  selectIsFormVisible,
  removeMobileNumber,
  saveGroupDetails,
} from '../redux/groupSlice';
import { fetchTableData } from '../redux/tableSlice';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const GroupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupName = useSelector(selectGroupName);
  const mobileNumbers = useSelector(selectMobileNumbers);
  const status = useSelector(selectStatus);
  const isFormVisible = useSelector(selectIsFormVisible);
  const [currentMobileNumber, setCurrentMobileNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = response.data.map((country) => ({
          isoCode: country.cca2,
          name: country.name.common,
        }));
        setCountries(countryData);
      } catch (error) {
        setError('Error fetching country data');
      }
    };
    fetchCountries();
  }, []);

  const handleGroupNameChange = (e) => dispatch(setGroupName(e.target.value));
  const handleMobileNumberChange = (e) => setCurrentMobileNumber(e.target.value);
  const handleCountryCodeChange = (e) => setSelectedCountryCode(e.target.value);
  const handleStatusChange = (e) => dispatch(setStatus(e.target.value));

  const handleAddMobileNumber = () => {
    if (currentMobileNumber.trim() !== '') {
      const phoneNumber = parsePhoneNumberFromString(currentMobileNumber, selectedCountryCode);
      if (phoneNumber && phoneNumber.isValid()) {
        const countryCode = phoneNumber.countryCallingCode;
        const nationalNumber = phoneNumber.nationalNumber;
        const formattedNumber = `+${countryCode}${nationalNumber}`;
        const apiNumber = `+${countryCode}-${nationalNumber}`;
        
        // Add both the formatted and API numbers to the state
        dispatch(addMobileNumber({ number: formattedNumber, numberHypens: apiNumber }));
        setCurrentMobileNumber('');
        setError('');
      } else {
        setError('Invalid phone number for the selected country code');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMobileNumber();
    }
  };

  const handleDeleteMobileNumber = (index) => {
    dispatch(removeMobileNumber(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim() === '') {
      setError('Group name is required');
      return;
    }

    dispatch(saveGroupDetails({ groupName, mobileNumbers, status }))
      .unwrap()
      .then(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          dispatch(fetchTableData(token)); // Fetch updated data
        }
        dispatch(resetForm()); // Reset the form values
        setError(''); // Clear any existing error
        dispatch(toggleFormVisibility()); // Automatically hide the form
        navigate('/admin'); // Navigate to the admin page after successful submission
      })
      .catch((error) => {
        setError(error || 'Failed to save group details');
      });
  };

  if (!isFormVisible) return null;

  return (
    <div className="bg-white p-8 rounded-lg  max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-6">New Group</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-2">Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>



        <div>
  <label className="block text-sm font-medium mb-2">Mobile Numbers:</label>
  <div className="flex">
    <select
      value={selectedCountryCode}
      onChange={handleCountryCodeChange}
      className="border border-gray-300 rounded-lg p-3 w-24"
    >
      {countries.map((country, index) => (
        <option key={index} value={country.isoCode}>
          {country.name}
        </option>
      ))}
    </select>
    <input
      type="text"
      value={currentMobileNumber}
      onChange={handleMobileNumberChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter mobile number"
      className="border text-sm border-gray-300 rounded-lg p-3 flex-1"
    />
    <button
      type="button"
      onClick={handleAddMobileNumber}
      className="text-white text-sm rounded-lg p-3 ml-2"
      style={{ backgroundColor: '#134572' }}
    >
      Add
    </button>
  </div>

  {/* Container for table with a fixed height and scroll */}
  <div className="mt-4 w-full h-20 overflow-y-auto border border-gray-300 rounded-lg">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border text-sm border-gray-300 px-4 py-2 text-left">Mobile Number</th>
          <th className="border text-sm border-gray-300 px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {mobileNumbers.map((mobile, index) => (
          <tr key={index} className="border-t">
            <td className="border border-gray-300 px-4 py-2">{mobile.number}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                type="button"
                onClick={() => handleDeleteMobileNumber(index)}
                className="text-red-500 hover:text-red-700"
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




        <div>
          <label className="block text-sm font-medium mb-2">Status:</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg p-3 w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className=" text-white text-sm rounded-lg p-3 w-full" style={{ backgroundColor: '#134572' }}>
          Save Group
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
