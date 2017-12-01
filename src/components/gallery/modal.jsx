import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/modal.css';

function Modal(props) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {props.children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired
};

export default Modal;
