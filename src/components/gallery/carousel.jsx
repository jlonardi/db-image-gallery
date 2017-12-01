import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { onkeyup, unbind } from '../../utils/keyboard';
import { nextImage, previousImage, closeCarousel } from '../../actions/carouselActions';
import Image from './image.jsx';
import Modal from './modal.jsx';
import styles from './styles/carousel.css';

class Carousel extends Component {
    componentDidMount() {
        this.eventKey = onkeyup((e) => {
            const key = e.keyCode ? e.keyCode : e.which;
            const leftArrow = 37;
            const rightArrow = 39;
            const escKey = 27;

            if (key === leftArrow) {
                this.props.prev(this.props.current);
            }

            if (key === rightArrow) {
                this.props.next(this.props.current);
            }

            if (key === escKey) {
                this.props.close();
            }
        });
    }

    componentWillUnmount() {
        unbind(this.eventKey);
    }

    get closeButton() {
        return (
            <div
                className={`${styles.noselect} ${styles.close}`}
                onClick={this.props.close}>
                <i className='material-icons'>clear</i>
            </div>
        );
    }

    get leftArrow() {
        const prev = () => this.props.prev(this.props.current);
        return (
            <div
                className={`${styles.leftArrow} ${styles.arrow}  ${styles.noselect}`}
                onClick={prev}>
                <i className='material-icons'>keyboard_arrow_left</i>
            </div>
        );
    }

    get rightArrow() {
        const next = () => this.props.next(this.props.current);
        return (
            <div
                className={`${styles.rightArrow} ${styles.arrow} ${styles.noselect}`}
                onClick={next}>
                <i className='material-icons'>keyboard_arrow_right</i>
            </div>
        );
    }

    render() {
        const { loaded, loading, url } = this.props;
        return (
            <Modal>
                <div className={styles.container}>
                    {this.closeButton}
                    {this.leftArrow}
                    <Image loading={loading} loaded={loaded} url={url} />

                </div>
            </Modal>
        );
    }
}

Carousel.propTypes = {
    url: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    next: PropTypes.func,
    prev: PropTypes.func,
    close: PropTypes.func,
    current: PropTypes.string
};

function mapStateToProps({ gallery, carousel }) {
    const { current } = carousel;
    const image = find(gallery.images, img => img.id === current);
    return { ...image, ...carousel };
}

function mapDispatchToProps(dispatch) {
    return {
        next: (current) => dispatch(nextImage(current)),
        prev: (current) => dispatch(previousImage(current)),
        close: () => dispatch(closeCarousel())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
