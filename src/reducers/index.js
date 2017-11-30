import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import galleryReducer from './galleryReducer';
import carouselReducer from './carouselReducer';
import { DISCONNECT } from '../actions/tokenActions';

export default function reducers(initialState) {
    const appReducer = combineReducers(
        merge({}, initialState, {
            routing: routerReducer,
            auth: authReducer,
            gallery: galleryReducer,
            carousel: carouselReducer
        })
    );

    const rootReducer = (state, action) => {
        const resetState = action.type === DISCONNECT;
        const nextState = resetState ? undefined : state;
        return appReducer(nextState, action);
    };

    return rootReducer;
}
