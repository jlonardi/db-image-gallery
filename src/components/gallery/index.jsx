import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './imageGrid.jsx';
import { connect } from 'react-redux';
import { loadMetadata } from '../../actions/imageActions';
import Carousel from './carousel.jsx';
import styles from './styles/gallery.css';

class Gallery extends Component {
    componentWillMount() {
        if (!this.props.metadataLoaded) {
            this.props.loadMetadata();
        }
    }
    get carousel() {
        if (this.props.displayCarousel) {
            return <Carousel />;
        }
        return undefined;
    }
    render() {
        return (
            <div className={styles.container}>
                {this.carousel}
                <Grid />
            </div>
        );
    }
}

Gallery.propTypes = {
    metadataLoaded: PropTypes.bool,
    loadMetadata: PropTypes.func,
    displayCarousel: PropTypes.bool,
    closeCarousel: PropTypes.func
};


function mapStateToProps({ gallery, carousel }) {
    return {
        metadataLoaded: gallery.loaded,
        displayCarousel: carousel.open
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadMetadata: () => dispatch(loadMetadata())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
