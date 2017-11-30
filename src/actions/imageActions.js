import { filter, assign, includes, map } from 'lodash';
import Dropbox from 'dropbox';
import { unauthorize } from './tokenActions';
import { readJwt } from '../utils/storage';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'tiff', 'tif', 'gif', 'bmp'];

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
            const downloadUrl = URL.createObjectURL(response.fileBlob);
            dispatch(addThumbnailUrl(id, downloadUrl));
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
export function loadMetadata() {
    return (dispatch, getState) => {
        dispatch({
            type: LOADING_FILELIST
        });

        const jwt = getState().auth.dropboxToken;
        const dbx = new Dropbox({ accessToken: jwt });
        dbx.filesListFolder({ path: '/Camera Uploads' })
        .then((response) => {
            const images = parseResponse(response);
            dispatch(addImages(images));
            dispatch({
                type: FILELIST_LOADED
            });
        })
        .catch((error) => {
            dispatch(unauthorize());
            console.log(error);
        });
    };
}
