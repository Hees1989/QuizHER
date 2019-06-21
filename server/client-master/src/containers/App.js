import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import 'bulma/css/bulma.css';
import {Main} from "../components/Main";
import {User} from "../components/User";
import Lobby from "./Lobby";
import {setName} from "../actions/userActions";
import {openWebSocket, getWebSocket} from '../serverCommunication';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {registerTeam} from "../actions/teamActions";

class App extends React.Component {
    componentDidMount() {
        this.initSocket();
    }

    initSocket = () => {
        let ws;

        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }
        ws = new WebSocket(`ws://localhost:4000`);
        ws.onerror = () => console.log('Error');
        ws.onopen = () => console.log('Websocket connected!');
        ws.onclose = () => console.log('Websocket closed.');
        ws.onmessage = (msg) => this.newMessage(msg);
    };

    newMessage = (msg) => {
        switch (msg.type) {
            case 'message':
                console.log(msg.action);
                console.log(msg.payload);
                //registerTeam(msg.payload);
                break;
            case '':

                break;
        }
    };

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
        registerTeam: (name) => dispatch(registerTeam(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);