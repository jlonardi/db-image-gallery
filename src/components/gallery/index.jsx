import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './imageGrid.jsx';
import { connect } from 'react-redux';
import { loadMetadata, closeCarousel } from '../../actions/imageActions';
import Carousel from './carousel.jsx';
import Modal from './modal.jsx';
import styles from './styles/gallery.css';

class Gallery extends Component {
    componentWillMount() {
        if (!this.props.metadataLoaded) {
            this.props.loadMetadata();
        }
    }
    get modal() {
        if (this.props.displayCarousel) {
            return (
                <Modal onClose={this.props.closeCarousel}>
                    <Carousel />
                </Modal>
            );
        }
        return undefined;
    }
    render() {
        return (
            <div className={styles.container}>
                {this.modal}
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
        loadMetadata: () => dispatch(loadMetadata()),
        closeCarousel: () => dispatch(closeCarousel())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
