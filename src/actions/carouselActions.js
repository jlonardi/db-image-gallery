import { indexOf, map, find, uniq, each } from 'lodash';
import { loadImage } from './imageActions';

export const DISPLAY_IMAGE = 'DISPLAY_IMAGE';
export function displayImage(id) {
    return {
        type: DISPLAY_IMAGE,
        id
    };
}

function currentImageIndex(currentId, images) {
    return indexOf(
        map(images, img => img.id),
        currentId
    );
}

function previusImageIndex(currentId, images) {
    const currentIdx = currentImageIndex(currentId, images);
    const firstImage = currentIdx === 0;
    const previousIdx = firstImage ? images.length - 1 : currentIdx - 1;
    return previousIdx;
}

function nextImageIndex(currentId, images) {
    const currentIdx = currentImageIndex(currentId, images);
    const lastImage = currentIdx === images.length - 1;
    const next = lastImage ? 0 : currentIdx + 1;

    return next;
}

export const CLOSE_CAROUSEL = 'CLOSE_CAROUSEL';
export function closeCarousel() {
    return {
        type: CLOSE_CAROUSEL
    };
}

function bufferForward(currentId, images, size) {
    const buffer = [];
    let current = images[currentImageIndex(currentId, images)];

    // buffers 5 images forward
    for (let i = 0; i < size; i++) {
        const nextIdx = nextImageIndex(current.id, images);
        current = images[nextIdx];
        buffer.push(current.id);
    }

    return buffer;
}

function bufferBackwards(currentId, images, size) {
    const buffer = [];
    let current = images[currentImageIndex(currentId, images)];

    // buffers 5 images backwards
    for (let i = 0; i < size; i++) {
        const prevIdx = previusImageIndex(current.id, images);
        current = images[prevIdx];
        buffer.push(current.id);
    }

    return buffer;
}

function buildBuffer(id, images) {
    const buffer = [
        ...bufferForward(id, images, 5),
        ...bufferBackwards(id, images, 5)
    ];
    return uniq(buffer);
}

export function bufferImages(id) {
    return (dispatch, getState) => {
        const { gallery } = getState();
        const { images } = gallery;
        const bufferIds = buildBuffer(id, images);

        each(bufferIds, imgId => {
            const image = images[currentImageIndex(imgId, images)];
            if (!image.loaded && !image.loading) {
                dispatch(loadImage(imgId));
            }
        });
    };
}

export const OPEN_CAROUSEL = 'OPEN_CAROUSEL';
export function openImage(id) {
    return (dispatch, getState) => {
        const { carousel } = getState();
        const { open } = carousel;

        if (!open) {
            dispatch({
                type: OPEN_CAROUSEL
            });
        }

        dispatch(displayImage(id));

        const image = find(getState().gallery.images, img => img.id === id);
        if (!image.loaded && !image.loading) {
            dispatch(loadImage(id));
        }

        dispatch(bufferImages(id));
    };
}

export function previousImage(current) {
    return (dispatch, getState) => {
        const { images } = getState().gallery;

        const previousIdx = previusImageIndex(current, images);

        dispatch(openImage(images[previousIdx].id));
    };
}

export function nextImage(currentId) {
    return (dispatch, getState) => {
        const { images } = getState().gallery;

        const next = nextImageIndex(currentId, images);

        dispatch(openImage(images[next].id));
    };
}
