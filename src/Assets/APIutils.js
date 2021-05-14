import { API_BASE_URL, ACCESS_TOKEN } from './constants';
import axios from "axios";

const headers = new Headers({
    'Content-Type': 'application/json',
});

const request = (options) => {


    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }


    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/me",
        method: 'GET'
    });
}

export function login(loginRequest) {

    localStorage.removeItem(ACCESS_TOKEN);
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)

    });
}

export function signup(signupRequest) {

    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkTokenResetPassword(requestOptions ){

    return request({
        url: API_BASE_URL + "/auth/reset",
        method: 'POST',
        body: JSON.stringify(requestOptions)
    });
}

export function forgetPassword(requestOptions ){

    return request({
        url: API_BASE_URL + "/auth/forget",
        method: 'POST',
        body: JSON.stringify(requestOptions)
    });
}

export function resetPassword(requestOptions, tokenReset ) {

    return request({
        url: API_BASE_URL + "/auth/reset/" + tokenReset,
        method: 'POST',
        body: JSON.stringify(requestOptions)
    });


}

export function verifyEmail( tokenVerify ) {

    return request({
        url: API_BASE_URL + "/users/verify/" + tokenVerify,
        method: 'GET'
    });
}

// --------------------------- prova axios -------------

const requestAxiosPost = (options) => {


    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }


    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    console.log(options.body);
    let body = {};
    return axios.post(options.url, options.body ,options.headers)
        .then((response) =>
             {
                return  response.data;
            }, (error) => {
                return  Promise.reject(error);
        } );

};

export function loginAxios(loginRequest) {

    localStorage.removeItem(ACCESS_TOKEN);
    return requestAxiosPost({
        url: API_BASE_URL + "/auth/login",
        body: loginRequest

    });
}

export function uploadFile(file) {


}
