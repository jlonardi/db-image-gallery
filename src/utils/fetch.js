export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}

export function parseBlob(response) {
    return response.blob();
}

export function createURL(blob) {
    if (!blob) {
        return Promise.reject();
    }
    return Promise.resolve(URL.createObjectURL(blob));
}

export function load(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function loadBlob(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseBlob)
        .then(createURL)
        .catch(error => {
            console.log(error);
        });
}
