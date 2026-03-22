import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.56.180:5000/api',
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response, (error) => {
        const status = error.response ? error.response.status : null;
        console.log(status);
        console.log(error.response?.data?.message || "Message is emtpy");

        return Promise.reject(error);
    }
);

/*
api.interceptors.response.use(
    (response) => response, (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            window.location.href = "/login"; // Force redirect
        } else if (status === 500) {
            alert("The server is having a bad day. Please try again later.");
        } else if (!error.response) {
            alert("Network error: Please check your internet connection.");
        }
        return Promise.reject(error);
    }
);
*/

export default api;