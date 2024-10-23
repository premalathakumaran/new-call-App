// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchEmailData } from '../redux/emailSlice';

// const EmailData = () => {
//   const dispatch = useDispatch();
//   const { data, status, error } = useSelector((state) => state.email);
//   const [selectedQuotation, setSelectedQuotation] = useState(null);

//   useEffect(() => {
//     dispatch(fetchEmailData());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   const handleViewQuotation = (quotation) => {
//     setSelectedQuotation(quotation);
//   };

//   const closePopup = () => {
//     setSelectedQuotation(null);
//   };

//   return (
//     <div className="container mx-auto p-4 mt-10">
//   <h5 className="text-2xl font-bold mb-4">Email Details</h5>
//   {/* Wrapper for the table with scrollable functionality */}
//   <div className="overflow-y-auto max-h-96">
//     <table className="min-w-full divide-y divide-gray-300">
//       <thead style={{ backgroundColor: '#F7F7F7' }}>
//         <tr>
//           <th className="px-4 py-2">Email ID</th> {/* Reduced padding */}
//           <th className="px-4 py-2">Created On</th> {/* Reduced padding */}
//           <th className="px-4 py-2">Name</th> {/* Reduced padding */}
//           <th className="px-4 py-2">Phone</th> {/* Reduced padding */}
//           <th className="px-4 py-2">Address</th> {/* Reduced padding */}
//           <th className="px-4 py-2">Quotation Data</th> {/* Reduced padding */}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((email) => (
//           <tr key={email.mailDetailsId} className="border-b">
//             <td className="px-4 py-2">{email.emailId}</td> {/* Reduced padding */}
//             <td className="px-4 py-2">{new Date(email.createdOn).toLocaleString()}</td> {/* Reduced padding */}
//             <td className="px-4 py-2">{email.nameData || 'N/A'}</td> {/* Reduced padding */}
//             <td className="px-4 py-2">{email.phoneNumber || 'N/A'}</td> {/* Reduced padding */}
//             <td className="px-4 py-2">{email.addressDetails || 'N/A'}</td> {/* Reduced padding */}
//             <td className="px-4 py-2">
//               <span
//                 onClick={() => handleViewQuotation(email.quotationData)}
//                 className="text-blue-500 hover:text-blue-700 cursor-pointer"
//               >
//                 View
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
// </div>

//       {selectedQuotation && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Data</h3>
//               <div className="mt-2 px-7 py-3">
//                 <p className="text-sm text-gray-500 whitespace-pre-wrap">
//                   {selectedQuotation}
//                 </p>
//               </div>
//               <div className="items-center px-4 py-3">
//                 <button
//                   id="ok-btn"
//                   className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={closePopup}
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

// export default EmailData;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailData } from '../redux/emailSlice';

const EmailData = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.email);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    dispatch(fetchEmailData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const closePopup = () => {
    setSelectedQuotation(null);
  };

  return (
    <div className="container mx-auto p-2 mt-10">
      <h6 className="text-xl mb-2">Email Details</h6>
      {/* Main table container with both scrollbars */}
      <div className="overflow-auto max-h-96"
           style={{
             scrollbarWidth: 'thin',
             scrollbarColor: '#CBD5E0 #EDF2F7',
           }}>
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Email ID</th>
              <th className="w-40 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Created On</th>
              <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Name</th>
              <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Phone</th>
              <th className="w-48 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Address</th>
              <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Quotation Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((email) => (
              <tr key={email.mailDetailsId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.emailId}</td>
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{new Date(email.createdOn).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.nameData || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.phoneNumber || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.addressDetails || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                  <span
                    onClick={() => handleViewQuotation(email.quotationData)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        /* Custom scrollbar styles */
        div::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #EDF2F7;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #A0AEC0;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
      `}</style>

      {selectedQuotation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-4 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Data</h3>
              <div className="mt-2 px-5 py-2">
                <p className="text-sm text-gray-500 whitespace-pre-wrap">
                  {selectedQuotation}
                </p>
              </div>
              <div className="items-center px-2 py-2">
                <button
                  id="ok-btn"
                  className="px-3 py-1 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closePopup}
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

export default EmailData;


// sample testing ---------------
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchEmailData } from '../redux/emailSlice';

// const EmailData = () => {
//   const dispatch = useDispatch();
//   const { data, status, error } = useSelector((state) => state.email);
//   const [selectedQuotation, setSelectedQuotation] = useState(null);

//   useEffect(() => {
//     dispatch(fetchEmailData());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   const handleViewQuotation = (quotation) => {
//     setSelectedQuotation(quotation);
//   };

//   const closePopup = () => {
//     setSelectedQuotation(null);
//   };

//   return (
//     <div className="container mx-auto p-2 mt-10"> {/* Reduced padding here */}
//       <h6 className="text-2xl  mb-2">Email Details</h6> {/* Reduced margin here */}
//       {/* Wrapper for the table with scrollable functionality */}
//       <div className="overflow-y-auto max-h-96">
//       <table className="min-w-full divide-y divide-gray-300">
//   <thead style={{ backgroundColor: '#F7F7F7' }}>
//     <tr>
//       <th className="px-5 py-3 text-left text-sm font-semibold">Email ID</th> {/* Increased padding */}
//       <th className="px-5 py-3 text-left text-sm font-semibold">Created On</th> {/* Increased padding */}
//       <th className="px-5 py-3 text-left text-sm font-semibold">Name</th> {/* Increased padding */}
//       <th className="px-5 py-3 text-left text-sm font-semibold">Phone</th> {/* Increased padding */}
//       <th className="px-5 py-3 text-left text-sm font-semibold">Address</th> {/* Increased padding */}
//       <th className="px-5 py-3 text-left text-sm font-semibold">Quotation Data</th> {/* Increased padding */}
//     </tr>
//   </thead>
//   <tbody>
//     {data.map((email) => (
//       <tr key={email.mailDetailsId} className="border-b">
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{email.emailId}</td> {/* Increased padding */}
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{new Date(email.createdOn).toLocaleString()}</td> {/* Increased padding */}
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{email.nameData || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{email.phoneNumber || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">{email.addressDetails || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-2 text-gray-500 text-sm cursor-pointer">
//           <span
//             onClick={() => handleViewQuotation(email.quotationData)}
//             className="text-blue-500 hover:text-blue-700 cursor-pointer"
//           >
//             View
//           </span>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
//       </div>

//       {selectedQuotation && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-4 border w-96 shadow-lg rounded-md bg-white"> {/* Reduced padding here */}
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Data</h3>
//               <div className="mt-2 px-5 py-2"> {/* Reduced padding */}
//                 <p className="text-sm text-gray-500 whitespace-pre-wrap">
//                   {selectedQuotation}
//                 </p>
//               </div>
//               <div className="items-center px-2 py-2"> {/* Reduced padding */}
//                 <button
//                   id="ok-btn"
//                   className="px-3 py-1 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   onClick={closePopup}
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

// export default EmailData;
