import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';

class Lobby extends React.Component {
    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        Aangemelde gebruikers

                    </div>
                </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);