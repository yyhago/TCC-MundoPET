import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tcc-mundo-pet-api.vercel.app',
});

export default api;