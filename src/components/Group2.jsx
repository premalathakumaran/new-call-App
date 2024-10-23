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

  const number = new URLSearchParams(location.search).get('number');

  // Fetch related numbers when component mounts or number changes
  useEffect(() => {
    if (number) {
      dispatch(fetchRelatedNumbers(number));
    }
    return () => {
      dispatch(clearRelatedNumbers());
      dispatch(clearNotes());
    };
  }, [number, dispatch]);

  // Automatically fetch notes and details when related numbers are loaded
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token && number && relatedNumbers.length > 0) {
      // Get the first receiver number
      const firstReceiverNumber = relatedNumbers[0].receiverNumber;
      setActiveReceiverNumber(firstReceiverNumber);
      
      // Fetch notes and details for the first receiver
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

  return (
    <div className="p-4">
      <h4 className="text-xl mb-4 mt-12">Mobile Data</h4>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-300">
          <thead style={{ backgroundColor: '#F7F7F7' }}>
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Mobile Number
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Receiver Number
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Note History
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-2">
                  <p className="px-3 py-2 text-gray-500 text-sm">{number}</p>
                  <div className="text-sm text-gray-500">
                    {/* <p>Primary Contact</p> */}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {relatedNumbersStatus === 'loading' && (
                  <p className="text-gray-500">Loading related numbers...</p>
                )}
                {relatedNumbersStatus === 'failed' && (
                  <p className="text-red-500">Error: {relatedNumbersError}</p>
                )}
                {relatedNumbersStatus === 'succeeded' && (
                  <ul className="space-y-2">
                    {relatedNumbers.length > 0 ? (
                      relatedNumbers.map((relatedNumber, index) => (
                        <li
                          key={index}
                          onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
                          className={`px-3 py-2 text-sm cursor-pointer ${
                            activeReceiverNumber === relatedNumber.receiverNumber
                              ? 'text-gray-500 '
                              : 'text-gray-500'
                          }`}
                        >
                          {relatedNumber.receiverNumber}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm">No related numbers found</li>
                    )}
                  </ul>
                )}
              </td>
              <td className="px-6 py-4">
                <NoteHistory />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Group2;














// main code -----------------------------------

// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRelatedNumbers, clearRelatedNumbers, fetchRelatedNumberDetails } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector((state) => state.relatedNumbers.selectedNumberDetails);

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
//       <h2 className="text-2xl font-bold mb-4">Mobile Details for {number}</h2>
      
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-2">Related Numbers:</h3>
//         {relatedNumbersStatus === 'loading' && <p>Loading related numbers...</p>}
//         {relatedNumbersStatus === 'failed' && <p>Error: {relatedNumbersError}</p>}
//         {relatedNumbersStatus === 'succeeded' && (
//           <ul className="list-disc pl-5">
//             {relatedNumbers.length > 0 ? (
//               relatedNumbers.map((relatedNumber, index) => (
//                 <li 
//                   key={index} 
//                   onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
//                   className="cursor-pointer text-blue-500 hover:text-blue-700"
//                 >
//                   {relatedNumber.receiverNumber}
//                 </li>
//               ))
//             ) : (
//               <li>No related numbers found</li>
//             )}
//           </ul>
//         )}
//       </div>

//       {selectedNumberDetails && (
//         <div className="mb-6">
//           <h4 className="text-xl font-semibold mb-2">Selected Number History</h4>
//           {/* <p><strong>Number:</strong> {selectedNumberDetails.number}</p>
//           <p><strong>Name:</strong> {selectedNumberDetails.name}</p>
//           <p><strong>Email:</strong> {selectedNumberDetails.email}</p> */}
//           {/* Add more details as needed */}
//         </div>
//       )}

//       <div>
//         {/* <h3 className="text-xl font-semibold mb-2">Note History:</h3> */}
//         <NoteHistory />
//       </div>
//     </div>
//   );
// };

// export default Group2;