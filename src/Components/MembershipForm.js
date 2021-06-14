import React, { Component } from 'react';
import {LanguageContext, Text} from "../Assets/Languages/Language";
import {
    checkTokenResetPassword,
    getMembership,
    UpdateProfileRequest,
    uploadMembershipInformation
} from "../Assets/APIutils";
import validator from "validator";
import Alert from 'react-s-alert';
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";

class MembershipForm extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            informationPromoter1: '',
            informationPromoter2: '',
            placeOfWork: '',
            addressPlaceOfWork: '',
            position: '',
            university: '',
            faculty: '',
            fieldOfStudy: '',
            yearGraduation: '',
            universityTitle: '',
            diplomaNumberPsychologist: '',
            speciality: '',
            gradeOfSpeciality: '',
            yearSpeciality: '',
            specialInterestsPsychology: '',
            errors: {}
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        getMembership().then(response => {

            this.setState({
                informationPromoter1: response.informationPromoter1,
                informationPromoter2: response.informationPromoter2,
                placeOfWork: response.placeOfWork,
                addressPlaceOfWork: response.addressPlaceOfWork,
                position: response.position,
                university: response.university,
                faculty: response.faculty,
                fieldOfStudy: response.fieldOfStudy,
                yearGraduation: response.yearGraduation,
                universityTitle: response.universityTitle,
                diplomaNumberPsychologist: response.diplomaNumberPsychologist,
                speciality: response.speciality,
                gradeOfSpeciality: response.gradeOfSpeciality,
                yearSpeciality: response.yearSpeciality,
                specialInterestsPsychology: response.specialInterestsPsychology

            });
            console.log(response);

        }).catch(error => {
            console.log(error.message);
        });

    }


    handleChange(event) {
        const target = event.target;
        const inputName = target.name;
        var inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        //if(this.handleValidation()){
            let membershipForm = {
                informationPromoter1: this.state["informationPromoter1"],
                informationPromoter2: this.state["informationPromoter2"],
                placeOfWork: this.state["placeOfWork"],
                addressPlaceOfWork: this.state["addressPlaceOfWork"],
                position: this.state["position"],
                university: this.state["university"],
                faculty: this.state["faculty"],
                fieldOfStudy: this.state["fieldOfStudy"],
                yearGraduation: this.state["yearGraduation"],
                universityTitle: this.state["universityTitle"],
                diplomaNumberPsychologist: this.state["diplomaNumberPsychologist"],
                speciality: this.state["speciality"],
                gradeOfSpeciality: this.state["gradeOfSpeciality"],
                yearSpeciality: this.state["yearSpeciality"],
                specialInterestsPsychology: this.state["specialInterestsPsychology"],
            };

        uploadMembershipInformation(membershipForm).then(response => {
            this.props.history.push("/files");
            Alert.success("Membership information uploaded successfully");
        }).catch(error => {
            this.setState({error: error.message});
            Alert.error("Error while uploading membership information");
        });

       // }



    }

    handleValidation(){
        let fields = this.state;
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




    render(){

        let {dictionary} = this.context;
        return (
            <div>
                <div className="center">
                    <div id="content">
                        <form className="mid-form" onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="name"><Text tid="societyCaptor" /> 1</label>
                                <input className="form-input mt-1 block w-full"
                                       placeholder={dictionary.surname + ', '+dictionary.name+', '+dictionary.address+', '+dictionary.societyRank}
                                       size="100" type="text" name="informationPromoter1" value={this.state.informationPromoter1}

                                       onChange={this.handleChange}  />

                            </div>


                            <div className="form-group">
                                <label htmlFor="name"><Text tid="societyCaptor" /> 2</label>
                                <input className="form-input mt-1 block w-full"
                                       size="100" type="text" name="informationPromoter2" value={this.state.informationPromoter2}
                                       placeholder={dictionary.surname + ', '+dictionary.name+', '+dictionary.address+', '+dictionary.societyRank}
                                       onChange={this.handleChange} />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="placeOfWork" /></label>
                                <input  size="50" type="text" name="placeOfWork" value={this.state.placeOfWork}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="position" /></label>
                                <input  size="50" type="text" name="position" value={this.state.position}
                                        onChange={this.handleChange}  />

                            </div>


                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="address" /> <Text tid="placeOfWork" /></label>
                                <input  size="50" type="text" name="addressPlaceOfWork" value={this.state.addressPlaceOfWork}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="university" /></label>
                                <input  size="50" type="text" name="university" value={this.state.university}
                                        onChange={this.handleChange}   />
                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="faculty" /></label>
                                <input  size="50" type="text" name="faculty" value={this.state.faculty}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="fieldOfStudy" /></label>
                                <input  size="50" type="text" name="fieldOfStudy" value={this.state.fieldOfStudy}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="yearGraduation" /></label>
                                <input  size="50" type="text" name="yearGraduation" value={this.state.yearGraduation}
                                        onChange={this.handleChange}   />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="universityTitle" /></label>
                                <input  size="50" type="text" name="universityTitle" value={this.state.universityTitle}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="diplomaNumberPsychologist" /></label>
                                <input  size="50" type="text" name="diplomaNumberPsychologist" value={this.state.diplomaNumberPsychologist}
                                        onChange={this.handleChange}  />

                            </div>


                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="speciality" /></label>
                                <input  size="50" type="text" name="speciality" value={this.state.speciality}
                                        onChange={this.handleChange}  />

                            </div>


                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="gradeSpeciality" /></label>
                                <input  size="50" type="text" name="gradeOfSpeciality" value={this.state.gradeOfSpeciality}
                                        onChange={this.handleChange}  />

                            </div>


                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="yearGraduation" /></label>
                                <input  size="50" type="text" name="yearSpeciality" value={this.state.yearSpeciality}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="specialInterestsPsychology" /></label>
                                <input  size="50" type="text" name="specialInterestsPsychology" value={this.state.specialInterestsPsychology}
                                        onChange={this.handleChange}  />

                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Submit" className="btn btn-success" />


                        </form>

                    </div>
                </div>

            </div>
        );

    }
}
export default MembershipForm;
