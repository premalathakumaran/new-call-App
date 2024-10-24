// first main code ---------------------------

// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchRelatedNumbers,
//   clearRelatedNumbers,
//   fetchRelatedNumberDetails
// } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector(
//     (state) => state.relatedNumbers.selectedNumberDetails
//   );

//   const number = new URLSearchParams(location.search).get('number');

//   useEffect(() => {
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//     return () => {
//       dispatch(clearRelatedNumbers());
//       dispatch(clearNotes());
//     };
//   }, [number, dispatch]);

//   const handleRelatedNumberClick = (relatedNumber) => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && relatedNumber) {
//       dispatch(fetchNotes({ senderNumber: number, receiverNumber: relatedNumber, token }));
//       dispatch(fetchRelatedNumberDetails({ senderNumber: number, receiverNumber: relatedNumber, token }));
//     }
//   };

//   return (
//     <div className="p-4">
//       <h4 className="text-2xl mb-4 mt-12">Mobile Data</h4>
//       <div className="overflow-y-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead style={{ backgroundColor: '#F7F7F7' }}>
//             <tr>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Mobile Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//               Receiver Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Note History
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="space-y-2">
//                   <p className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{number}</p>
//                   <div className="text-sm text-gray-500">
//                     {/* <p>Primary Contact</p> */}
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 {relatedNumbersStatus === 'loading' && (
//                   <p className="text-gray-500">Loading related numbers...</p>
//                 )}
//                 {relatedNumbersStatus === 'failed' && (
//                   <p className="text-red-500">Error: {relatedNumbersError}</p>
//                 )}
//                 {relatedNumbersStatus === 'succeeded' && (
//                   <ul className="space-y-2">
//                     {relatedNumbers.length > 0 ? (
//                       relatedNumbers.map((relatedNumber, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
//                           className="px-3 py-2 text-blue-500 text-sm cursor-pointer"
//                         >
//                           {relatedNumber.receiverNumber}
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-gray-500 text-sm">No related numbers found</li>
//                     )}
//                   </ul>
//                 )}
//               </td>
//               <td className="px-6 py-4">
//                 {/* Render NoteHistory inside this cell */}
//                 <NoteHistory />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Group2;






// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchRelatedNumbers,
//   clearRelatedNumbers,
//   fetchRelatedNumberDetails
// } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector(
//     (state) => state.relatedNumbers.selectedNumberDetails
//   );
//   const [activeReceiverNumber, setActiveReceiverNumber] = useState(null);

//   const number = new URLSearchParams(location.search).get('number');

//   // Fetch related numbers when component mounts or number changes
//   useEffect(() => {
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//     return () => {
//       dispatch(clearRelatedNumbers());
//       dispatch(clearNotes());
//     };
//   }, [number, dispatch]);

//   // Automatically fetch notes and details when related numbers are loaded
//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && relatedNumbers.length > 0) {
//       // Get the first receiver number
//       const firstReceiverNumber = relatedNumbers[0].receiverNumber;
//       setActiveReceiverNumber(firstReceiverNumber);
      
//       // Fetch notes and details for the first receiver
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//     }
//   }, [number, relatedNumbers, dispatch]);

//   const handleRelatedNumberClick = (receiverNumber) => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && receiverNumber) {
//       setActiveReceiverNumber(receiverNumber);
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//     }
//   };

//   return (
//     <div className="p-4">
//       <h4 className="text-xl mb-4 mt-12">Mobile Data</h4>
//       <div className="overflow-y-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead style={{ backgroundColor: '#F7F7F7' }}>
//             <tr>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Mobile Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Receiver Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Note History
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="space-y-2">
//                   <p className="px-3 py-2 text-gray-500 text-sm">{number}</p>
//                   <div className="text-sm text-gray-500">
//                     {/* <p>Primary Contact</p> */}
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 {relatedNumbersStatus === 'loading' && (
//                   <p className="text-gray-500">Loading related numbers...</p>
//                 )}
//                 {relatedNumbersStatus === 'failed' && (
//                   <p className="text-red-500">Error: {relatedNumbersError}</p>
//                 )}
//                 {relatedNumbersStatus === 'succeeded' && (
//                   <ul className="space-y-2">
//                     {relatedNumbers.length > 0 ? (
//                       relatedNumbers.map((relatedNumber, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
//                           className={`px-3 py-2 text-sm cursor-pointer ${
//                             activeReceiverNumber === relatedNumber.receiverNumber
//                               ? 'text-gray-500 '
//                               : 'text-gray-500'
//                           }`}
//                         >
//                           {relatedNumber.receiverNumber}
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-gray-500 text-sm">No related numbers found</li>
//                     )}
//                   </ul>
//                 )}
//               </td>
//               <td className="px-6 py-4">
//                 <NoteHistory />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Group2;


// fine code ---------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchRelatedNumbers,
//   clearRelatedNumbers,
//   fetchRelatedNumberDetails
// } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector(
//     (state) => state.relatedNumbers.selectedNumberDetails
//   );
//   const [activeReceiverNumber, setActiveReceiverNumber] = useState(null);
//   const [showNotes, setShowNotes] = useState(false);

//   const number = new URLSearchParams(location.search).get('number');

//   useEffect(() => {
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//     return () => {
//       dispatch(clearRelatedNumbers());
//       dispatch(clearNotes());
//     };
//   }, [number, dispatch]);

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && relatedNumbers.length > 0) {
//       const firstReceiverNumber = relatedNumbers[0].receiverNumber;
//       setActiveReceiverNumber(firstReceiverNumber);
      
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//     }
//   }, [number, relatedNumbers, dispatch]);

//   const handleRelatedNumberClick = (receiverNumber) => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && receiverNumber) {
//       setActiveReceiverNumber(receiverNumber);
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//     }
//   };

//   const toggleNotes = () => {
//     setShowNotes(!showNotes);
//   };

//   return (
//     <div className="p-4">
//       <h4 className="text-xl mb-4 mt-12">Mobile Data</h4>
//       <div className="overflow-y-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead style={{ backgroundColor: '#F7F7F7' }}>
//             <tr>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Mobile Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Receiver Number
//               </th>
//               <th className="px-5 py-3 text-left text-sm font-semibold">
//                 Note History
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <tr>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="space-y-2">
//                   <p className="px-3 py-2 text-gray-500 text-sm">{number}</p>
//                   <div className="text-sm text-gray-500">
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4">
//                 {relatedNumbersStatus === 'loading' && (
//                   <p className="text-gray-500">Loading related numbers...</p>
//                 )}
//                 {relatedNumbersStatus === 'failed' && (
//                   <p className="text-red-500">Error: {relatedNumbersError}</p>
//                 )}
//                 {relatedNumbersStatus === 'succeeded' && (
//                   <ul className="space-y-2">
//                     {relatedNumbers.length > 0 ? (
//                       relatedNumbers.map((relatedNumber, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
//                           className={`px-3 py-2 text-sm cursor-pointer ${
//                             activeReceiverNumber === relatedNumber.receiverNumber
//                               ? 'text-gray-500 '
//                               : 'text-gray-500'
//                           }`}
//                         >
//                           {relatedNumber.receiverNumber}
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-gray-500 text-sm">No related numbers found</li>
//                     )}
//                   </ul>
//                 )}
//               </td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={toggleNotes}
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                 >
//                   View Notes
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Popup */}
//       {showNotes && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="notes-modal">
//           <div className="relative top-20 mx-auto p-4 border w-3/4 max-w-2xl shadow-lg rounded-md bg-white">
//             <div className="mt-3">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">Note History</h3>
//                 <button
//                   onClick={toggleNotes}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//               </div>
//               <div className="mt-2 px-5 py-2">
//                 <NoteHistory />
//               </div>
//               <div className="items-center px-4 py-3 text-right">
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={toggleNotes}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Group2;



// demo okay code --------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchRelatedNumbers,
//   clearRelatedNumbers,
//   fetchRelatedNumberDetails
// } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector(
//     (state) => state.relatedNumbers.selectedNumberDetails
//   );
//   const [activeReceiverNumber, setActiveReceiverNumber] = useState(null);
//   const [showNotes, setShowNotes] = useState(false);
//   const [selectedViewNumber, setSelectedViewNumber] = useState(null);

//   const number = new URLSearchParams(location.search).get('number');

//   useEffect(() => {
//     if (number) {
//       dispatch(fetchRelatedNumbers(number));
//     }
//     return () => {
//       dispatch(clearRelatedNumbers());
//       dispatch(clearNotes());
//     };
//   }, [number, dispatch]);

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && relatedNumbers.length > 0) {
//       const firstReceiverNumber = relatedNumbers[0].receiverNumber;
//       setActiveReceiverNumber(firstReceiverNumber);
      
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber: firstReceiverNumber, 
//         token 
//       }));
//     }
//   }, [number, relatedNumbers, dispatch]);

//   const handleRelatedNumberClick = (receiverNumber) => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && receiverNumber) {
//       setActiveReceiverNumber(receiverNumber);
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//       dispatch(fetchRelatedNumberDetails({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//     }
//   };

//   const handleViewNotes = (receiverNumber) => {
//     const token = localStorage.getItem('jwt');
//     if (token && number && receiverNumber) {
//       setSelectedViewNumber(receiverNumber);
//       dispatch(fetchNotes({ 
//         senderNumber: number, 
//         receiverNumber, 
//         token 
//       }));
//       setShowNotes(true);
//     }
//   };

//   const closeModal = () => {
//     setShowNotes(false);
//     setSelectedViewNumber(null);
//   };

//   const renderTableContent = () => {
//     if (relatedNumbersStatus === 'loading') {
//       return (
//         <tr>
//           <td colSpan="3" className="px-3 py-2 text-center text-gray-500">
//             Loading related numbers...
//           </td>
//         </tr>
//       );
//     }

//     if (relatedNumbersStatus === 'failed') {
//       return (
//         <tr>
//           <td colSpan="3" className="px-3 py-2 text-center text-red-500">
//             Error: {relatedNumbersError}
//           </td>
//         </tr>
//       );
//     }

//     if (!relatedNumbers.length) {
//       return (
//         <tr>
//           <td colSpan="3" className="px-3 py-2 text-center text-gray-500">
//             No related numbers found
//           </td>
//         </tr>
//       );
//     }

//     return relatedNumbers.map((relatedNumber, index) => (
//       <tr key={index}>
//         {index === 0 && (
//           <td className="px-3 py-2 whitespace-nowrap" rowSpan={relatedNumbers.length}>
//             <div>
//               <p className="text-gray-500 text-sm">{number}</p>
//             </div>
//           </td>
//         )}
//         <td className="px-3 py-2">
//           <div
//             onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
//             className={`text-sm cursor-pointer ${
//               activeReceiverNumber === relatedNumber.receiverNumber
//                 ? 'text-gray-500'
//                 : 'text-gray-500'
//             }`}
//           >
//             {relatedNumber.receiverNumber}
//           </div>
//         </td>
//         <td className="px-3 py-2">
//           <span
//             onClick={() => handleViewNotes(relatedNumber.receiverNumber)}
//             className="text-blue-500 hover:text-blue-700 cursor-pointer text-sm"
//           >
//             View
//           </span>
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="p-4">
//       <h4 className="text-xl mb-4 mt-12">Mobile Data</h4>
//       <div className="overflow-y-auto max-h-96">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead style={{ backgroundColor: '#F7F7F7' }}>
//             <tr>
//               <th className="px-3 py-2 text-left text-sm font-semibold">
//                 Mobile Number
//               </th>
//               <th className="px-3 py-2 text-left text-sm font-semibold">
//                 Receiver Number
//               </th>
//               <th className="px-3 py-2 text-left text-sm font-semibold">
//                 Note History
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {renderTableContent()}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Popup */}
//       {showNotes && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="notes-modal">
//           <div className="relative top-20 mx-auto p-4 border w-3/4 max-w-2xl shadow-lg rounded-md bg-white">
//             <div className="mt-3">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">
//                   Note History - {selectedViewNumber}
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                 </button>
//               </div>
//               <div className="mt-2 px-5 py-2">
//                 <NoteHistory />
//               </div>
//               <div className="items-center px-4 py-3 text-right">
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Group2;




// 2 demo code okay code---------------------------------

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRelatedNumbers,
  clearRelatedNumbers,
  fetchRelatedNumberDetails
} from '../redux/relatedNumbersSlice';
import { fetchNotes, clearNotes } from '../redux/notesSlice';
import NoteHistory from './NoteHistory';

const Group2 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
  const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
  const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
  const selectedNumberDetails = useSelector(
    (state) => state.relatedNumbers.selectedNumberDetails
  );
  const [activeReceiverNumber, setActiveReceiverNumber] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedViewNumber, setSelectedViewNumber] = useState(null);

  const number = new URLSearchParams(location.search).get('number');

  useEffect(() => {
    if (number) {
      dispatch(fetchRelatedNumbers(number));
    }
    return () => {
      dispatch(clearRelatedNumbers());
      dispatch(clearNotes());
    };
  }, [number, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && number && relatedNumbers.length > 0) {
      const firstReceiverNumber = relatedNumbers[0].receiverNumber;
      setActiveReceiverNumber(firstReceiverNumber);
      
      dispatch(fetchNotes({ 
        senderNumber: number, 
        receiverNumber: firstReceiverNumber, 
        token 
      }));
      dispatch(fetchRelatedNumberDetails({ 
        senderNumber: number, 
        receiverNumber: firstReceiverNumber, 
        token 
      }));
    }
  }, [number, relatedNumbers, dispatch]);

  const handleRelatedNumberClick = (receiverNumber) => {
    const token = localStorage.getItem('jwt');
    if (token && number && receiverNumber) {
      setActiveReceiverNumber(receiverNumber);
      dispatch(fetchNotes({ 
        senderNumber: number, 
        receiverNumber, 
        token 
      }));
      dispatch(fetchRelatedNumberDetails({ 
        senderNumber: number, 
        receiverNumber, 
        token 
      }));
    }
  };

  const handleViewNotes = (receiverNumber) => {
    const token = localStorage.getItem('jwt');
    if (token && number && receiverNumber) {
      setSelectedViewNumber(receiverNumber);
      dispatch(fetchNotes({ 
        senderNumber: number, 
        receiverNumber, 
        token 
      }));
      setShowNotes(true);
    }
  };

  const closeModal = () => {
    setShowNotes(false);
    setSelectedViewNumber(null);
  };

  const renderTableContent = () => {
    if (relatedNumbersStatus === 'loading') {
      return (
        <tr>
          <td colSpan="3" className="px-3 py-2 text-center text-gray-500">
            Loading related numbers...
          </td>
        </tr>
      );
    }

    if (relatedNumbersStatus === 'failed') {
      return (
        <tr>
          <td colSpan="3" className="px-3 py-2 text-center text-red-500">
            Error: {relatedNumbersError}
          </td>
        </tr>
      );
    }

    if (!relatedNumbers.length) {
      return (
        <tr>
          <td colSpan="3" className="px-3 py-2 text-center text-gray-500">
            No related numbers found
          </td>
        </tr>
      );
    }

    return relatedNumbers.map((relatedNumber, index) => (
      <tr 
        key={index}
        className={`${
          activeReceiverNumber === relatedNumber.receiverNumber
            ? 'bg-gray-50'
            : ''
        }`}
      >
        <td className="px-3 py-2 whitespace-nowrap">
          <div className="text-gray-500 text-sm">
            {number}
          </div>
        </td>
        <td className="px-3 py-2">
          <div
            onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
            className={`text-sm cursor-pointer ${
              activeReceiverNumber === relatedNumber.receiverNumber
                ? ''
                : 'text-gray-500'
            }`}
          >
            {relatedNumber.receiverNumber}
          </div>
        </td>
        <td className="px-3 py-2">
          <span
            onClick={() => handleViewNotes(relatedNumber.receiverNumber)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer text-sm"
          >
            View
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <h4 className="text-xl mb-4 mt-12">Mobile Data</h4>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-300">
          <thead style={{ backgroundColor: '#F7F7F7' }}>
            <tr>
              <th className="px-3 py-2 text-left text-sm font-semibold">
                Sender Number
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold">
                Receiver Number
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold">
                Note History
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {renderTableContent()}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {showNotes && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="notes-modal">
          <div className="relative top-20 mx-auto p-4 border w-3/4 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Note History - {selectedViewNumber}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="mt-2 px-5 py-2">
                <NoteHistory />
              </div>
              <div className="items-center px-4 py-3 text-right">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group2;