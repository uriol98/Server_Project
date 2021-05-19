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

                        {!this.props.currentUser.imageUrl ?
                            (

                                <p> not image</p>
                            ) :
                            (<img src={`data:image/jpg;base64,${data}`}  width="200" />)}
                        <p><strong> Name: </strong>{this.props.currentUser.name}</p>
                        <p className="profile-email"><strong> Email: </strong>{this.props.currentUser.email}</p>
                        <p><strong>Phone number: </strong> {this.props.currentUser.phoneNumber}</p>
                        <p><strong>Gender: </strong> {this.props.currentUser.gender}</p>
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
/*
class UpdateProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            surname: '',
            password1: '',
            password2: '',
            gender: '',

            error: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const loginRequest = Object.assign({}, this.state);

        login(loginRequest).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("You're successfully logged in!",{
                position: 'top-right'});

            console.log("You're successfully logged in!");
            this.props.authenticate();
            this.props.history.push("/");
        }).catch(error => {
            this.setState({error: error.message});
            console.log(error.message);
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });

    }

    render(){
        return (
            <div> hello world</div>
        );

    }

}
*/
export default Profile
