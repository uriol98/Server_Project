import React, {Component} from 'react';
import { withRouter } from "react-router";
import {checkTokenResetPassword, resetPassword} from "../Assets/APIutils";
import Alert from "react-s-alert";
import {LanguageContext, Text} from "../Assets/Languages/Language";


class ResetPassword extends Component{


    static contextType = LanguageContext;


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


    UNSAFE_componentWillMount()
     {
        const token = {token: this.props.match.params.token};


        const checkTokenRequest = Object.assign({}, token);
        checkTokenResetPassword(checkTokenRequest).then(response => {
            this.setState(state => ({valid: true}));
        }).catch(error => {
            console.log(error.message);
            this.props.history.push("/error");
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        let {dictionary} = this.context;

        if(this.state.password1 !== this.state.password2 ){

            this.setState({error: "Passwords don't match"});
        }
       else{
            this.setState({error: ""});
            const passwordObject = Object.assign({}, {password: this.state.password1});
            resetPassword(passwordObject,this.props.match.params.token).then(response => {
                Alert.success(dictionary["changePasswordAlert"]);
                this.props.history.push("/login");
            }).catch(error => {
                console.log(error.message);

            });

        }


    }

    render() {
        let {dictionary} = this.context;
        return(
            <div id="content">
                <h2 > <Text tid="resetPassword" /></h2>
                <br/>
                <p> <Text tid="textResetPassword" /></p>
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange}  placeholder={dictionary.enterPassword}  required />
                    </div >
                    <span style={{color: "red"}}>{this.state.error}</span>
                    <br />
                    <br />
                    <div className="form-group">
                        <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange}  placeholder={dictionary.confirmPassword}  required />
                    </div >
                    <br/>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-primary"><Text tid="resetPassword" /></button>
                    </div>

                </form>
            </div>

        );
    }

}

export default ResetPassword;
