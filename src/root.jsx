import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import Routes from './router/routes.jsx';

export function initialize() {
    const history = createHistory();
    const store = configureStore({}, history);

    return (
        <Provider store={store} key='provider' >
            <div>
                <Routes history={history} />
            </div>
        </Provider>
    );
}
