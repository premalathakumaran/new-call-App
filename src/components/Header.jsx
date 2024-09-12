

// src/components/Header.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  return (
    <div className="w-full bg-gray-200 p-4 shadow-md">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
    </div>
  );
};

export default Header;
