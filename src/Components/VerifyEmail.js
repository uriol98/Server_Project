import React, {Component} from 'react';
import { withRouter } from "react-router";
import {checkTokenResetPassword, verifyEmail} from "../Assets/APIutils";

class VerifyEmail extends Component{

    componentDidMount()
    {
        const token = this.props.match.params.token;
        console.log(token);
        verifyEmail(token).then(response => {

        }).catch(error => {
            console.log(error.message);
            this.props.history.push("/error");
        });

    }

    render() {
        return (

            <div id="content">
                <h1> Email Verified</h1>
                <p > Your email has been verified succesfully </p>
            </div>
        );
    }

}

export default VerifyEmail;
