import axios from 'axios';

var instance = axios.create({
    baseURL: "/",
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
});

const onRequestSuccess = config => {
    return config;
};

const onRequestError = error => {
    return Promise.reject(error);
}

instance.interceptors.request.use(onRequestSuccess, onRequestError);

const onResponseSuccess = (response) => response;

const onResponseError = (error) => {
    if (error.toString().includes('403')) {
        window.location.href = '/accessDenied';
    }
    return Promise.reject(error);
};

instance.interceptors.response.use(onResponseSuccess, onResponseError);


export default instance;
