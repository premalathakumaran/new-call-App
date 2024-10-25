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




// this is for scroll bar code -----------------------------------

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
//     <div className="container mx-auto p-2 mt-10">
//       <h6 className="text-xl mb-2">Email Details</h6>
//       {/* Main table container with both scrollbars */}
//       <div className="overflow-auto max-h-96"
//            style={{
//              scrollbarWidth: 'thin',
//              scrollbarColor: '#CBD5E0 #EDF2F7',
//            }}>
//         <table className="min-w-full table-fixed">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Email ID</th>
//               <th className="w-40 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Created On</th>
//               <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Name</th>
//               <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Phone</th>
//               <th className="w-48 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Address</th>
//               <th className="w-32 px-6 py-4 text-left text-sm font-semibold whitespace-nowrap sticky top-0 bg-gray-50">Quotation Data</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {data.map((email) => (
//               <tr key={email.mailDetailsId} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.emailId}</td>
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{new Date(email.createdOn).toLocaleString()}</td>
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.nameData || 'N/A'}</td>
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.phoneNumber || 'N/A'}</td>
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{email.addressDetails || 'N/A'}</td>
//                 <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
//                   <span
//                     onClick={() => handleViewQuotation(email.quotationData)}
//                     className="text-blue-500 hover:text-blue-700 cursor-pointer"
//                   >
//                     View
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         /* Custom scrollbar styles */
//         div::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         div::-webkit-scrollbar-track {
//           background: #EDF2F7;
//           border-radius: 4px;
//         }

//         div::-webkit-scrollbar-thumb {
//           background: #CBD5E0;
//           border-radius: 4px;
//         }

//         div::-webkit-scrollbar-thumb:hover {
//           background: #A0AEC0;
//         }

//         /* Hide scrollbar for IE, Edge and Firefox */
//         .scrollbar-hide {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;     /* Firefox */
//         }
//       `}</style>

//       {selectedQuotation && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//           <div className="relative top-20 mx-auto p-4 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3 text-center">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Data</h3>
//               <div className="mt-2 px-5 py-2">
//                 <p className="text-sm text-gray-500 whitespace-pre-wrap">
//                   {selectedQuotation}
//                 </p>
//               </div>
//               <div className="items-center px-2 py-2">
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


// sample testing ----main code for all-----------
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
//       <h6 className="text-xl  mb-2">Email Details</h6> {/* Reduced margin here */}
//       {/* Wrapper for the table with scrollable functionality */}
//       <div className="overflow-y-auto max-h-96">
//       <table className="min-w-full divide-y divide-gray-300">
//   <thead style={{ backgroundColor: '#F7F7F7' }}>
//     <tr>
//       <th className="px-6 py-4 text-left text-sm font-semibold">Email ID</th> {/* Increased padding */}
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
//         <td className="px-3 py-3  text-gray-500 text-sm cursor-pointer">{email.emailId}</td> {/* Increased padding */}
//         <td className="px-3 py-3 text-gray-500 text-sm cursor-pointer">{new Date(email.createdOn).toLocaleString()}</td> {/* Increased padding */}
//         <td className="px-3 py-3 text-gray-500 text-sm cursor-pointer">{email.nameData || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-3 text-gray-500 text-sm cursor-pointer">{email.phoneNumber || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-3 text-gray-500 text-sm cursor-pointer">{email.addressDetails || 'N/A'}</td> {/* Increased padding */}
//         <td className="px-3 py-3 text-gray-500 text-sm cursor-pointer">
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
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   const emailData = data?.data?.data || [];

//   const handleViewQuotation = (quotation) => {
//     setSelectedQuotation(quotation);
//   };

