
// sample code-----main code for most -------

// // src/pages/AdminPage.jsx
// import React from 'react';
// import Sidebar from '../components/sidebar';
// import Header from '../components/Header';
// import Table from '../components/Table';

// const Admin = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
        
//         {/* Search input and Create New button */}
//         <div className="flex justify-between items-center p-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => alert('Create New Button Clicked')}
//           >
//            New Group
//           </button>
//         </div>
        
//         {/* Table Component */}
//         <Table />
//       </div>
//     </div>
//   );
// };

// export default Admin;



// this code without page routing --------------------------------------------------

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFormVisibility, selectIsFormVisible } from '../redux/groupSlice';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import Table from '../components/Table';
import GroupForm from '../components/GroupForm'; // Import GroupForm component
// import {BrowserRouter,Outlet,Route} from "react-router-dom"

const Admin = () => {
  const dispatch = useDispatch();
  const isFormVisible = useSelector(selectIsFormVisible);

  const handleToggleForm = () => {
    dispatch(toggleFormVisibility());
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Search input and Create New button */}
        <div className="flex justify-end">
          {/* <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          <button
           onClick={handleToggleForm}
           className="text-white px-4 py-2 rounded-lg mt-4 mr-7"
           style={{ backgroundColor: '#134572' }}
          >
            {isFormVisible ? 'Hide Form' : 'Create Group'}
          </button>
        </div>
        
        {/* Table Component */}
       
        
        {/* Conditional Rendering of Form with Modal Effect */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-9 border border-gray-300 rounded-lg w-full max-w-3xl relative">
              <GroupForm onSuccess={handleToggleForm} />
              <button
                onClick={handleToggleForm}
                className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg"
                style={{ backgroundColor: '#134572' }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Table />
      </div>
    </div>
  );
};

export default Admin;

//------------------------------------------------------------------------------------




// // tis code with page routing --------------------------------------------------

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleFormVisibility, selectIsFormVisible } from '../redux/groupSlice';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import GroupForm from '../components/GroupForm'; // Import GroupForm component
// import { Outlet } from 'react-router-dom';

// const Admin = () => {
//   const dispatch = useDispatch();
//   const isFormVisible = useSelector(selectIsFormVisible);

//   const handleToggleForm = () => {
//     dispatch(toggleFormVisibility());
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />

//         {/* Search input and Create New button */}
//         <div className="flex justify-between items-center p-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleToggleForm}
//             className="text-white px-4 py-2 rounded-lg ml-4"
//             style={{ backgroundColor: '#134572' }}
//           >
//             {isFormVisible ? 'Hide Form' : 'Create Group'}
//           </button>
//         </div>

//         {/* Content Area for Nested Routes */}
//         <div className="flex-1 p-4">
//           <Outlet /> {/* This will render nested routes like Table */}
//         </div>

//         {/* Conditional Rendering of Form with Modal Effect */}
//         {isFormVisible && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-9 border border-gray-300 rounded-lg w-full max-w-3xl relative">
//               <GroupForm onSuccess={handleToggleForm} />
//               <button
//                 onClick={handleToggleForm}
//                 className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admin;




