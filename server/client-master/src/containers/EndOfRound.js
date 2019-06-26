import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";

class EndOfRound extends React.Component {

    render() {
        // TODO functionaliteit knoppen implementeren
        return (
            <div>
                <span className="button is-primary"><Link to="/categories">Volgende ronde!</Link></span>
                <span className="button is-primary"><Link to="/endOfGame">Einde spel!</Link></span>
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