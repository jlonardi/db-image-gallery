import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';

// Higher order component to assure that we have a dropbox JWT-token exists in the store
export default function requireAuthorization(Component) {
    class AuthorizedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.componentDidMount = this.checkAuthorization.bind(this);
            this.componentDidUpdate = this.checkAuthorization.bind(this);
        }

        checkAuthorization() {
            if (!this.props.isAuthorized) {
                // redirect the user to give the app permission to use dropbox
                this.props.dispatch(push('/linking'));
            }
        }

        render() {
            // render the component that requires auth (passed to this wrapper)
            return (
                <Component {...this.props} />
            );
        }
    }

    AuthorizedComponent.propTypes = {
        isAuthorized: PropTypes.bool,
        dispatch: PropTypes.func,
        location: PropTypes.object
    };


    const mapStateToProps = (state) => ({
        isAuthorized: !isEmpty(state.auth.dropboxToken)
    });

    return connect(mapStateToProps)(AuthorizedComponent);
}
