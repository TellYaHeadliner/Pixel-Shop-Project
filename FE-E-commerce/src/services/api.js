import axios from "axios";
import "dotenv/config"

const api = axios.create({
    // eslint-disable-next-line no-undef, no-constant-binary-expression
    baseURL: "http://localhost:8000" || process.env.REACT_API_BASE_URL ,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) =>  response,
    (error) => {
        if (error.response?.status === 401){
            console.error("Unauthorized !", error.response);
        }
        return Promise.reject(error);
    }
)

export default api;