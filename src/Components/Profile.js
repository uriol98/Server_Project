import React, {Component} from 'react';
import {login, uploadFile} from "../Assets/APIutils";
import {ACCESS_TOKEN} from "../Assets/constants";
import Alert from "react-s-alert";
import {Link} from "react-router-dom";
import UploadDocument from "./UploadDocument";


class Profile extends Component{

    constructor(props) {
        super(props);

    }


    render() {

        let data = "";
        if(this.props.currentUser.image !== null){

            data = this.props.currentUser.imageUrl.data;
        }

        return (
            <div id="content">
                <div className="container">
                    <div className="center">

                        <Link to="/profile/update" className="btn btn-primary"> Update Profile</Link>
                        <br/>
                        <br/>
                        {!this.props.currentUser.imageUrl ?
                            (

                                <p> not image</p>
                            ) :
                            (<img src={`data:image/jpg;base64,${data}`}  width="200" />)}
                        <p><strong> Name: </strong>{this.props.currentUser.name}</p>
                        <p><strong> Surname: </strong>{this.props.currentUser.surname}</p>
                        <p className="profile-email"><strong> Email: </strong>{this.props.currentUser.email}</p>
                        <p><strong>Phone number: </strong> {this.props.currentUser.phoneNumber}</p>
                        <p><strong>Gender: </strong> {this.props.currentUser.gender}</p>
                        <p><strong>Address:</strong> {this.props.currentUser.address}</p>
                        <p><strong>Email is verified:</strong> {this.props.currentUser.emailVerified ? 'True' : 'False'}</p>
                        <br/>
                        <br/>
                        <UploadDocument {...this.props} />
                        {

                    }
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile
