import React, {Component, useContext, useState} from "react";
import {NavLink, Link} from "react-router-dom";
import LanguageSelector from './LanguageSelector';
import { Text, LanguageContext } from '../Assets/Languages/Language';

class Header extends Component{


    render() {



        return (
            <header className="header">
                <div className="center">

                    <nav id="menu">


                            { this.props.authenticated ? (
                                <ul>

                                    { this.props.currentUser.roles[0] === "ROLE_ADMIN"
                                    ? (
                                        <React.Fragment>
                                            <li>
                                                <NavLink to ="/users"><Text tid="users" /> </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/documents"><Text tid="documents"/></NavLink>
                                            </li>
                                        </React.Fragment>) : (
                                            <React.Fragment>
                                                <li>
                                                    <NavLink to="/files"><Text tid="uploadDownload" /> </NavLink>
                                                </li>
                                            </React.Fragment>
                                        )

                                    }
                                    <li>
                                        <NavLink to="/" > <Text tid="home" /> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile"> <Text tid="profile" /> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" onClick={this.props.onLogout}> <Text tid="logout" /> </NavLink>
                                    </li>
                                    <li><LanguageSelector/></li>
                                </ul>
                            ): (
                                <ul>

                                    <li>
                                        <NavLink to="/login"><Text tid="login">Login</Text></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup"><Text tid="signup" /></NavLink>
                                    </li>
                                    <li><LanguageSelector/></li>
                                </ul>
                            )}

                    </nav>
                </div>
            </header>
        );
    }

}

export default Header;
