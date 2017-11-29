import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import Routes from './router/routes.jsx';
import { initJWT } from './actions/tokenActions';

export function initialize() {
    const history = createHistory();
    const store = configureStore({}, history);

    const provider = (
        <Provider store={store} key='provider' >
            <div>
                <Routes history={history} />
            </div>
        </Provider>
    );

    return store.dispatch(initJWT())
    .then(() => provider);
}
