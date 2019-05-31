import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {Main} from "../components/Main";
import {User} from "../components/User";
import {setName} from "../actions/userActions";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">Wat is deze kutsite?</header>
                <Main changeUsername={() => this.props.setName('Botana')}/>
                <User username={this.props.user.name}/>
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