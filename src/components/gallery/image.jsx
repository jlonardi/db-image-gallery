import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Placeholder from './placeholder.jsx';
import styles from './styles/image.css';

class Image extends Component {
    get spinner() {
        return (
            <div className={styles.placeholderFrame}>
                <Placeholder classes={styles.spinner} icon='autorenew' />
            </div>
        );
    }

    get placeholder() {
        return (
            <div className={styles.placeholderFrame}>
                <Placeholder classes={styles.placeholder} icon='crop_original' />
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
            <div className={styles.contentWrapper}>
                {this.content}
            </div>
        );
    }
}

Image.propTypes = {
    url: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
};

export default Image;
