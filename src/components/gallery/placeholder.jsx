import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/placeholder.css';

export default function Placeholder(props) {
    return (
        <div className={`${styles.placeholder}`}>
            {props.children}
        </div>
    );
}

Placeholder.propTypes = {
    children: PropTypes.element.isRequired
};
