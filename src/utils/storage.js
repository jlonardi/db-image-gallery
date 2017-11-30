export function readJwt() {
    return localStorage.getItem('__dropbox_jwt__');
}

export function writeJwt(jwt) {
    return localStorage.setItem('__dropbox_jwt__', jwt);
}

export function clearJwt() {
    return writeJwt('');
}
