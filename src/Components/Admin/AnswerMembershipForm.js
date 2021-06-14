import React, { Component} from 'react';
import {LanguageContext, Text} from "../../Assets/Languages/Language";
import {rejectRequest, sendMembershipDecision, uploadFile} from "../../Assets/APIutils";
import {BackButton} from "../../Assets/BackButton";
import Alert from "react-s-alert";
import Table from "react-bootstrap/Table";


class AnswerMembershipForm extends Component{


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            address: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: '',
            university: '',
            fieldOfStudy: '',
            yearGraduation: '',
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    static contextType = LanguageContext;


    keyPressFunc(e) {

        if(e.which === 8) {
            let val = this.state["dateAcceptance"];
            if(val.length === 3 || val.length === 6) {
                val = val.slice(0, val.length-1);
                this.setState({
                    ["dateOfBirth"] : val
                });
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const inputName = target.name;
        let inputValue = target.value;
        if (inputName === "dateAcceptance"){

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


    reject = (event) => {

        let {dictionary} = this.context;
        event.preventDefault();
        let  decisionRequestObject = {
            answer: "REJECTED",
            user: this.props.location.email

        };
        const decisionRequest = Object.assign({},decisionRequestObject);
        rejectRequest(decisionRequest).then(response => {
            Alert.success(dictionary.requestAnswer);
            this.props.history.push("/requests");

        }).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });

    };

    accept = (file, id) => {
        console.log("Passa aqui");
        let { dictionary } = this.context;
            const formData = new FormData();
            formData.append('file', file);
            uploadFile(formData,this.props.match.params.id).then(res => {
                this.props.history.push("/requests");
                Alert.success(dictionary.requestAnswer);
            }).catch(error => {
                this.setState({message: error.message});
                console.log(error.message);
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    };

    preAccept = (event) => {

        let {dictionary} = this.context;
        event.preventDefault();
        let role = this.state["role"];
        if(role === "user") { role = dictionary.user}
        else{ role = dictionary.extraordinary }
        let  decisionRequestObject = {
            answer: "ACCEPTED",
            user: this.props.location.user.email,
            dateAcceptance: this.state["dateAcceptance"],
            role: role,
            numberMembership: this.state["membershipNumber"],
            numberDocumentHeadSociety: this.state["numberDocumentHeadSociety"],
            numberDocumentMember: this.state["numberDocumentMember"]
        };
        const decisionRequest = Object.assign({},decisionRequestObject);


        const FileDownload = require('js-file-download');
        sendMembershipDecision(decisionRequest).then(response => {
            FileDownload(response, "Membership_declaration_"+this.props.location.user.name+"_"+this.props.location.user.surname+".pdf" );

        }).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });


    };




    render(){
        const selectOptions = ['extraordinary', 'user'];
        let {dictionary} = this.context;
        return (
            <div>

                <div className="center">
                    <div id="content">
                        <BackButton/>
                        <br/>

                        <br/>
                        <form className="mid-form" onSubmit={this.preAccept}>


                            <div className="form-group">
                                <label htmlFor="name"><Text tid="dateOfAcceptance" /></label>
                                <input  name="dateAcceptance" type = "text"

                                        value={this.state.dateAcceptance}
                                        onChange = {this.handleChange} onKeyDown={this.keyPressFunc} required/>

                            </div>


                            <div className="form-group">
                                <label htmlFor="name"><Text tid="role" /></label>
                                <select value={this.state.role}  onChange={this.handleChange}
                                        name="role"  className="select-css">
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
                                <label htmlFor="name"><Text tid="numberMembership" /></label>
                                <input className="form-input mt-1 block w-full"
                                       size="30" type="text" name="membershipNumber" value={this.state.membershipNumber}
                                       onChange={this.handleChange}  required/>

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="numberDocumentHeadSociety" /></label>
                                <input  size="50" type="text" name="numberDocumentHeadSociety" value={this.state.numberDocumentHeadSociety}
                                        className="form-input mt-1 block w-full"
                                        onChange={this.handleChange}  required />

                            </div>

                            <div className="form-group">
                                <label  htmlFor="name"><Text tid="numberDocumentMember" /></label>
                                <input  size="50" type="text" name="numberDocumentMember" value={this.state.numberDocumentMember}
                                        className="form-input mt-1 block w-full"
                                        onChange={this.handleChange}  required />
                            </div>

                            <Table>
                                <tbody>
                                <tr>
                                    <td> </td>
                                    <td> <button className="btn btn-block btn-primary" value = "submit"> <Text tid="accept" /></button>  </td>
                                    <td> <button className="btn btn-block btn-primary" onClick={this.reject} > <Text tid="reject" /></button> </td>
                                </tr>
                                </tbody>
                            </Table>

                            <br/>
                            <br/>
                            <div className="clearfix"></div>

                        </form>

                        <UploadMembershipDocument {...this.props}  />
                    </div>

                </div>

            </div>
        );
    }
}
export default AnswerMembershipForm;

class UploadMembershipDocument extends Component{

    static contextType = LanguageContext;


    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            message: ''
        }
        this.acceptUser = this.acceptUser.bind(this);
    }

    fileChange = (event) =>{
        this.setState({
            selectedFile: event.target.files[0]
        });

    };

    acceptUser (event) {
        let { dictionary } = this.context;
        event.preventDefault();
        if(this.state.selectedFile !== null){
            const formData = new FormData();
            formData.append('file', this.state.selectedFile);
            uploadFile(formData,this.props.match.params.id).then(res => {
                this.props.history.push("/requests");
                Alert.success(dictionary.requestAnswer);
            }).catch(error => {
                this.setState({message: error.message});
                console.log(error.message);
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
    };

    render() {
        return (
            <div id="uploadForm">

                { this.state.message !== '' && <span >{this.state.message}</span>}
                <form  className="mid-form" onSubmit={this.acceptUser}>
                    <Table>
                        <tbody>
                        <tr>
                            <td><input type="file" name="membershipSigned" onChange={this.fileChange}/> </td>

                        </tr>
                        <tr>
                            <td><button type="submit" className="btn btn-block btn-primary"> <Text tid="upload" /></button> </td>
                        </tr>
                        </tbody>

                    </Table>

                </form>
            </div>
        );
    }
}
