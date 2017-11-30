import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import styles from './styles/modal.css';

class Modal extends Component {
    componentWillMount() {
        window.onkeyup = (e) => {
            const key = e.keyCode ? e.keyCode : e.which;
            const escKey = 27;
            if (key === escKey) {
                if (isFunction(this.props.onClose)) {
                    this.props.onClose();
                }
            }
        };
    }
    componentWillUnmount() {
        window.onkeyup = () => {};
    }
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired
};

export default Modal;
