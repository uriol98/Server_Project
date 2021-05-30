import React, { Component } from 'react';

class User extends Component{

    render(){
        let data = "";
        if(this.props.user.image !== null){

            data = this.props.user.imageUrl.data;
        }
        const { name, surname, email} = this.props.user;
        return(
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={`data:image/jpg;base64,${data}`} alt="not image" />
                </div>
                <h2>{name + " " + surname}</h2>
                <span>{"email: "+email}</span>
                <div className="clearfix" />
            </article>
        );
    }

}

export default User;
