import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true; // Include cookies for session auth

// Add CSRF token to all requests
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
}

// Set Accept header for API requests
axios.defaults.headers.common['Accept'] = 'application/json';

// Add interceptor to handle authentication errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('Axios interceptor caught error:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            // Log the 401 but don't redirect for now to debug
            console.warn('401 Unauthorized error caught - NOT redirecting for debugging');
            // TODO: Re-enable redirects once streaming is working
            // window.location.href = '/login';
        } else if (error.response?.status === 419) {
            // CSRF token mismatch - reload page to get new token
            console.warn('419 CSRF error - reloading page');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axios;
