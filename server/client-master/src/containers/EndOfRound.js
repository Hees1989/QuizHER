import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';

class EndOfRound extends React.Component {

    render() {
        // TODO functionaliteit knoppen implementeren
        return (
            <div>
                <span className="button is-primary">Volgende ronde!</span>
                <span className="button is-primary">Einde spel!</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(EndOfRound);