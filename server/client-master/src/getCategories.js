import {getCategoriesPending, getCategoriesSuccess, getCategoriesError} from './actions/categoryActions';

export function getCategories() {
    return (dispatch) => {
        dispatch(getCategoriesPending());
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw(res.error);
                }
                console.log(res);
                dispatch(getCategoriesSuccess(res.categories));
                return res.categories;
            })
            .catch(error => {
                dispatch(getCategoriesError(error))
        })
    }
}
