import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find } from 'lodash';
import Placeholder from './placeholder.jsx';
import styles from './styles/carousel.css';

class Carousel extends Component {
    get spinner() {
        return (
            <div className={styles.placeholderFrame}>
                <Placeholder>
                    <i className={`material-icons ${styles.spinner}`}>autorenew</i>
                </Placeholder>
            </div>
        );
    }

    get placeholder() {
        return (
            <div className={styles.placeholderFrame}>
                <Placeholder>
                    <i className={`material-icons ${styles.placeholder}`}>crop_original</i>
                </Placeholder>
            </div>
        );
    }

    get content() {
        if (this.props.loading) {
            return this.spinner;
        }

        if (!this.props.loaded) {
            return this.placeholder;
        }

        return <img src={this.props.url} alt='current' className={styles.image} />;
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {this.content}
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {
    url: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
};

function mapStateToProps({ gallery, carousel }) {
    const { current } = carousel;
    const image = find(gallery.images, img => img.id === current);
    return { ...image, ...carousel };
}

export default connect(mapStateToProps)(Carousel);
