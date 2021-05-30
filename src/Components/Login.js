import React, {Component, useContext} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Alert from 'react-s-alert';

import {login, loginAxios} from '../Assets/APIutils';
import {  ACCESS_TOKEN } from '../Assets/constants';
import {LanguageContext, LanguageProvider, Text} from "../Assets/Languages/Language";


class Login extends Component{



    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.

        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }


    render() {

        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }}/>;
        }
        return (

            <div className="center">
                <div id="content">
                    <h1> Login</h1>
                    <LoginForm {...this.props} />
                </div>
            </div>
        );
    }

}

class LoginForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        //const loginRequest = {email: this.state.email, password: this.state.password };
        const loginRequest = Object.assign({}, this.state);
        
        loginAxios(loginRequest).then(response => {
            console.log(response);
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
           console.log("You're successfully logged in!");
            this.props.refresh();
            this.props.history.push("/");
        }).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });

    }

    static contextType = LanguageContext;

    render(){
        let {dictionary} = this.context;
        return (

            <div >
                <br/>
                { this.state.error !== '' && <span style={{color: "red"}}>{this.state.error}</span>}

                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="text" name="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} required />
                    </div >
                    <br/>
                    <div>
                        <label htmlFor="name"><Text tid="password" /></label>
                        <input type="password" name="password" value={this.state.password} placeholder={dictionary.password} onChange={this.handleInputChange} required />
                    </div>
                    <br/>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-primary"><Text tid="login" /></button>
                    </div>
                </form>
                <br/>

                <div className="center">
                    <Link to="/forgetPassword"> <Text tid="forgetPassword" /></Link>
                </div>
            </div>
        );

    }

}

export default Login;
