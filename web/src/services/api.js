import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-3txqw05ap-yyhagos-projects.vercel.app/petshops',
});

export default api;