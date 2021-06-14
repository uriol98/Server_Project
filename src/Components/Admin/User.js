import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {LanguageContext, Text} from "../../Assets/Languages/Language";

class User extends Component{


    static contextType = LanguageContext;

    render(){


        let { dictionary } = this.context;
        let data = "";
        if(this.props.user.image !== null){

            data = this.props.user.imageUrl.data;
        }
        const { name, surname, email, roles, id} = this.props.user;
        const profile = {
            pathname: "/users/"+id,
            user: this.props.user,
            currentUser: this.props.currentUser,
            prevPath: this.props.prevPath
        };

        const answerRequest = {
            pathname: "/request/"+id,
            user: this.props.user,
            currentUser: this.props.currentUser
        };

        return(
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={`data:image/jpg;base64,${data}`} alt="not image" />
                </div>
                <div className="content">
                    <h3>{name + " " + surname}</h3>
                    <span>{dictionary.email+ ": "+email}</span>
                    <br/>
                    <span>{ dictionary.role+": "+ dictionary[roles[0]] }</span>
                    <span><NavLink to={profile} > <Text tid="profile" /> </NavLink></span>
                    { this.props.prevPath === "requests" &&
                        <span><NavLink to={answerRequest} > <Text tid="request" /> </NavLink></span>
                    }
                </div>

                <div className="clearfix" />
            </article>
        );
    }

}

export default User;
