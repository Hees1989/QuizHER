import React from 'react';

import '../App.css';

import ApplyForm from "../components/ApplyForm";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">Wat is deze kutsite?</header>
                <ApplyForm/>

            </div>
        );
    }
}

export default App;