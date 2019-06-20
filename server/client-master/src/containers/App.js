import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import 'bulma/css/bulma.css';
import {Main} from "../components/Main";
import {User} from "../components/User";
import {setName} from "../actions/userActions";
import {openWebSocket, getWebSocket} from '../serverCommunication';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Content">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Main}/>
                        </Switch>
                    </Router>
                </div>
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