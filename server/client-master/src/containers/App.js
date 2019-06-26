import React from 'react';
import {connect} from 'react-redux';
import '../App.css';
import 'bulma/css/bulma.css';
import Lobby from "./Lobby";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CategoryList from "./CategoryList";
import QuestionList from "./QuestionList";
//import Answers from './Answers';
import ActiveQuestion from "./ActiveQuestion";
import EndOfRound from "./EndOfRound";
import EndOfGame from "./EndOfGame";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Content">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Lobby}/>
                            <Route path="/categories" component={CategoryList}/>
                            <Route path="/selectQuestion" component={QuestionList}/>
                            <Route path="/activeQuestion" component={ActiveQuestion}/>
                            <Route path="/endOfRound" component={EndOfRound}/>
                            <Route path="/endOfGame" component={EndOfGame}/>
                        </Switch>
                    </Router>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);