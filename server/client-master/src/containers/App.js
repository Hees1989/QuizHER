import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../App.css';
// import {Main} from "../components/Main";
// import {User} from "../components/User";
import {setName} from "../actions/userActions";
import {Landing} from "../components/Landing";

const ws = new WebSocket('ws://localhost:3000/');
console.log(ws);
ws.onopen = function () {
    ws.send('foo');
};

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">Quizmaster app</header>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                    </Switch>
                </BrowserRouter>
                {/*<Main changeUsername={() => this.props.setName('Botana')}/>*/}
                {/*<User username={this.props.user.name}/>*/}
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