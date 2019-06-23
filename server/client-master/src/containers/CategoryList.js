import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getCategories} from '../getCategories';

class CategoryList extends React.Component {
    async componentDidMount() {
        this.props.getCategories();
    }

    showCategories = () => {
        let categoryArray = [];
        let categories = this.props.categories.categories;
        categories.forEach((category, i) => {
            categoryArray.push(
                <div key={i}>
                    <label>
                        <input
                            type="checkbox"
                            name={category}
                            value={false}
                        />
                        {category}
                    </label>
                    <br />
                </div>
            );
        });
        return categoryArray;
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Categorieën</h1>
                        <form>
                            {this.showCategories()}
                        </form>
                        <span className="button is-primary"><Link to="">Start Round!</Link></span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);