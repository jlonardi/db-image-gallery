import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './imageGrid.jsx';
import { connect } from 'react-redux';
import { loadMetadata } from '../../actions/imageActions';
import styles from './styles/gallery.css';

class Gallery extends Component {
    componentWillMount() {
        if (!this.props.metadataLoaded) {
            this.props.loadMetadata();
        }
    }
    render() {
        return (
            <div className={styles.container}>
                <Grid />
            </div>
        );
    }
}

Gallery.propTypes = {
    metadataLoaded: PropTypes.bool,
    loadMetadata: PropTypes.func
};


function mapStateToProps({ gallery }) {
    return {
        metadataLoaded: gallery.loaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadMetadata: () => dispatch(loadMetadata())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
