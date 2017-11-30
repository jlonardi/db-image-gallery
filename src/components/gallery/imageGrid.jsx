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
        const delay = 500; // ms
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

    render() {
        return (
            <div className={styles.container} onScroll={this.handleScroll}>
                {this.thumbnails}
            </div>
        );
    }
}

ImageGrid.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    }))
};

function mapStateToProps({ gallery }) {
    const { images } = gallery;
    return {
        images
    };
}


export default connect(mapStateToProps)(ImageGrid);
