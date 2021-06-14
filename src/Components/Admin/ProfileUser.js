import React, { Component} from 'react';
import {LanguageContext, Text} from "../../Assets/Languages/Language";
import {NavLink, useHistory} from "react-router-dom";
import Table from "react-bootstrap/Table";

import {GeneratePDF, getDocument, getUserDocuments, sendMembershipDecision} from "../../Assets/APIutils";

import Alert from "react-s-alert";
import {BackButton} from "../../Assets/BackButton";

class ProfileUser extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = {
            documents: []
        }
    }

    UNSAFE_componentWillMount() {

        if(this.props.location.currentUser.roles[0] !== "ROLE_ADMIN"){
            this.props.history.push("/error");
        }

        let  getAllDocumentsUser = {
            email: this.props.location.user.email
        };
        const getAllDocumentsUserRequest = Object.assign({}, getAllDocumentsUser);
        getUserDocuments(this.props.location.user.id,getAllDocumentsUserRequest).then(response => {

            this.setState({documents: response});

        }).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });



    }

    downloadEvent = (document, event) => {
        const FileDownload = require('js-file-download');
        getDocument(document.id).then((response => {
            FileDownload(response, document.title+".pdf" );
        })).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
        });
    };



    render() {

        let data = "";
        if(this.props.location.user.image !== null){

            data = this.props.location.user.imageUrl.data;
        }
        let {dictionary} = this.context;
        return (
            <div id="content">
                <BackButton/>
                <br/>
                <h1> <Text tid="profile" /></h1>
                <div className="center">

                    <br/>
                    <Table>
                        <tbody>
                        <tr>
                            <td>
                                {!this.props.location.user.imageUrl ?
                                    (

                                        <p> <Text tid="notImage" /></p>
                                    ) :
                                    (<img src={`data:image/jpg;base64,${data}`}  width="200" />)}
                            </td>
                            <td>
                                <p><strong> <Text tid="name" />: </strong>{this.props.location.user.name}</p>
                                <p><strong> <Text tid="surname" />: </strong>{this.props.location.user.surname}</p>
                                <p className="profile-email"><strong> <Text tid="email" />: </strong>{this.props.location.user.email}</p>
                                <p><strong><Text tid="dateOfBirth" />: </strong>{this.props.location.user.dateOfBirth}</p>
                                <p><strong><Text tid="phoneNumber" />: </strong> {this.props.location.user.phoneNumber}</p>
                                <p><strong><Text tid="gender" />: </strong> {this.props.location.user.gender}</p>
                                <p><strong><Text tid="address" />:</strong> {this.props.location.user.address}</p>
                                <p><strong><Text tid="emailVerified" />:</strong> {this.props.location.user.emailVerified ? dictionary["true"] : dictionary["false"]}</p>
                            </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> <strong> <Text tid="documents" />: </strong>
                                <br/>
                                {
                                    this.state.documents.map((document, j) => {
                                        return <React.Fragment> <NavLink to={this.props.location}
                                            onClick={this.downloadEvent.bind(this,document)}  key={j}> {document.title} </NavLink>
                                            <br/>
                                        </React.Fragment>
                                    })
                                }
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <br/>

                </div>

            </div>
        );
    }

}
export default ProfileUser;
