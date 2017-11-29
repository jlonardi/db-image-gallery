import { routerMiddleware } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';


export default function initialize(initialState, history) {
    const reducer = reducers(initialState);

    // Build the middleware for intercepting and dispatching navigation actions
    const middleware = routerMiddleware(history);

    function getDebugSessionKey() {
        // You can write custom logic here!
        // By default we try to read the key from ?debug_session=<key> in the address bar
        const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
        return (matches && matches.length > 0) ? matches[1] : null;
    }


    // create the redux store
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(
                thunk,
                middleware,
                createLogger()
            ),
            // Lets you write ?debug_session=<name> in address bar to persist debug sessions
            persistState(getDebugSessionKey())
        )
    );

    return store;
}
