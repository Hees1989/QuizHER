import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import 'bulma/css/bulma.css';
import {Main} from "../components/Main";
import {User} from "../components/User";
import Lobby from "./Lobby";
import {setName} from "../actions/userActions";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
    componentDidMount() {
        // this.initSocket();
    }

    // initSocket = () => {
    //     let ws;
    //
    //     if (ws) {
    //         ws.onerror = ws.onopen = ws.onclose = null;
    //         ws.close();
    //     }
    //     ws = new WebSocket(`ws://localhost:4000`);
    //     ws.onerror = () => console.log('Error');
    //     ws.onopen = () => console.log('Websocket connected!');
    //     ws.onclose = () => console.log('Websocket closed.');
    //     ws.onmessage = (msg) => console.log(msg.data);
    // };


    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Content">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Lobby}/>
                        </Switch>
                    </Router>
                </div>
                {/*<button onClick={this.initSocket}>Connect ws</button>*/}
                <Main changeUsername={() => this.props.setName('Botana')}/>
                <User username={this.props.user.name}/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);