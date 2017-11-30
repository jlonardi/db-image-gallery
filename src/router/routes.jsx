import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import requireAuthorization from '../components/auth/authorizedComponent.jsx';
import Gallery from '../components/gallery';
import Linking from '../components/linking';
import MainLayout from '../components/layout/mainLayout.jsx';

// define app routes
const Routes = ({ history }) => (
    <ConnectedRouter history={history}>
        <MainLayout>
            <Route exact path={'/'} component={requireAuthorization(Gallery)} />
            <Route path={'/linking'} component={Linking} />
        </MainLayout>
    </ConnectedRouter>
);

Routes.propTypes = {
    history: PropTypes.object
};

export default Routes;
