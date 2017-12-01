import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { disconnect } from '../../actions/tokenActions';
import styles from './styles/mainLayout.css';

class MainLayout extends Component {
    get header() {
        const renderIfAuthorized = (component) => (this.props.linked ? component : undefined);
        return (
            <AppBar position='static'>
                <Toolbar className={styles.toolbar}>
                    <Typography type='title' color='inherit' className={styles.title}>
                        Dropbox gallery demo
                    </Typography>
                    {renderIfAuthorized(
                        <Button color='contrast' onClick={this.props.disconnect}>Disconnect</Button>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
    render() {
        return (
            <div>
                {this.header}
                {this.props.children}
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    linked: PropTypes.bool,
    disconnect: PropTypes.func
};

function mapStateToProps({ auth }) {
    return {
        linked: !isEmpty(auth.dropboxToken)
    };
}

export default connect(mapStateToProps, { disconnect })(MainLayout);

