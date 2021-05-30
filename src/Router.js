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
import VerifyEmail from './Components/VerifyEmail';
import UpdateProfile from './Components/UpdateProfile';
import FilesHandler from './Components/FilesHandler';
import Users from './Components/Admin/Users';

class Router extends Component{

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
          localStorage.removeItem(ACCESS_TOKEN);
          this.setState({
            authenticated: false,
            currentUser: null
          });

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
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/forgetPassword" component={ForgetPassword} />
                    <Route exact path="/verify/:token" component={VerifyEmail} />
                    <Route exact path="/reset/:token" component={ResetPassword} />
                    <Route exact path="/signup"  render={(props) => <Register authenticated={this.state.authenticated} {...props} />} />
                    <PrivateRoute exact path="/users" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Users} />
                    <PrivateRoute exact path="/profile" authenticated={this.state.authenticated} refresh={this.refresh} currentUser={this.state.currentUser}
                            component={Profile}/>
                      <PrivateRoute path="/files" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={FilesHandler} />

                     <PrivateRoute exact path="/profile/update"  authenticated={this.state.authenticated} refresh={this.refresh} currentUser={this.state.currentUser}
                        component={UpdateProfile}/>
                   <Route path="/login"
                                 render={(props) => <Login authenticated={this.state.authenticated} refresh={this.refresh} {...props} />}></Route>
                    <Route component={Error} />

                </Switch>


                 <div className="clearfix"></div>



            </BrowserRouter>
        </div>
        );
    }
}

export default Router;
