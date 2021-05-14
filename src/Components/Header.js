import React, {Component} from "react";
import {NavLink, Link} from "react-router-dom";

class Header extends Component{


    render() {



        return (
            <header className="header">
                <div className="center">

                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Home </NavLink>
                            </li>
                            <li>
                                Element2
                            </li>
                            <li>
                                <NavLink to="/profile" >Profile </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" >Login | sign up</NavLink>
                            </li>
                        </ul>

                            { this.props.authenticated ? (
                                <ul>
                                    <li>
                                        <NavLink to="/profile">Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" onClick={this.props.onLogout}>Logout</NavLink>
                                    </li>
                                </ul>
                            ): (
                                <ul>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </li>
                                </ul>
                            )}

                    </nav>
                </div>
            </header>
        );
    }

}

export default Header;
