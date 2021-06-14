import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import {Text} from "../Assets/Languages/Language";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="center">
                <p>
                    <NavLink to="/privacy"><Text tid="privacyNotice" /> </NavLink>
                </p>
            </div>
        </footer>)
};

export default Footer;
