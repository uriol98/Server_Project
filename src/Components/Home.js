import react, {Component} from 'react';
import logo from '../logo.svg';
import {Text} from "../Assets/Languages/Language";

class Home extends Component{

    render() {
        return (
            <div id="content">
                <h1 > <Text tid="title" /></h1>
                <img src={logo} alt="logo react" width="500" height="500"/>

            </div>
        );
    }
}

export default Home;
