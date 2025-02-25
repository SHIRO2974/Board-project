import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});
api.interceptors.request.use(config => {// 요청할 때 마다 

    const accessToken = localStorage.getItem("AccessToken");
    config.headers.Authorization = accessToken && `Bearer ${localStorage.getItem("AccessToken")}`;
    return config;
});     

export const setTokenLocalStorage = (name, token) => {

    
    if(!!token) {   // 토큰에 값이 있다면

        localStorage.setItem(name, token)   // key, value

    } else {

        localStorage.removeItem(name)
    }
} 