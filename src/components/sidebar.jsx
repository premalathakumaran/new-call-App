// // src/components/Sidebar.jsx
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import logo from "/src/assets/logoone.png";


// const Sidebar = () => {
//   const dispatch = useDispatch();

//   const handleGroupClick = (group) => {
//     dispatch(setSelectedGroup(group));
//   };

//   return (
// //     <div
// //     className="w-64 text-white h-full px-4 py-2"
// //     style={{ backgroundColor: "#134572" }}
// //   >
//     <div className="w-64 h-screen bg-gray-500 text-white flex flex-col">
//       <div className="flex items-center justify-center p-8 bg-gray-500">
        
//         <img src={logo} alt="Annular Technology" className="h-20 w-auto" />
//       </div>
//       <div className="flex flex-col p-4">
//         <button
//           onClick={() => handleGroupClick('group1')}
//           className="p-2 mb-2 text-gray-200 hover:bg-gray-700 rounded"
//         >
//           Group 1
//         </button>
//         <button
//           onClick={() => handleGroupClick('group2')}
//           className="p-2 mb-2 text-gray-200 hover:bg-gray-700 rounded"
//         >
//           Group 2
//         </button>
//         {/* Add more buttons as needed */}
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default Sidebar;





// main code for every problem do not miss it ----// this code without page routing --------------------------------------------------------------------------------------------

import React from 'react';
import logo from "/src/assets/logoone.png"; 

const Sidebar = ({ handleGroupClick }) => {
  return (
    <div className="w-64 h-screen bg-[#134572] text-white flex flex-col">
      <div className="flex items-center justify-center p-8 bg-[#134572]">
        <img src={logo} alt="Annular Technology" className="h-20 w-auto" />
      </div>
      <div className="flex flex-col p-4">
        {/* <button
          onClick={() => handleGroupClick('group1')}
          className="p-2 mb-2 text-white font-bold hover:text-black hover:bg-white rounded"
        >
          Group 1
        </button> */}
        <button
        onClick={() => handleGroupClick('group1')}
        className="p-2 mb-2 text-white font-bold hover:text-black hover:bg-white rounded flex items-center"
>
        <i className="fas fa-users mr-2"></i>
        Groups 
        </button>
        {/* <button
          onClick={() => handleGroupClick('group2')}
          className="p-2 mb-2 text-white bg-blue-300 hover:bg-blue-700 rounded"
        >
          Group 2
        </button> */}
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
};
export default Sidebar;







// this code with page routing --------------------------------------------------

// import React from 'react';
// import logo from "/src/assets/logoone.png"; 
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-[#134572] text-white flex flex-col" style={{ backgroundColor: "#134572" }}>
//       <div className="flex justify-center mb-6">
//         <img src={logo} alt="Annular Technology" className="w-32" />
//       </div>
//       <nav>
//         <ul>
//           <li className="mb-2 rounded hover:bg-blue-500 hover:shadow-lg py-2 flex items-center">
//             <i className="fas fa-clock mr-2"></i>
//             <Link to={"./table"} >
//               Group 1
//             </Link>
//           </li>
//           <li className="mb-2 rounded hover:bg-blue-500 hover:shadow-lg py-2 flex items-center">
//             <i className="fas fa-clock mr-2"></i>
//             <Link to={"./group"} >
//               Group 2
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//className="block text-white hover:text-white-300"