//   const closePopup = () => {
//     setSelectedQuotation(null);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div>
//         <div className="px-6 py-4">
//           <h1 className="text-xl  text-gray-800">Email Data</h1>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Email ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Created On
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {emailData.map((email, index) => (
//                 <tr key={index} className="hover:bg-gray-100">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {email.emailId}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {formatDate(email.createdOn)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {email.nameData || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {email.phoneNumber || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {email.addressDetails || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       onClick={() => handleViewQuotation(email.quotationData)}
//                       className="text-blue-600 hover:text-blue-600 font-medium"
//                     >
//                       View 
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quotation Modal */}
//       {selectedQuotation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium text-gray-900">Quotation Details</h3>
//                 <button
//                   onClick={closePopup}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <span className="sr-only">Close</span>
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Service Type</p>
//                   <p className="mt-1">{selectedQuotation["Service Type"]?.replace('Service Type: ', '') || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Cost</p>
//                   <p className="mt-1">{selectedQuotation["Cost"] || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Weight</p>
//                   <p className="mt-1">{selectedQuotation["Weight"] || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Dimensions</p>
//                   <p className="mt-1">{selectedQuotation["Dimensions"] || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Transit Time</p>
//                   <p className="mt-1">{selectedQuotation["Transit Time"] || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded">
//                   <p className="text-sm font-medium text-gray-500">Validity</p>
//                   <p className="mt-1">{selectedQuotation["Validity"] || 'N/A'}</p>
//                 </div>

//                 <div className="p-4 rounded col-span-full">
//                   <p className="text-sm font-medium text-gray-500">Summary</p>
//                   <p className="mt-1">{selectedQuotation["Summarized"] || 'N/A'}</p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <button
//                   onClick={closePopup}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
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
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  
  // Get data and status directly from Redux store
  const { data: emailData, status, error: reduxError } = useSelector((state) => state.email);
  
  useEffect(() => {
    dispatch(fetchEmailData());
  }, [dispatch]);

  const handleViewQuotation = (quotation) => {
    if (quotation && typeof quotation === 'object') {
      setSelectedQuotation(quotation);
    }
  };

  const closePopup = () => {
    setSelectedQuotation(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const renderTableRow = (email, index) => {
    if (!email || typeof email !== 'object') return null;

    return (
      <tr key={email.emailId || index} className="hover:bg-gray-100">
        <td className="px-4 py-2 text-gray-500 text-sm cursor-pointer">
          {email?.emailId || 'N/A'}
        </td>
        <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
          {formatDate(email?.createdOn)}
        </td>
        <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
          {email?.nameData || 'N/A'}
        </td>
        <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
          {email?.phoneNumber || 'N/A'}
        </td>
        <td className="px-4 py-4 text-gray-500 text-sm cursor-pointer">
          {email?.addressDetails || 'N/A'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {email?.quotationData && typeof email.quotationData === 'object' ? (
            <button
              onClick={() => handleViewQuotation(email.quotationData)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View
            </button>
          ) : (
            <span className="text-gray-400">No data</span>
          )}
        </td>
      </tr>
    );
  };

  const renderQuotationDetails = () => {
    if (!selectedQuotation || typeof selectedQuotation !== 'object') return null;

    const quotationFields = [
      { label: 'Service Type', key: 'Service Type' },
      { label: 'Cost', key: 'Cost' },
      { label: 'Weight', key: 'Weight' },
      { label: 'Dimensions', key: 'Dimensions' },
      { label: 'Transit Time', key: 'Transit Time' },
      { label: 'Validity', key: 'Validity' }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotationFields.map(({ label, key }) => (
          <div key={key} className="p-4 rounded">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1">
              {key === 'Service Type'
                ? (selectedQuotation[key]?.replace('Service Type: ', '') || 'N/A')
                : (selectedQuotation[key] || 'N/A')}
            </p>
          </div>
        ))}
        <div className="p-4 rounded col-span-full">
          <p className="text-sm font-medium text-gray-500">Summary</p>
          <p className="mt-1">{selectedQuotation["Summarized"] || 'N/A'}</p>
        </div>
      </div>
    );
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {reduxError}
      </div>
    );
  }

  if (!Array.isArray(emailData) || emailData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No email data available
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="px-6 py-4">
          <h1 className="text-xl text-gray-800">Email Data</h1>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created On
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {emailData.map((email, index) => renderTableRow(email, index))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quotation Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quotation Details</h3>
                <button
                  onClick={closePopup}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {renderQuotationDetails()}
              <div className="mt-6">
                <button
                  onClick={closePopup}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
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