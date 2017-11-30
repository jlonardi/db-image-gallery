import { isEmpty } from 'lodash';
import { load } from '../utils/fetch';

export const SAVE_TOKEN = 'SAVE_TOKEN';
function saveToken(jwt) {
    return {
        type: SAVE_TOKEN,
        jwt
    };
}

export function unauthorize() {
    return saveToken('');
}

function parseHash(hash) {
    const hashParams = {};
    let e;
    const a = /\+/g;  // Regex for replacing addition symbol with a space
    const r = /([^&;=]+)=?([^&;]*)/g;
    const d = function replace(s) { return decodeURIComponent(s.replace(a, ' ')); };
    const q = hash.substring(1);

    while (e = r.exec(q)) { //eslint-disable-line
        hashParams[d(e[1])] = d(e[2]);
    }

    return hashParams;
}

// ad hoc validation of the token, if retrievieng of the user info from drobox fail
// the assumption is made that the jwt is invalid
function validateJWT(jwt) {
    if (isEmpty(jwt)) {
        return Promise.reject();
    }

    return load('https://api.dropboxapi.com/2/users/get_current_account',
        {
            method: 'post',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
}

function removeHashFromUrl() {
    const uri = window.location.toString();
    if (uri.indexOf('#') > 0) {
        const cleanUri = uri.substring(0, uri.indexOf('#'));
        window.history.replaceState({}, document.title, cleanUri);
    }
}

function readJWT() {
    const linking = localStorage.getItem('application_linking');
    let jwt = '';

    if (linking === 'true') {
        // dropbox returns the user jwt in a url hash after the user authorizes this app
        const hash = window.location.hash;
        const parsed = parseHash(hash);
        jwt = parsed.access_token;
        removeHashFromUrl();
    }

    // if there was no JWT in the url fallback to use the old jwt
    if (isEmpty(jwt)) {
        jwt = localStorage.getItem('__dropbox_jwt__');
    }

    return jwt;
}

export function initJWT() {
    return (dispatch) => {
        const jwt = readJWT();
        localStorage.setItem('application_linking', 'false');

        return validateJWT(jwt)
        .then(() => {
            localStorage.setItem('__dropbox_jwt__', jwt);
            dispatch(saveToken(jwt));
        })
        .catch(() => {
            dispatch(saveToken(''));
        });
    };
}
