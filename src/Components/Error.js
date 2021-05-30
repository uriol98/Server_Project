import React, {Component} from 'react';
import {Text} from "../Assets/Languages/Language";

const Error = () => {
    return (
        <section id="content">
            <h2 className="subheader"><Text tid="pageNotFound" /></h2>
            <p> <Text tid="pageNotFoundText" /></p>

        </section>
    );
}

export default Error;
