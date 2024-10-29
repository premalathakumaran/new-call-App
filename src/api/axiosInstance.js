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

const apiClient = axios.create({
  baseURL: 'https://www.annulartech.net', 
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)   
);


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
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`; 

        return apiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Handle refresh error (e.g., redirect to login)
      }
    }

    return Promise.reject(error); 
  }
);

export default apiClient;






// new methode for referhs token ---------------------

// import axios from 'axios';

// // Simple JWT decoder function to replace jwt-decode package
// function decodeJwt(token) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error('Error decoding JWT:', error);
//     return null;
//   }
// }

// class TokenService {
//   constructor() {
//     this.refreshTimeout = null;
//     this.tokenRefreshThreshold = 60; // Refresh token 60 seconds before expiry
//   }

//   getToken() {
//     return localStorage.getItem('jwt');
//   }

//   getRefreshToken() {
//     return localStorage.getItem('refreshToken');
//   }

//   setToken(token) {
//     localStorage.setItem('jwt', token);
//     this.setupTokenRefresh(token);
//   }

//   setRefreshToken(refreshToken) {
//     localStorage.setItem('refreshToken', refreshToken);
//   }

//   clearTokens() {
//     localStorage.removeItem('jwt');
//     localStorage.removeItem('refreshToken');
//     if (this.refreshTimeout) {
//       clearTimeout(this.refreshTimeout);
//     }
//   }

//   setupTokenRefresh(token) {
//     if (this.refreshTimeout) {
//       clearTimeout(this.refreshTimeout);
//     }

//     try {
//       const decoded = decodeJwt(token);
//       if (!decoded || !decoded.exp) {
//         throw new Error('Invalid token format');
//       }

//       const expiryTime = decoded.exp * 1000; // Convert to milliseconds
//       const currentTime = Date.now();
//       const timeUntilRefresh = expiryTime - currentTime - (this.tokenRefreshThreshold * 1000);

//       if (timeUntilRefresh > 0) {
//         this.refreshTimeout = setTimeout(
//           () => this.refreshToken(),
//           timeUntilRefresh
//         );
//       } else {
//         // Token is already expired or very close to expiry
//         this.refreshToken();
//       }
//     } catch (error) {
//       console.error('Error setting up token refresh:', error);
//     }
//   }

//   async refreshToken() {
//     const refreshToken = this.getRefreshToken();

//     if (!refreshToken) {
//       console.error('No refresh token found');
//       this.handleAuthError();
//       return null;
//     }

//     try {
//       const response = await axios.post('http://13.127.211.81:8085/user/refreshToken', {
//         token: refreshToken, 
//       });

//       const { jwt } = response.data;
//       this.setToken(jwt);
//       return jwt;
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       this.handleAuthError();
//       return null;
//     }
//   }

//   handleAuthError() {
//     this.clearTokens();
//     window.dispatchEvent(new CustomEvent('authError'));
//   }
// }

// const tokenService = new TokenService();

// const apiClient = axios.create({
//   baseURL: 'https://www.annulartech.net',
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = tokenService.getToken();
//     if (token) {
//       // Fixed: Using proper string concatenation with quotes
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const newToken = await tokenService.refreshToken();
//       if (newToken) {
//         // Fixed: Using proper string concatenation with quotes
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Initialize token refresh on startup if a token exists
// const existingToken = tokenService.getToken();
// if (existingToken) {
//   tokenService.setupTokenRefresh(existingToken);
// }

// // Event listener for handling auth errors
// window.addEventListener('authError', () => {
//   console.log('Authentication error occurred. Redirecting to login...');
//   // Add your redirect logic here, for example:
//   // window.location.href = '/login';
// });

// export default apiClient;
// export { tokenService };