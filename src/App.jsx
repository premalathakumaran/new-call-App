
// // this code with page routing --------------------------------------------------

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import Admin from './pages/Admin';
// import Table from './components/Table';
// import Group2 from './components/Group2.';

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/admin" element={<Admin />}>
//         {/* Set Table as the default child route */}
//         <Route index element={<Table />} />
//         <Route path="table" element={<Table />} />
//         <Route path="group" element={<Group2 />} />
//       </Route>
//     </Routes>
//   </Router>
// );

// export default App;






// main code if it is any error use this code -----// tis code without page routing ---------------------------------------------------------------------------------------

// // src/App.jsx
// import React from 'react';
// // import { Provider } from 'react-redux';----
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import store from './store'; ---
// import LoginPage from './pages/LoginPage';
// import Admin from './pages/Admin';

// const App = () => (
 
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//     </Router>

// );
// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound'; // Create a NotFound component for handling 404 errors

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} /> {/* Fallback route */}
    </Routes>
  </Router>
);

export default App;
