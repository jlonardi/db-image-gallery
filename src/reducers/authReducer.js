import { assign } from 'lodash';
import { INVALIDATE_TOKEN, SAVE_TOKEN } from '../actions/tokenActions';

const intialState = { dropboxToken: '' };
export default function authReducer(state = intialState, action) {
    switch (action.type) {
        case INVALIDATE_TOKEN:
            return assign({}, state, intialState);
        case SAVE_TOKEN:
            return assign({}, state, { dropboxToken: action.jwt });
        default:
            return state;
    }
}
