
import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';

import thunk from 'redux-thunk';

export default function initialize(initialState, history) {
    const reducer = reducers(initialState);

    // Apply the middleware to the store
    const middleware = routerMiddleware(history);

    // create the redux store
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(
                thunk,
                middleware
            )
        )
    );

    return store;
}
