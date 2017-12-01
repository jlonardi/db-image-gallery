import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Thumbnail from './thumbnail.jsx';
import styles from './styles/imageGrid.css';
import { ASC, DESC, NOP, sortGrid } from '../../actions/galleryActions';

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

    get sortSelector() {
        const { sortDirection } = this.props;
        return (
            <div className={styles.selectorWrapper}>
                <TextField
                    id='selectSorting'
                    select
                    label='Sorting'
                    className={styles.textField}
                    value={sortDirection}
                    onChange={(event) =>
                        this.props.sortGrid(event.target.value)
                    }
                    SelectProps={
                        {
                            MenuProps: {
                                className: styles.menu,
                            },
                        }
                    }
                    margin='normal' >
                    <MenuItem key={NOP} value={NOP}>
                        {'Nothing'}
                    </MenuItem>
                    <MenuItem key={ASC} value={ASC}>
                        {'Newest'}
                    </MenuItem>
                    <MenuItem key={DESC} value={DESC}>
                        {'Oldest'}
                    </MenuItem>
                </TextField>
            </div>
        );
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
            <div className={styles.container}>
                {this.sortSelector}
                <div className={styles.grid} onScroll={this.handleScroll}>
                    {this.content}
                </div>
            </div>
        );
    }
}

ImageGrid.propTypes = {
    loading: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    sortDirection: PropTypes.string,
    sortGrid: PropTypes.func
};

ImageGrid.defaultProps = {
    sortDirection: NOP
};

function sortImages(images, direction) {
    if (direction === NOP) {
        return images;
    }

    // a simpler way to sort dates after they are converted in ms
    const dir = direction === ASC ? -1 : 1;
    return sortBy(images,
        (img) => new Date(img.client_modified).getTime() * dir
    );
}

function mapStateToProps({ gallery }) {
    const { images, loading, sortDirection } = gallery;
    return {
        images: sortImages(images, sortDirection),
        loading,
        sortDirection
    };
}

export default connect(mapStateToProps, { sortGrid })(ImageGrid);
