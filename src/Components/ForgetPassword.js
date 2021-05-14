import React, {Component} from 'react';
import {checkTokenResetPassword, forgetPassword} from "../Assets/APIutils";


class ForgetPassword extends Component{

    constructor() {
        super();
        this.state ={
            email: '',
            error: ''
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

    handleSubmit(event) {
        event.preventDefault();

        let valid = true;
        if (this.state.email === ''){
            valid = false;
            this.setState({error: 'Enter a valid email'})
        }
        else if(typeof this.state.email !== "undefined"){

            if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                valid = false;
                this.setState({error: 'Enter a valid email'});
            }
        }
        else { this.setState({error: ''}); }

        if(valid === true){

            const email = Object.assign({}, {email: this.state.email});
            console.log(email);
            forgetPassword(email).then(response => {
                console.log("Email sent");

            }).catch(error => {
                console.log(error.message);
                this.setState({error: "This email doesn't exists"})
            });
        }


    }

    render() {
        return (
            <div id="content">
                <h2 > Have you forgotten your password?</h2>
                <br/>
                <p> Enter your email and you will get a link to reset your password</p>
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  placeholder="Email"  required />
                    </div >
                    <span style={{color: "red"}}>{this.state.error}</span>
                    <br />
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-primary">Send email</button>
                    </div>

                </form>
            </div>

        );
    }
}

export default ForgetPassword;
