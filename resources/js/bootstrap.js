import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// If you use Laravel Sanctum for API authentication, you may also want:
window.axios.defaults.withCredentials = true;