import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-nine-henna.vercel.app',
});

export default api;