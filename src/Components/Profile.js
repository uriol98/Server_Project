import React, {Component} from 'react';
import {login, uploadFile} from "../Assets/APIutils";
import {ACCESS_TOKEN} from "../Assets/constants";
import Alert from "react-s-alert";
import {Link} from "react-router-dom";
import UploadDocument from "./UploadDocument";
import Table from 'react-bootstrap/Table';
import {LanguageContext, Text} from "../Assets/Languages/Language";
import {BackButton} from "../Assets/BackButton";



class Profile extends Component{

    static contextType = LanguageContext;

    constructor(props) {
        super(props);

    }


    render() {

        let {dictionary} = this.context;
        let data = "";
        if(this.props.currentUser.image !== null){

            data = this.props.currentUser.imageUrl.data;
        }

        return (
            <div id="content">
                <br/>
                <BackButton/>
                <br/>
                <h1> <Text tid="profile" /></h1>
                <br/>
                <br/>

                    <div className="center">

                        <p><strong><Text tid="upload" /> <Text tid="profileImage" /> </strong></p>
                        <UploadDocument {...this.props} type="image" />

                        <br/>
                        <br/>
                        <Table>
                            <tbody>
                            <tr>
                                <td>
                                    {!this.props.currentUser.imageUrl ?
                                        (

                                            <p> <Text tid="notImage" /></p>
                                        ) :
                                        (<img src={`data:image/jpg;base64,${data}`}  width="200" />)}
                                </td>
                                <td>
                                    <p><strong> <Text tid="name" />: </strong>{this.props.currentUser.name}</p>
                                    <p><strong> <Text tid="surname" />: </strong>{this.props.currentUser.surname}</p>
                                    <p className="profile-email"><strong> <Text tid="email" />: </strong>{this.props.currentUser.email}</p>
                                    <p><strong><Text tid="dateOfBirth" />: </strong>{this.props.currentUser.dateOfBirth}</p>
                                    <p><strong><Text tid="phoneNumber" />: </strong> {this.props.currentUser.phoneNumber}</p>
                                    <p><strong><Text tid="gender" />: </strong> {this.props.currentUser.gender}</p>
                                    <p><strong><Text tid="address" />:</strong> {this.props.currentUser.address}</p>
                                    <p><strong><Text tid="emailVerified" />:</strong> {this.props.currentUser.emailVerified ? dictionary["true"] : dictionary["false"]}</p>
                                    <p><strong>State: </strong>{this.props.currentUser.state}</p>
                                    <p><Link to="/changeEmail" > <Text tid="changeEmail" /></Link></p>
                                    <p><Link to="/changePassword" > <Text tid="changePassword" /></Link></p>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        <br/>
                        <br/>

                        <Link to="/profile/update" className="btn btn-primary"> <Text tid="updateProfile" /></Link>

                    </div>

            </div>
        );
    }
}
export default Profile
