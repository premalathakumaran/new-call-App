

// // src/components/Header.jsx
// import React from 'react';
// import { useSelector } from 'react-redux';

// const Header = () => {
//   return (
//     <div className="w-full bg-gray-200 p-4 shadow-md">
//       <h1 className="text-xl font-bold">Admin Dashboard</h1>
//     </div>
//   );
// };

// export default Header;



import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import the logout action
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { HiLogout } from 'react-icons/hi'; // Import a logout icon from react-icons

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="w-full bg-gray-200 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="flex items-center text-red-500">
        <HiLogout className="mr-2" /> {/* Logout icon */}
        Logout
      </button>
    </div>
  );
};

export default Header;

