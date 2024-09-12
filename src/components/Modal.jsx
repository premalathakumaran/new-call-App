

// // components/Modal.jsx
// import React from 'react';
// import ReactDOM from 'react-dom';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;
