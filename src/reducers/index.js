import { merge } from 'lodash';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import galleryReducer from './galleryReducer';

export default function reducers(initialState) {
    return combineReducers(merge(
        {}, initialState, {
            routing: routerReducer,
            auth: authReducer,
            gallery: galleryReducer
        }));
}
