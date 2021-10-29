import axios from "axios";
import {
    SERVER_API
} from './server';
import queryString from 'query-string';

const request = axios.create({
    baseURL: SERVER_API,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: (params) => queryString.stringify(params),
    timeout: 30000
})

request.interceptors.request.use(
    (config) => {
        config.headers['request-startTime'] = new Date().getTime();
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data
        }
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log(error)
            return Promise.reject(error)
        }
        console.log(error)
        return Promise.reject(error)
    }
)


export default request;