import axios from 'axios';
const API_URL="http://localhost:8081/"
const axiosBaseApi = axios.create({
    baseURL: API_URL,
    origin: true, credentials: true,
    // withCredentials: true,
    'Access-Control-Allow-Credentials':true,
    // headers: {"Access-Control-Allow-Origin": "*"} ,
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    "Content-Type": "application/json",
});
const serverRequest = (requestType , paramsObj, url) => {
    switch(requestType){
        case 'POST':
        case 'post':
            return axiosBaseApi.post(url,paramsObj);
        case 'GET':
        case 'get':
            return axiosBaseApi.get(url,{params:paramsObj});
        case 'PATCH':
        case 'patch':
        return axiosBaseApi.patch(url,paramsObj);
        default : return new Promise((resolve) => {
            return resolve({statusCode: 'FAILURE', message: 'Invalid request type. Please try again!'});
        })
    }
}
export default serverRequest;