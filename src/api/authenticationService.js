import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl || BASE_URL}/login`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl || BASE_URL}/api/users/${authRequest.username}`
    })
}

export const fetchAllUsers = () => {
    return axios({
        method:'GET',
        url:`${process.env.hostUrl || BASE_URL}/api/users`
    })
}