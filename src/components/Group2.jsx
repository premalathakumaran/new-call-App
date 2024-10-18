// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRelatedNumbers, clearRelatedNumbers, fetchRelatedNumberDetails } from '../redux/relatedNumbersSlice';
// import { fetchNotes, clearNotes } from '../redux/notesSlice';
// import NoteHistory from './NoteHistory';

// const Group2 = () => {
//   const { number } = useParams();
//   const dispatch = useDispatch();
//   const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
//   const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
//   const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
//   const selectedNumberDetails = useSelector((state) => state.relatedNumbers.selectedNumberDetails);

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
//           <h3 className="text-xl font-semibold mb-2">Selected Number Details:</h3>
//           <p><strong>Number:</strong> {selectedNumberDetails.number}</p>
//           <p><strong>Name:</strong> {selectedNumberDetails.name}</p>
//           <p><strong>Email:</strong> {selectedNumberDetails.email}</p>
//           {/* Add more details as needed */}
//         </div>
//       )}

//       <div>
//         <h3 className="text-xl font-semibold mb-2">Note History:</h3>
//         <NoteHistory />
//       </div>
//     </div>
//   );
// };

// export default Group2;




import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedNumbers, clearRelatedNumbers, fetchRelatedNumberDetails } from '../redux/relatedNumbersSlice';
import { fetchNotes, clearNotes } from '../redux/notesSlice';
import NoteHistory from './NoteHistory';

const Group2 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const relatedNumbers = useSelector((state) => state.relatedNumbers.numbers);
  const relatedNumbersStatus = useSelector((state) => state.relatedNumbers.status);
  const relatedNumbersError = useSelector((state) => state.relatedNumbers.error);
  const selectedNumberDetails = useSelector((state) => state.relatedNumbers.selectedNumberDetails);

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

  const handleRelatedNumberClick = (relatedNumber) => {
    const token = localStorage.getItem('jwt');
    if (token && number && relatedNumber) {
      dispatch(fetchNotes({ senderNumber: number, receiverNumber: relatedNumber, token }));
      dispatch(fetchRelatedNumberDetails({ senderNumber: number, receiverNumber: relatedNumber, token }));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mobile Details for {number}</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Related Numbers:</h3>
        {relatedNumbersStatus === 'loading' && <p>Loading related numbers...</p>}
        {relatedNumbersStatus === 'failed' && <p>Error: {relatedNumbersError}</p>}
        {relatedNumbersStatus === 'succeeded' && (
          <ul className="list-disc pl-5">
            {relatedNumbers.length > 0 ? (
              relatedNumbers.map((relatedNumber, index) => (
                <li 
                  key={index} 
                  onClick={() => handleRelatedNumberClick(relatedNumber.receiverNumber)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  {relatedNumber.receiverNumber}
                </li>
              ))
            ) : (
              <li>No related numbers found</li>
            )}
          </ul>
        )}
      </div>

      {selectedNumberDetails && (
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Selected Number History</h4>
          {/* <p><strong>Number:</strong> {selectedNumberDetails.number}</p>
          <p><strong>Name:</strong> {selectedNumberDetails.name}</p>
          <p><strong>Email:</strong> {selectedNumberDetails.email}</p> */}
          {/* Add more details as needed */}
        </div>
      )}

      <div>
        {/* <h3 className="text-xl font-semibold mb-2">Note History:</h3> */}
        <NoteHistory />
      </div>
    </div>
  );
};

export default Group2;