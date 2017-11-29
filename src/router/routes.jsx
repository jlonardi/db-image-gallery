import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import requireAuthorization from '../components/auth/authorizedComponent.jsx';
import Gallery from '../components/gallery';
import Linking from '../components/linking';

// define app routes
const Routes = ({ history }) => (
    <ConnectedRouter history={history}>
        <div>
            <Route exact path={'/'} component={requireAuthorization(Gallery)} />
            <Route path={'/linking'} component={Linking} />
        </div>
    </ConnectedRouter>
);

Routes.propTypes = {
    history: PropTypes.object
};

export default Routes;
