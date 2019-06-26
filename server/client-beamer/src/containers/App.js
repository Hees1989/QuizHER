import React from 'react';
import '../App.css';
import TeamList from '../components/TeamList';

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <header className="App-header">Beamer</header>
                <TeamList/>
                {/*{this.checkMessageAndShowComponent()}*/}
            </div>
        );
    }
}

export default App;