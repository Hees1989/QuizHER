import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getCategories} from '../getCategories';
import {addCategories} from "../actions/roundActions";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: []
        };
    }


    async componentDidMount() {
        this.props.getCategories();
    }

    handleSelect = event => {
        let checkBox = document.getElementById(event.target.id);
        if (checkBox.checked === true) {
            this.setState({
                selectedCategories: [...this.state.selectedCategories, event.target.id]
            });
        } else {
            let array = [...this.state.selectedCategories]; // make a separate copy of the array
            let index = array.indexOf(event.target.value);
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
                            // name={category}
                            id={category}
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
                        <span className="button is-primary" onClick={() => this.props.addCategories(this.state.selectedCategories)}>Add categories</span>
                        <span className="button is-primary">
                            <Link to={{
                                pathname: '/selectQuestion',
                                state: {
                                    categories:this.state.selectedCategories
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
        categories: state.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategories: (categories) => dispatch(addCategories(categories))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);