import {getCategoriesPending, getCategoriesSuccess, getCategoriesError} from './actions/categoryActions';

export function getCategories() {
    return (dispatch) => {
        dispatch(getCategoriesPending());
        fetch('http://localhost:4000/question/allCategories')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw(res.error);
                }
                dispatch(getCategoriesSuccess(res.categories));
                return res.categories;
            })
            .catch(error => {
                dispatch(getCategoriesError(error))
        })
    }
}
