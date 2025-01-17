import axios from "axios";
import Cookies from 'js-cookie';


const api = axios.create({
    // eslint-disable-next-line no-undef, no-constant-binary-expression

    baseURL: "http://127.0.0.1:8000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
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