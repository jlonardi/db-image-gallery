import React from 'react';
import assert from 'assert';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Image from '../image.jsx';
import styles from '../styles/image.css';

Enzyme.configure({ adapter: new Adapter() });

describe('Image component', () => {
    it('should display a placeholder when the image is not leaded', () => {
        const wrapper = Enzyme.mount(<Image />);

        assert.equal(wrapper.find(`.${styles.placeholder}`).length, 1);
    });
});
