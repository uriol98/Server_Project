import React, {Component} from "react";
import 'react-phone-number-input/style.css';
import PhoneInput, {isPossiblePhoneNumber, isValidPhoneNumber} from 'react-phone-number-input';
import { signup } from '../Assets/APIutils';
import Alert from 'react-s-alert';

import validator from 'validator'
import {LanguageContext, Text} from "../Assets/Languages/Language";

class Register extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            fields:{},
            errors: {}
        };
        this.keyPressFunc = this.keyPressFunc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

   handleChange(event){
       const target = event.target;
       const inputName = target.name;
       const inputValue = target.value;
        let fields = this.state.fields;
        let val = event.target.value;
        if (inputName === "dateOfBirth"){

            if (inputValue.length === 2) {

                val += '/';

            } else if (inputValue.length === 5) {

                val += '/';

            }

        }
        fields[inputName] = inputValue;
        this.setState({fields});
    }

    handleSubmit(e) {

        e.preventDefault();

        if(this.handleValidation()) {

            let signupForm = {
                name: this.state.fields["name"],
                surname: this.state.fields["surname"],
                email: this.state.fields["email"],
                password: this.state.fields["password1"],
                gender: this.state.fields["gender"],
                dateOfBirth: this.state.fields["dateOfBirth"],
                address: this.state.fields["address"],
                fieldOfStudy: this.state.fields["fieldOfStudy"],
                university: this.state.fields["university"],
                yearGraduation: this.state.fields["yearGraduation"],
                phoneNumber: this.state.fields["phone"]
            };

            console.log(signupForm);
            const signupRequest = Object.assign({}, signupForm);
            signup(signupRequest).then(response => {
                console.log("You're successfully registered");
                this.props.history.push("/login");
            }).catch(error => {
                let errors = {};
                errors["email"] = error.message;
                this.setState({errors: errors});
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

    }



        keyPressFunc(e) {

            if(e.which === 8) {
                let val = this.state.fields["dateOfBirth"];
                if(val.length === 3 || val.length === 6) {
                    val = val.slice(0, val.length-1);
                    console.log(val);
                    let fields = this.state.fields;
                    fields["dateOfBirth"] = val;
                    this.setState({fields});
                }
            }
        }



    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "This field must not be empty";
        }

        if(typeof fields["name"] !== "undefined" && fields["name"].length>0){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        if(!fields["surname"]){
            formIsValid = false;
            errors["surname"] = "This field must not be empty";

        }

        if(typeof fields["surname"] !== "undefined" && fields["surname"].length>0){
            if(!fields["surname"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["surname"] = "Only letters";
            }
        }

        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "This field must not be empty";
        }
        if(typeof fields["email"] !== "undefined"){

            if(!fields["email"].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                formIsValid = false;
                errors["email"] = "Email not valid";
            }
        }

        if(!fields["password1"]){
            formIsValid = false;
            errors["password1"] = "This field must not be empty";
        }
        if(!fields["password2"]){
            formIsValid = false;
            errors["password2"] = "This field must not be empty";
        }
        if(typeof fields["password1"] !=="undefined" && typeof fields["password2"] !=="undefined"){
            if(fields["password1"] !== fields["password2"] ){
                formIsValid = false;
                errors["password1"]= "Passwords don't match";
            }
        }

        if(!fields["dateOfBirth"]){
            formIsValid = false;
            errors["dateOfBirth"] = "This field must not be empty";
        }

        if(typeof fields["dateOfBirth"] !== "undefined"){
            if(!validator.isDate(fields["dateOfBirth"],'DD/MM/YYYY')){
                formIsValid = false;
                errors["dateOfBirth"] = "Invalid Date of Birth";
            }
        }

        if(typeof fields["gender"] === "undefined"){
            formIsValid = false;
            errors["gender"] = "This field must not be empty";
        }

        if(!fields["phone"]){
            formIsValid = false;
            errors["phone"] = "This field must not be empty";
        }

        if(typeof fields["phone"] !== "undefined"){
            if(!isValidPhoneNumber(fields["phone"])){
                formIsValid = false;
                errors["phone"] = "Phone is not valid";
            }
        }

        this.setState({errors: errors});
        return formIsValid;

    }




handleChangePhone = (phone) =>
{
    let fields = this.state.fields;
    fields["phone"] = phone;
    this.setState({fields});
};

    render(){

        const selectOptions = ['male', 'female', 'other'];
        let {dictionary} = this.context;

        return(
            <div>

                    <div className="center">
                        <div id="content">
                            <h1><Text tid="signup" /> </h1>

                            <form className="mid-form" onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="name" /></label>
                                    <input className="form-input mt-1 block w-full"
                                        size="30" type="text" name="name" value={this.state.fields["name"]}
                                           onChange={this.handleChange} placeholder = 'Ex: John' required/>
                                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>

                                </div>

                                <div className="form-group">
                                    <label  htmlFor="name"><Text tid="surname" /></label>
                                    <input  size="50" type="text" name="surname" value={this.state.fields["surname"]}
                                           onChange={this.handleChange} placeholder = 'Ex: Thompson' required />
                                    <span style={{color: "red"}}>{this.state.errors["surname"]}</span>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name">Email</label>
                                    <input  size="50" type="text" name="email" value={this.state.fields["email"]}
                                           onChange={this.handleChange} placeholder = 'example@example.com' required />
                                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="password" /></label>
                                    <input  type="password" size="30" name="password1" value={this.state.fields["password1"]}
                                           onChange={this.handleChange} placeholder={dictionary.enterPassword} required />
                                    <span style={{color: "red"}}>{this.state.errors["password1"]}</span>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="confirmPassword" /></label>
                                    <input  type="password" size="30" name="password2" value={this.state.fields["password2"]}
                                           onChange={this.handleChange} placeholder={dictionary.confirmPassword} required />
                                    <span style={{color: "red"}}>{this.state.errors["password2"]}</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="gender" /></label>
                                    <select value={this.state.fields["gender"]} defaultValue={'DEFAULT'} onChange={this.handleChange}
                                            name="gender"  className="select-css">
                                        {
                                            selectOptions.map(option => (
                                                <option key={option} value={option}>
                                                    {dictionary[option]}
                                                </option>
                                            ))
                                        }

                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors["gender"]}</span>
                                </div>

                                <br/>

                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="dateOfBirth" /></label>
                                    <input  name="dateOfBirth" type = "text"
                                           value={this.state.fields["dateOfBirth"]}  placeholder ={dictionary.day+'/'+dictionary.month+'/'+dictionary.year}
                                           onChange = {this.handleChange} onKeyDown={this.keyPressFunc} required/>
                                    <span style={{color: "red"}}>{this.state.errors["dateOfBirth"]}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="address" /></label>
                                    <input  type="text" size="50" name="address" value={this.state.fields["address"]}
                                           onChange={this.handleChange} placeholder = {dictionary.street+', '+dictionary.number+', '+dictionary.city+', '+dictionary.zipCode+', '+dictionary.country} required />
                                    <span style={{color: "red"}}>{this.state.errors["address"]}</span>
                                </div>

                                <div className="form-group">
                                    <label  htmlFor="name"><Text tid="university" /></label>
                                    <input  size="50" type="text" name="university" value={this.state.fields["university"]}
                                            onChange={this.handleChange} placeholder = {dictionary.universityEx} required />
                                </div>

                                <div className="form-group">
                                    <label  htmlFor="name"><Text tid="fieldOfStudy" /></label>
                                    <input  size="50" type="text" name="fieldOfStudy" value={this.state.fields["fieldOfStudy"]}
                                            onChange={this.handleChange} placeholder = {dictionary.fieldOfStudyEx} required />

                                </div>

                                <div className="form-group">
                                    <label  htmlFor="name"><Text tid="yearGraduation" /></label>
                                    <input  size="50" type="text" name="yearGraduation" value={this.state.fields["yearGraduation"]}
                                            onChange={this.handleChange} placeholder ={dictionary.year}  />

                                </div>

                                <br/>

                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="phoneNumber" /></label>
                                    <PhoneInput
                                        type="text"
                                        name="phone"
                                        defaultCountry="PL"
                                        placeholder = 'Ex: +48126155444'
                                        value={this.state.fields["phone"]}
                                        onChange={this.handleChangePhone} required
                                    />
                                <br/>
                                    <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                                </div>

                                <br/>

                                <div className="clearfix"></div>

                                <input type="submit" value="Submit" className="btn btn-success" />


                            </form>

                        </div>
                    </div>

            </div>
        );
    }
}

export default Register;
