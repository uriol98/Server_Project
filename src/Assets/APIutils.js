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

    localStorage.removeItem(ACCESS_TOKEN);
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

export function requestMembership() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxios({
        url: API_BASE_URL + "/membership/request",
        method: "GET"
    })
}

export function uploadFile(formData, type) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    if( type ==="image"){
        return requestAxiosFile({
            url: API_BASE_URL + "/users/image",
            method: 'POST',
            body: formData
        });
    }
    else if (type === "diploma"){
        return requestAxiosFile({
            url: API_BASE_URL + "/documents/addDiploma",
            method: 'POST',
            body: formData
        });
    }
    else if (type === "membership") {
        return requestAxiosFile({
            url: API_BASE_URL + "/documents/addMembership",
            method: 'POST',
            body: formData
        });
    }

    else {
        return requestAxiosFile({
            url: API_BASE_URL + "/membership/accept/"+type,
            method: 'POST',
            body: formData
        });
    }
}

export function UpdateProfileRequest(updateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxios({
        url: API_BASE_URL + "/users/update",
        method: 'POST',
        body: updateRequest
    });
}

export function getDocument(id) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return axios({
        method: 'GET',
        url: API_BASE_URL + "/documents/"+id,
        responseType: 'blob', 
        headers: {'Content-Type': 'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then((response) =>
    {
        return response.data;
    }, (error) => {
        return  Promise.reject(error);
    } );
}

export function GeneratePDF() {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }


    return axios({
        method: 'GET',
        url: API_BASE_URL + "/membership/generatepdf",
        responseType: 'blob',
        headers: {'Content-Type': 'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
    })
        .then((response) =>
        {
                return response.data;
        }, (error) => {
            return  Promise.reject(error);
        } );

}

export function getAllUsers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxios({
        url: API_BASE_URL + "/users/all",
        method: 'GET'
    });
}

export function getRequests() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxios({
        url: API_BASE_URL + "/users/requests",
        method: 'GET'
    });
}

export function sendMembershipDecision(membershipDecision) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }


    return axios({
        method: 'POST',
        data: membershipDecision,
        url: API_BASE_URL + "/membership/preAccept",
        responseType: 'blob',
        headers: {'Content-Type': 'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    })
        .then((response) =>
        {
            return response.data;
        }, (error) => {
            return  Promise.reject(error);
        } );

}

export function rejectRequest(membershipDecision) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestAxios({
        url: API_BASE_URL + "/membership/reject",
        method: 'POST',
        body: membershipDecision
    });
}

export function uploadMembershipInformation(membershipInformationForm) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/membership/uploadForm",
        method: 'POST',
        body: membershipInformationForm
    });

}

export function getUserDocuments(id, requestBody){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/documents/user/"+ id,
        method: 'POST',
        body: requestBody
    });
}

export function getMembership() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/membership/",
        method: "GET"
    });

}

export function getDocumentByType(documentType) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return axios({
        method: 'GET',
        url: API_BASE_URL + "/documents/type/"+documentType,
        responseType: 'blob',
        headers: {'Content-Type': 'application/json',
            'Authorization':  'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then((response) =>
    {
        return response.data;
    }, (error) => {
        return  Promise.reject(error);
    } );
}

export function changePassword(password) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/users/password",
        method: "POST",
        body: password
    });
}

export function changeEmail(email) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/users/email",
        method: "POST",
        body: email
    });
}

export function canMakeRequest() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return requestAxios({
        url: API_BASE_URL + "/membership/exist",
        method: "GET"
    });
}

const requestAxiosFile = (options) => {


    let headers2 = {
        'Content-Type': 'multipart/form-data',
    };
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers2['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

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
