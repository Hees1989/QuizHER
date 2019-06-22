import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getCategories} from '../getCategories';

class CategoryList extends React.Component {
    componentWillMount() {
        console.log(this.props.getCategories());
    }

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Categorieën</h1>
                        <div>Categorie 1</div>
                        <div>Categorie 2</div>
                        <span className="button is-primary"><Link to="">Start Round!</Link></span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);