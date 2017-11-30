import { assign, map } from 'lodash';
import {
    ADD_IMAGES,
    LOADING_THUMBNAIL,
    ADD_THUMBNAIL_URL,
    FLAG_CORRUPTED
} from '../actions/imageActions.js';

const intialState = { loading: false, images: [] };
export default function galleryReducer(state = intialState, action) {
    switch (action.type) {
        case ADD_IMAGES:
            return assign({}, state, {
                images: [
                    ...state.images,
                    ...action.images
                ]
            });
        case LOADING_THUMBNAIL:
            return assign({}, state, {
                images: map(state.images,
                    img => ((img.id === action.id) ? { ...img, thumbnail: { loading: true } } : img)
                )
            });
        case FLAG_CORRUPTED:
            return assign({}, state, {
                images: map(state.images,
                    img => ((img.id === action.id) ? {
                        ...img, thumbnail: {
                            loading: false,
                            loaded: true,
                            corrupted: true
                        }
                    } : img)
                )
            });
        case ADD_THUMBNAIL_URL:
            return assign({}, state, {
                images: state.images.map(
                    img => ((img.id === action.id) ? {
                        ...img, thumbnail: {
                            loading: false,
                            loaded: true,
                            url: action.url
                        }
                    } : img)
                )
            });
        default:
            return state;
    }
}
