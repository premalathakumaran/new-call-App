// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import logo from '/src/assets/logo.webp';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, user } = useSelector((state) => state.auth);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   useEffect(() => {
//     if (status === 'succeeded' && user) {
//       navigate('/admin');
//     }
//   }, [status, user, navigate]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//       <div className="flex justify-center mb-6">
//           <img src={logo} alt="Annular Technology" className="w-32" />
//         </div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




// this is deployed code for login and it is find code --------------------//


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import logo from '/src/assets/logo.webp'; // Ensure the path to your logo is correct

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { loading, error, user } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Dispatch loginUser action
//     dispatch(loginUser({ email, password }))
//       .unwrap()
//       .then(() => {
//         // Navigate to /admin on successful login
//         navigate('/admin');
//       })
//       .catch((err) => {
//         console.error('Login failed:', err);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Annular Technology" className="w-32" />
//         </div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//           {error && <p className="text-red-500">{error.message}</p>}
//         </form>
//         {user && (
//           <div className="mt-4 text-center">
//             <p>Welcome, {user.username}</p>
//             <p>Your user type: {user.userType}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// main code with backend api-------------------------------
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import logo from '/src/assets/logo.webp'; // Ensure the path to your logo is correct

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, user } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }))
//       .unwrap()
//       .then(() => {
//         // Navigate to /admin on successful login
//         navigate('/admin');
//       })
//       .catch((err) => {
//         console.error('Login failed:', err);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Annular Technology" className="w-32" />
//         </div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//           {error && <p className="text-red-500">{error}</p>}
//         </form>
//         {user && (
//           <div className="mt-4 text-center">
//             <p>Welcome, {user.username}</p>
//             <p>Your user type: {user.userType}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





// final code ----------------------------------------------
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';
// import logo from '/src/assets/logo.webp'; // Ensure the path to your logo is correct

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, user } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(loginUser({ email, password })).unwrap();
//       // Navigate to /admin on successful login
//       navigate('/admin');
//     } catch (err) {
//       console.error('Login failed:', err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Annular Technology" className="w-32" />
//         </div>
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full px-4 py-2 rounded-md shadow-sm ${
//               loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
//             } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//           {error && (
//             <p className="text-red-500 mt-2 text-center">
//               {error} {/* Display error message */}
//             </p>
//           )}
//         </form>
//         {user && (
//           <div className="mt-4 text-center">
//             <p>Welcome, {user.username}</p>
//             <p>Your user type: {user.userType}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;







// refresh code ----------------------------------
// login page for refresh token -------------------------
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, refreshToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo.webp';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        const tokenExp = JSON.parse(atob(token.split('.')[1])).exp;
        const now = Date.now() / 1000;

        // Refresh token if it will expire in less than 5 minutes
        if (tokenExp - now < 300) {
          dispatch(refreshToken());
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute 60000  300000
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password })).unwrap();
      if (resultAction.jwt) {
        // Store the JWT token and other user info in localStorage
        localStorage.setItem('jwt', resultAction.jwt);
        localStorage.setItem('userId', resultAction.userId);
        localStorage.setItem('username', resultAction.username);
        localStorage.setItem('userType', resultAction.userType);
      }
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Annular Technology" className="w-32" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md shadow-sm ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
        {/* {user && (
          <div className="mt-4 text-center">
            <p>Welcome, {user.username}</p>
            <p>Your user type: {user.userType}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LoginPage;
