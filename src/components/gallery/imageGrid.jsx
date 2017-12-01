import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Thumbnail from './thumbnail.jsx';
import styles from './styles/imageGrid.css';

class ImageGrid extends Component {
    constructor(props) {
        super(props);

        this.state = { scrolling: false };
    }
    componentDidMount() {
        const delay = 300; // ms
        window.addEventListener('scroll', () => {
            if (!this.state.scrolling) {
                // notifies the thumbnails about scrolling to prevent image loadings while scrolling
                this.setState({ scrolling: true });
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.setState({ scrolling: false });
            }, delay);
        });
    }

    get thumbnails() {
        return map(this.props.images,
            ({ id, thumbnail }) =>
                <Thumbnail {...thumbnail} key={id} id={id} scrolling={this.state.scrolling} />
        );
    }

    get loadingScreen() {
        return (
            <div className={styles.loader}>
                <i className={`material-icons ${styles.spinner}`}>autorenew</i>
                <h1 className={styles.title}>
                    Loading file list
                </h1>
            </div>
        );
    }
    get content() {
        return this.props.loading ? this.loadingScreen : this.thumbnails;
    }
    render() {
        return (
            <div className={styles.container} onScroll={this.handleScroll}>
                {this.content}
            </div>
        );
    }
}

ImageGrid.propTypes = {
    loading: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    }))
};

function mapStateToProps({ gallery }) {
    const { images, loading } = gallery;
    return {
        images,
        loading
    };
}


export default connect(mapStateToProps)(ImageGrid);
