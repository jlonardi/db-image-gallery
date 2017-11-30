import { assign } from 'lodash';
import {
    OPEN_CAROUSEL,
    DISPLAY_IMAGE,
    CLOSE_CAROUSEL
} from '../actions/imageActions.js';

const intialState = { open: false };
export default function galleryReducer(state = intialState, action) {
    switch (action.type) {
        case OPEN_CAROUSEL:
            return assign({}, state, { open: true });
        case CLOSE_CAROUSEL:
            return assign({}, state, { open: false });
        case DISPLAY_IMAGE:
            return assign({}, state, { current: action.id });
        default:
            return state;
    }
}
