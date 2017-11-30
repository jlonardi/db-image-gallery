import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { isEmpty, isEqual } from 'lodash';
import { loadThumbnail } from '../../actions/imageActions';
import Placeholder from './placeholder.jsx';
import styles from './styles/thumbnail.css';

class Thumbnail extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
         // needed for the thumbs that are right away visible in the viewport
        this.loadThumbnailIfNeeded();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const propsOrStateChanged = !isEqual(this.props, nextProps) ||
                                    !isEqual(this.state, nextState);

        return this.isVisible && propsOrStateChanged;
    }

    componentDidUpdate() {
        this.loadThumbnailIfNeeded();
    }

    onChange(isVisible) {
        this.isVisible = isVisible;
    }

    loadThumbnailIfNeeded() {
        const { loaded, loading, id, scrolling } = this.props;
        const shouldDownload = !loaded && !loading && !scrolling && this.isVisible;
        if (shouldDownload) {
            const { store } = this.context;
            store.dispatch(loadThumbnail(id));
        }
    }

    get placeholder() {
        return (
            <Placeholder>
                <i className={`material-icons ${styles.icon}`}>crop_original</i>
            </Placeholder>
        );
    }

    get spinner() {
        return (
            <Placeholder>
                <i className={`material-icons ${styles.spinner}`}>autorenew</i>
            </Placeholder>
        );
    }

    get image() {
        const { url } = this.props;

        const imageStyle = {
            backgroundImage: `url(${url})`
        };

        return <div className={styles.image} style={imageStyle} />;
    }

    get corruptedImage() {
        return (
            <Placeholder>
                <i className={`material-icons ${styles.icon}`}>clear</i>
            </Placeholder>
        );
    }
    get thumbnail() {
        let content = this.placeholder;

        if (this.props.corrupted) {
            return this.corruptedImage;
        }

        if (!isEmpty(this.props.url)) {
            content = this.image;
        }

        if (this.props.loading) {
            content = this.spinner;
        }

        return (
            <div className={styles.frame}>
                {content}
            </div>
        );
    }

    render() {
        const sensorConfig = {
            partialVisibility: true
        };

        return (
            <VisibilitySensor {...sensorConfig} onChange={this.onChange}>
                <div className={styles.container}>
                    {this.thumbnail}
                </div>
            </VisibilitySensor>
        );
    }
}


Thumbnail.propTypes = {
    url: PropTypes.string,
    id: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    scrolling: PropTypes.bool,
    corrupted: PropTypes.bool
};

Thumbnail.contextTypes = {
    store: PropTypes.object
};
export default Thumbnail;