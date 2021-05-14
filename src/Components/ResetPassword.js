import React, {Component} from 'react';
import { withRouter } from "react-router";
import {checkTokenResetPassword, resetPassword} from "../Assets/APIutils";
import Alert from "react-s-alert";


class ResetPassword extends Component{

    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: '',
            error: '',
            token: '',
            valid: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }


    componentDidMount()
     {
        const token = {token: this.props.match.params.token};


        const checkTokenRequest = Object.assign({}, token);
        console.log( checkTokenRequest);
        checkTokenResetPassword(checkTokenRequest).then(response => {
            this.setState(state => ({valid: true}));
        }).catch(error => {
            console.log(error.message);
            this.props.history.push("/error");
        });

    }

    handleSubmit(event) {
        event.preventDefault();


        if(this.state.password1 !== this.state.password2 ){

            this.setState({error: "Passwords don't match"});
        }
       else{
            this.setState({error: ""});

            console.log("Password valid", this.state);
            const passwordObject = Object.assign({}, {password: this.state.password1});
            console.log( passwordObject);
            resetPassword(passwordObject,this.props.match.params.token).then(response => {
                console.log("You've successfully change the password");
                this.props.history.push("/login");
            }).catch(error => {
                console.log(error.message);

            });

        }


    }

    render() {
        return(
            <div id="content">
                <h2 > Reset Password</h2>
                <br/>
                <p> Please, enter a new password for your account</p>
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange}  placeholder="Enter a new password"  required />
                    </div >
                    <span style={{color: "red"}}>{this.state.error}</span>
                    <br />
                    <br />
                    <div className="form-group">
                        <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange}  placeholder="Confirmate your password"  required />
                    </div >
                    <br/>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-primary">Reset password</button>
                    </div>

                </form>
            </div>

        );
    }

}

export default ResetPassword;
