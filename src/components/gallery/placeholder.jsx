import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/placeholder.css';

export default function Placeholder(props) {
    return (
        <div className={`${styles.placeholder}`}>
            <i className={`material-icons ${props.classes}`}>{props.icon}</i>
        </div>
    );
}

Placeholder.propTypes = {
    icon: PropTypes.string.isRequired,
    classes: PropTypes.string
};
