import React, {Component} from 'react';
import 'react-phone-number-input/style.css';
import {Link, Redirect} from "react-router-dom";
import {  ACCESS_TOKEN } from '../Assets/constants';
import {UpdateProfileRequest} from '../Assets/APIutils';
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import validator from "validator";
import {LanguageContext, Text} from "../Assets/Languages/Language";
import Alert from "react-s-alert";

class UpdateProfile extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            address: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: '',
            errors: {}
        };

        this.keyPressFunc = this.keyPressFunc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(props) {
        this.setState({
            name: this.props.currentUser.name,
            surname: this.props.currentUser.surname,
            address: this.props.currentUser.address,
            phoneNumber: this.props.currentUser.phoneNumber,
            gender: this.props.currentUser.gender,
            dateOfBirth: this.props.currentUser.dateOfBirth,
            errors: {}
        });
    }

    handleChange(event) {
        const target = event.target;
        const inputName = target.name;
        var inputValue = target.value;
        if (inputName === "dateOfBirth"){

            if (inputValue.length === 2) {

                inputValue += '/';

            } else if (inputValue.length === 5) {

                inputValue += '/';

            }

        }

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.handleValidation()){
            let updateForm = {
                name: this.state["name"],
                surname: this.state["surname"],
                gender: this.state["gender"],
                dateOfBirth: this.state["dateOfBirth"],
                address: this.state["address"],
                phoneNumber: this.state["phone"]
            };

            let { dictionary } = this.context;
            UpdateProfileRequest(updateForm).then(response => {

                this.props.history.push("/profile");
                Alert.success(dictionary["profileUpdateAlert"]);
                this.props.refresh();
            }).catch(error => {
                this.setState({error: error.message});
                console.log(error.message);
            });
        }

    }

    handleChangePhone = (phone) => {

        this.setState({
            ["phone"]: phone
        });
    };

    keyPressFunc(e) {

        if(e.which === 8) {
            let val = this.state["dateOfBirth"];
            if(val.length === 3 || val.length === 6) {
                val = val.slice(0, val.length-1);
                this.setState({
                    ["dateOfBirth"] : val
                });
            }
        }
    }


    handleValidation(){
        let fields = this.state;
        let errors = {};
        let { dictionary } = this.context;
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "This field must not be empty";
        }



        if(!fields["surname"]){
            formIsValid = false;
            errors["surname"] = "This field must not be empty";

        }


        if(!fields["dateOfBirth"]){
            formIsValid = false;
            errors["dateOfBirth"] = "This field must not be empty";
        }

        if(typeof fields["dateOfBirth"] !== "undefined"){
            if(!validator.isDate(fields["dateOfBirth"],'DD/MM/YYYY')){
                formIsValid = false;
                errors["dateOfBirth"] = dictionary.errorDateOfBirth;
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
                errors["phone"] = dictionary.errorPhone;
            }
        }

        this.setState({errors: errors});
        return formIsValid;

    }




    render(){

        const selectOptions = ['male', 'female', 'other'];
        let {dictionary} = this.context;
        return (
            <div>

                <div className="center">
                    <div id="content">
                        <form className="mid-form" onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="name"><Text tid="name" /></label>
                                <input className="form-input mt-1 block w-full"
                                       size="30" type="text" name="name" value={this.state.name}

                                       onChange={this.handleChange}  required/>

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="surname" /></label>
                                <input  size="50" type="text" name="surname" value={this.state.surname}
                                        onChange={this.handleChange}  required />

                            </div>


                            <div className="form-group">
                                <label htmlFor="name"><Text tid="gender" /></label>
                                <select value={this.state.gender}  onChange={this.handleChange}
                                        name="gender"  className="select-css">
                                    {
                                        selectOptions.map(option => (
                                            <option key={option} value={option}>
                                                {dictionary[option]}
                                            </option>
                                        ))
                                    }
                                </select>

                            </div>

                            <br/>

                            <div className="form-group">
                                <label htmlFor="name"><Text tid="dateOfBirth" /></label>
                                <input  name="dateOfBirth" type = "text"

                                        value={this.state.dateOfBirth}
                                        onChange = {this.handleChange} onKeyDown={this.keyPressFunc} required/>

                            </div>


                            <div className="form-group">
                                <label htmlFor="name"><Text tid="address" /></label>
                                <input  type="text" size="50" name="address" value={this.state.address}
                                        placeholder={dictionary.street+', '+dictionary.number+', '+dictionary.city+', '+dictionary.zipCode+', '+dictionary.country}
                                        onChange={this.handleChange}  required />

                            </div>

                            <br/>

                                <div className="form-group">
                                    <label htmlFor="name"><Text tid="phoneNumber" /></label>
                                    <PhoneInput
                                        type="text"
                                        name="phone"
                                        defaultCountry="PL"
                                        value={this.state.phone}
                                        onChange={this.handleChangePhone} required
                                    />
                                    <br/>

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
export default UpdateProfile;

