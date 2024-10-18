// // axiosInstance.js
// import axios from 'axios';

// // Create an Axios instance
// const apiClient = axios.create({
//   baseURL: 'http://13.202.193.62:8085', // Base URL from env variable
// });

// // Add request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 error and not retried
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');

//       try {
//         const response = await axios.post(`${apiClient.defaults.baseURL}/user/refreshToken`, { token: refreshToken });
//         localStorage.setItem('jwt', response.data.jwt);
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token failed:', refreshError);
//         // Optionally, redirect to login page
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;





// main file for refresh token --------------------------------------

import axios from 'axios';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: 'https://www.annulartech.net', // Directly using the hardcoded URL
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request error
);

// Add response interceptor for refreshing the token
apiClient.interceptors.response.use(
  (response) => response, // Return the response
  async (error) => {
    const originalRequest = error.config;

    // If a 401 error occurs and the request has not been retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token

    console.log("refreshToken :" , refreshToken)

      if (!refreshToken) {
        console.error('No refresh token found. User needs to log in.');
        // Handle session expiration (e.g., redirect to login)
        return Promise.reject(error);
      }

      try {
        // Make a request to refresh the token
        const response = await axios.post('http://13.127.211.81:8085/user/refreshToken', {
          token: refreshToken,
        });

        const { jwt } = response.data; // Get new JWT from response
        localStorage.setItem('jwt', jwt); // Store new JWT securely
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`; // Update default header

        return apiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Handle refresh error (e.g., redirect to login)
      }
    }

    return Promise.reject(error); // Reject the original error
  }
);

export default apiClient;
