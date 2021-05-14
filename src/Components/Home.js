import react, {Component} from 'react';
import logo from '../logo.svg';

class Home extends Component{

    render() {
        return (
            <div id="home">
                <h1 > DEVELOPING APP</h1>
                <img src={logo} alt="logo react" width="500" height="500"/>

            </div>
        );
    }
}

export default Home;
