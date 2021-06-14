import React, {Component} from 'react';
import { verifyEmail} from "../Assets/APIutils";
import {Text} from "../Assets/Languages/Language";

class VerifyEmail extends Component{

    componentDidMount()
    {
        const token = this.props.match.params.token;
        verifyEmail(token).then(response => {

        }).catch(error => {
            console.log(error.message);
            this.props.history.push("/error");
        });

    }

    render() {
        return (

            <div id="content">
                <h1> <Text tid="emailVerified" /></h1>
                <p > <Text tid="emailVerifiedText" /> </p>
            </div>
        );
    }

}

export default VerifyEmail;
