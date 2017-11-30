import { assign, map } from 'lodash';
import {
    ADD_IMAGES,
    LOADING_THUMBNAIL,
    ADD_THUMBNAIL_URL,
    FLAG_CORRUPTED,
    LOADING_FILELIST,
    FILELIST_LOADED,
    ADD_IMAGE_URL,
    LOADING_IMAGE
} from '../actions/imageActions.js';

const intialState = { loading: false, images: [] };
export default function galleryReducer(state = intialState, action) {
    switch (action.type) {
        case LOADING_FILELIST:
            return assign({}, state, { loading: true });
        case FILELIST_LOADED:
            return assign({}, state, { loading: false });
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
                        ...img,
                        loaded: true,
                        loading: false,
                        thumbnail: {
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
        case ADD_IMAGE_URL:
            return assign({}, state, {
                images: state.images.map(
                    img => ((img.id === action.id) ?
                        { ...img, url: action.url, loaded: true, loading: false } :
                        img
                    )
                )
            });
        case LOADING_IMAGE:
            return assign({}, state, {
                images: map(state.images,
                    img => ((img.id === action.id) ? { ...img, loading: true } : img)
                )
            });
        default:
            return state;
    }
}
