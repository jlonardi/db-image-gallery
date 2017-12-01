import { filter, isEmpty, assign, includes, map } from 'lodash';
import Dropbox from 'dropbox';
import { disconnect } from './tokenActions';
import { readJwt } from '../utils/storage';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'tiff', 'tif', 'gif', 'bmp'];
export const ASC = 'ASC';
export const DESC = 'DESC';
export const NOP = 'NOP';

export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';
export function setThumbnailSorting(sortDirection) {
    return {
        type: SET_SORT_DIRECTION,
        sortDirection
    };
}

export function getExtension(filename) {
    const re = /(?:\.([^.]+))?$/;
    const extension = re.exec(filename)[1];
    return extension;
}

function entryFilter(entry) {
    const extension = getExtension(entry.name);
    return includes(IMAGE_TYPES, extension);
}

function parseResponse(response) {
    // filter out filetypes that are not supported
    const filteredEntries = filter(response.entries, entryFilter);
    const enhancedEntries = map(
        filteredEntries,
        entry => assign({}, entry, { loaded: false, loading: false })
    );
    return enhancedEntries;
}

export const METADATA_LOADED = 'METADATA_LOADED';
export function addMetadata(images) {
    return {
        type: METADATA_LOADED,
        images,
        queue: images
    };
}

export const LOADING_THUMBNAIL = 'LOADING_THUMBNAIL';
function loadingThumbnail(id) {
    return {
        type: LOADING_THUMBNAIL,
        id
    };
}

export const ADD_THUMBNAIL_URL = 'ADD_THUMBNAIL_URL';
function addThumbnailUrl(id, url) {
    return {
        type: ADD_THUMBNAIL_URL,
        id,
        url
    };
}

export const FLAG_CORRUPTED = 'FLAG_CORRUPTED';
function flagCorrupted(id) {
    return {
        type: FLAG_CORRUPTED,
        id
    };
}

export function loadThumbnail(id) {
    return (dispatch) => {
        dispatch(loadingThumbnail(id));
        const jwt = readJwt();
        const dbx = new Dropbox({ accessToken: jwt });
        dbx.filesGetThumbnail({
            path: id,
            size: 'w640h480',
            format: 'jpeg'
        })
        .then((response) => {
            const url = URL.createObjectURL(response.fileBlob);
            dispatch(addThumbnailUrl(id, url));
        })
        .catch(() => {
            dispatch(flagCorrupted(id));
        });
    };
}

export const ADD_IMAGES = 'ADD_IMAGES';
function addImages(images) {
    return {
        type: ADD_IMAGES,
        images
    };
}

export const FILELIST_LOADED = 'FILELIST_LOADED';
export const LOADING_FILELIST = 'LOADING_FILELIST';
export function loadMetadata(cursor) {
    return (dispatch, getState) => {
        // dispatching the loading event would cause
        // the whole gallery to be in loading state
        if (isEmpty(cursor)) {
            dispatch({
                type: LOADING_FILELIST
            });
        }

        const jwt = getState().auth.dropboxToken;
        const dbx = new Dropbox({ accessToken: jwt });

        let promise;
        if (isEmpty(cursor)) {
            promise = dbx.filesListFolder({
                path: '/Camera Uploads'
            });
        } else {
            promise = dbx.filesListFolderContinue({
                cursor
            });
        }
        promise.then((response) => {
            const images = parseResponse(response);

            dispatch(addImages(images));

            if (response.has_more) {
                dispatch(loadMetadata(response.cursor));
            }


            dispatch({
                type: FILELIST_LOADED
            });
        })
        .catch((error) => {
            dispatch(disconnect());
            console.log(error);
        });
    };
}

export const ADD_IMAGE_URL = 'ADD_IMAGE_URL';
function addImageUrl(id, url) {
    return {
        type: ADD_IMAGE_URL,
        id,
        url
    };
}

export const LOADING_IMAGE = 'LOADING_IMAGE';
export function loadImage(id) {
    return (dispatch) => {
        dispatch({
            type: LOADING_IMAGE,
            id
        });

        const jwt = readJwt();
        const dbx = new Dropbox({ accessToken: jwt });
        dbx.filesDownload({
            path: id
        })

        .then((response) => {
            const url = URL.createObjectURL(response.fileBlob);
            dispatch(addImageUrl(id, url));
        })
        .catch(() => {
            dispatch(flagCorrupted(id));
        });
    };
}

