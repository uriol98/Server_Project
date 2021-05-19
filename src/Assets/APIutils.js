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

    return requestAxios({
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

    return requestAxios({
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

    return requestAxios({
        url: API_BASE_URL + "/auth/forget",
        method: 'POST',
        body: JSON.stringify(requestOptions)
    });
}

export function resetPassword(requestOptions, tokenReset ) {

    return requestAxios({
        url: API_BASE_URL + "/auth/reset/" + tokenReset,
        method: 'POST',
        body: JSON.stringify(requestOptions)
    });


}

export function verifyEmail( tokenVerify ) {

    return requestAxios({
        url: API_BASE_URL + "/users/verify/" + tokenVerify,
        method: 'GET'
    });
}

// --------------------------- prova axios -------------

const requestAxios = (options) => {


    let headers2 = {
        'Content-Type': 'application/json',
    };
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers2['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

    return axios({
        method: options.method,
        url: options.url,
        data: options.body,
        headers: {'Content-Type': headers2['Content-Type'],
        'Authorization': headers2['Authorization']}
    })
        .then((response) =>
             {
                return  response.data;
            }, (error) => {
                return  Promise.reject(error);
        } );

};

export function loginAxios(loginRequest) {

    localStorage.removeItem(ACCESS_TOKEN);
    return requestAxios({
        url: API_BASE_URL + "/auth/login",
        body: loginRequest,
        method: 'POST'

    });
}


export function uploadFile(formData) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxiosFile({
        url: API_BASE_URL + "/users/image",
        method: 'POST',
        body: formData
    });
}


const requestAxiosFile = (options) => {


    let headers2 = {
        'Content-Type': 'multipart/form-data',
    };
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers2['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }
    console.log(options);
    return axios({
        method: options.method,
        url: options.url,
        data: options.body,
        headers: {
            'Content-Type': headers2['Content-Type'],
            'Authorization': headers2['Authorization'],
            }
    })
        .then((response) =>
        {
            return  response.data;
        }, (error) => {
            return  Promise.reject(error);
        } );

};
