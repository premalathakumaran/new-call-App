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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Details</h1>
      {/* Wrapper for the table with scrollable functionality */}
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Email ID</th>
              <th className="px-4 py-2 border">Created On</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Quotation Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((email) => (
              <tr key={email.mailDetailsId}>
                <td className="px-4 py-2 border">{email.emailId}</td>
                <td className="px-4 py-2 border">{new Date(email.createdOn).toLocaleString()}</td>
                <td className="px-4 py-2 border">{email.nameData || 'N/A'}</td>
                <td className="px-4 py-2 border">{email.phoneNumber || 'N/A'}</td>
                <td className="px-4 py-2 border">{email.addressDetails || 'N/A'}</td>
                <td className="px-4 py-2 border">
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

      {selectedQuotation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quotation Data</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 whitespace-pre-wrap">
                  {selectedQuotation}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
