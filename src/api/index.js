import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        const rotasPublicas = ["/login"]

        if (token && !rotasPublicas.some((rota) => config.url.includes(rota))) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default api;