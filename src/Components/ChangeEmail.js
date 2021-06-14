import React, {Component} from 'react';
import { withRouter } from "react-router";
import {changeEmail, changePassword, checkTokenResetPassword, resetPassword} from "../Assets/APIutils";
import Alert from "react-s-alert";
import {LanguageContext, Text} from "../Assets/Languages/Language";
import {BackButton} from "../Assets/BackButton";


class ChangeEmail extends Component{


    static contextType = LanguageContext;


    constructor(props) {
        super(props);
        this.state = {
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

        let {dictionary} = this.context;
        if(! this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ){
            this.setState({error: dictionary.errorEmail})
        }
        else {
            this.setState({error: ""});
            const emailObject = Object.assign({}, {email: this.state.email});
            console.log(emailObject);
           changeEmail(emailObject).then(response => {
                Alert.success(dictionary["changeEmailAlert"]);
                this.props.history.push("/home");
            }).catch(error => {
                Alert.error(dictionary.emailAlreadyExists);
                this.setState({error: dictionary.emailAlreadyExists});

            });
        }
    }

    render() {
        let {dictionary} = this.context;
        return(
            <div id="content">
                <br/>
                <BackButton/>
                <br/>
                <h2 > <Text tid="changeEmail" /></h2>
                <br/>
                <p> <Text tid="changeEmailText" /></p>
                <form className="mid-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  placeholder = 'example@example.com'  required />
                    </div >
                    <span style={{color: "red"}}>{this.state.error}</span>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-block btn-primary"><Text tid="changeEmail" /></button>
                    </div>

                </form>
            </div>

        );
    }

}

export default ChangeEmail;
