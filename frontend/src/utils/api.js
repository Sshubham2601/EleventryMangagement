import axios from 'axios';
import { getItem } from './localstorage.js';

const baseURL = 'http://localhost:8000/api/v1/user/'; // Replace with your API base URL

// Create an axios instance
const httpClient = axios.create({
    baseURL,
    timeout: 10000,
});

// Request interceptor to add authorization token and custom headers
httpClient.interceptors.request.use(
    function (config) {
        const token = getItem('TOKEN');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        config.headers['Expires'] = '-1';
        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=-1, private';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
httpClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // Customize error handling based on your needs
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response error:', error.response.data);
            console.log('Status code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.log('Request error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default httpClient;
