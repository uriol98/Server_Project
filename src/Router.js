import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { ACCESS_TOKEN } from './Assets/constants';
import { getCurrentUser, getCurrentUserAxios } from './Assets/APIutils';
import PrivateRoute from './Assets/PrivateRoute';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import Error from './Components/Error';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import VerifyEmail from './Components/VerifyEmail';
import Requests from './Components/Admin/Requests';
import UpdateProfile from './Components/UpdateProfile';
import MembershipHandler from './Components/MembershipHandler';
import Users from './Components/Admin/Users';
import ProfileUser from './Components/Admin/ProfileUser';
import MembershipForm from './Components/MembershipForm';
import AnswerMembershipForm from './Components/Admin/AnswerMembershipForm';
import {LanguageContext, LanguageProvider, Text} from "./Assets/Languages/Language";
import Footer from './Components/Footer';
import ChangePassword from './Components/ChangePassword';
import ChangeEmail from './Components/ChangeEmail';
import PrivacyNotice from './Components/PrivacyNotice';

class Router extends Component{


    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = {
          authenticated: false,
          currentUser: null,
          loading: false
        }
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
          loading: true
        });

     getCurrentUser()
        .then(response => {
           response.dateOfBirth = response.dateOfBirth.replaceAll(/-/g,'/');
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
          console.log(response);
          console.log("token: " + localStorage.getItem(ACCESS_TOKEN))
        }).catch(error => {
          this.setState({
            loading: false
          });
        });
      }

       handleLogout() {
       let {dictionary} = this.context;
          localStorage.removeItem(ACCESS_TOKEN);
          this.setState({
            authenticated: false,
            currentUser: null
          });
          Alert.success(dictionary["logoutText"]);

        }

    refresh () {
        this.loadCurrentlyLoggedInUser();
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
      }

    render(){
        return(

        <div>

            <BrowserRouter>

                <Header authenticated={this.state.authenticated} currentUser={this.state.currentUser} onLogout={this.handleLogout} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/privacy" component={PrivacyNotice} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/users/:id" component={ProfileUser} />
                    <PrivateRoute exact path="/changePassword" currentUser={this.state.currentUser} authenticated={this.state.authenticated} component={ChangePassword} />
                    <PrivateRoute exact path="/changeEmail" currentUser={this.state.currentUser} authenticated={this.state.authenticated} component={ChangeEmail} />
                    <Route exact path="/forgetPassword" component={ForgetPassword} />
                    <Route exact path="/verify/:token" component={VerifyEmail} />
                    <Route exact path="/reset/:token" component={ResetPassword} />
                    <Route exact path="/request/:id" currentUser={this.state.currentUser} component={AnswerMembershipForm}/>
                    <Route exact path="/membershipForm" currentUser={this.state.currentUser} component={MembershipForm} />
                    <PrivateRoute exact path="/requests" authenticated={this.state.authenticated} prevPath="requests"  currentUser={this.state.currentUser} component={Requests}  />
                    <Route exact path="/signup"  render={(props) => <Register authenticated={this.state.authenticated} {...props} />} />
                    <PrivateRoute exact path="/users" authenticated={this.state.authenticated} prevPath="users" currentUser={this.state.currentUser} component={Users} />
                    <PrivateRoute exact path="/profile" authenticated={this.state.authenticated} refresh={this.refresh} currentUser={this.state.currentUser}
                            component={Profile}/>
                      <PrivateRoute path="/files" authenticated={this.state.authenticated} refresh={this.refresh} currentUser={this.state.currentUser} component={MembershipHandler} />

                     <PrivateRoute exact path="/profile/update"  authenticated={this.state.authenticated} refresh={this.refresh} currentUser={this.state.currentUser}
                        component={UpdateProfile}/>
                   <Route path="/login"
                                 render={(props) => <Login authenticated={this.state.authenticated} refresh={this.refresh} {...props} />}></Route>
                    <Route component={Error} />

                </Switch>

                 <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>

            <Alert stack={{limit: 3}}
                      timeout = {5000}
                      position='top-right' effect='slide' offset={65} />
        </div>
        );
    }
}

export default Router;
