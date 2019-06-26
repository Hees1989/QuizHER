import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';

class EndOfGame extends React.Component {

    render() {
        // TODO logica laatste pagina implementeren
        return (
            <div>
                Einde spel!
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

export default connect(mapStateToProps, mapDispatchToProps)(EndOfGame);