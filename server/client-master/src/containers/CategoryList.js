import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getCategories} from '../getCategories';

class CategoryList extends React.Component {
    async componentDidMount() {
        this.props.getCategories();
    }

    handleSelect = event => {
        let checkBox = document.getElementById(event.target.id);
        if (checkBox.checked === true) {
            this.setState({
                selectedCategories: [...this.state.selectedCategories, event.target.value]
            });
        } else {
            let array = [...this.state.selectedCategories]; // make a separate copy of the array
            let index = array.indexOf(event.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({selectedCategories: array});
            }
        }
    };

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
                            onChange={e =>this.handleSelect(e)}
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
                        <span className="button is-primary">
                            <Link to={{
                                pathname: '/selectQuestion',
                                state: {
                                    categories:this.props.selectedCategories
                                }
                            }}>Start quizzer</Link>

                       </span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.category,
        selectedCategories:state.selectedCategories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);