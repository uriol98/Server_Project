import React, {Component} from 'react';
import User from "./User";
import {getAllUsers} from "../../Assets/APIutils";

class Documents extends Component{

    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            error: ''
        }
    }

    UNSAFE_componentWillMount() {
        //cridar metode per obtenir tots els usuaris
        if(this.props.currentUser.roles[0] !== "ROLE_ADMIN"){
            this.props.history.push("/error");
        }

        getAllUsers().then(response => {
            this.setState({
                users: response,
                error: ''
            });
        }).catch(error => {
            this.setState({error: error.message});
        });
    }


    render() {
        return (


            <div className="center">
                <div id="content">
                    <h2 className="subheader">Documents </h2>

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
