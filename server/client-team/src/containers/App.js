import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';

import ApplyForm from "../components/ApplyForm";
import CurrentQuestion from "../components/CurrentQuestion";
import Queue from "../components/Queue";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">Wat is deze kutsite?</header>
                <Switch>
                    <Route exact path="/" render={(routeProps) => <ApplyForm{...routeProps}/>}/>
                    <Route path="/queue" render={(routeProps) => <Queue{...routeProps}/>}/>
                    <Route path="/currentQuestion" render={(routeProps) => <CurrentQuestion{...routeProps}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;