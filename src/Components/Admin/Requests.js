import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {Text} from "../../Assets/Languages/Language";
import {getAllUsers, getRequests} from "../../Assets/APIutils";
import User from "./User";

class Requests extends Component{


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: ''
        }
    }

    UNSAFE_componentWillMount() {

        if(this.props.currentUser.roles[0] !== "ROLE_ADMIN"){
            this.props.history.push("/error");
        }

        getRequests().then(response => {
            this.setState({
                users: response,
                error: ''
            });

        }).catch(error => {
            this.setState({error: error.message});
        });
    }

    render(){


        return (


            <div className="center">
                <div id="content">
                    <h2 className="subheader"><Text tid="requests" /> </h2>

                    {  this.state.error &&
                    <span> <strong> this.state.error</strong></span>
                    }
                    <div id="articles"  >
                        {
                            this.state.users.map((user, i) =>{
                                    return(
                                        <User
                                            key={i}
                                            user={user}
                                            currentUser ={this.props.currentUser}
                                            prevPath={this.props.prevPath}
                                            index={i} />
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }

}
export default Requests;
