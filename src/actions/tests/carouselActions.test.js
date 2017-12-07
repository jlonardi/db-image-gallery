import assert from 'assert';
import { times } from 'lodash';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    currentImageIndex,
    previousImageIndex,
    nextImageIndex,
    buildBuffer,
    openImage,
    OPEN_CAROUSEL,
    DISPLAY_IMAGE
} from '../carouselActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Carousel', () => {
    let images;
    beforeEach(() => {
        images = times(20, idx => ({ id: idx.toString() }));
    });
    describe('helper function', () => {
        describe('currentImageIndex', () => {
            it('should return the correct index', () => {
                const result = currentImageIndex('2', images);

                assert.equal(result, 2);
            });

            it('should return -1 if there is no images', () => {
                const result = currentImageIndex('42', []);

                assert.equal(result, -1);
            });
        });

        describe('previousImageIndex', () => {
            it('should return the index of the previous image', () => {
                const result = previousImageIndex('2', images);
                assert.equal(result, 1);
            });

            it('should return the index of the last image if the current image is the first one', () => {
                const result = previousImageIndex('1', images);
                assert.equal(result, 0);
            });
        });

        describe('nextImageIndex', () => {
            it('should return the index of the next image', () => {
                const result = nextImageIndex('2', images);
                assert.equal(result, 3);
            });

            it('should return the index of the first image if the current image is the last one', () => {
                const result = nextImageIndex(images[images.length - 1].id, images);
                assert.equal(result, 0);
            });
        });
    });

    describe('buffer', () => {
        describe('building', () => {
            it('should return the 10 adjacent image ids in an array', () => {
                const result = buildBuffer('10', images);

                const expected = ['5', '6', '7', '8', '9', '11', '12', '13', '14', '15'];

                assert.deepEqual(result.sort(), expected.sort());
            });

            it('should return all images if there are less images than the buffer could hold', () => {
                const result = buildBuffer('1', [{ id: '0' }, { id: '1' }, { id: '2' }]);

                const expected = ['0', '1', '2'];

                assert.deepEqual(result.sort(), expected.sort());
            });
        });
    });

    describe('action', () => {
        describe('openImage', () => {
            it('should do nothing if there is no image with the given id', () => {
                const store = mockStore({
                    gallery: {
                        images: [{ id: '1' }, { id: '2' }]
                    },
                    carousel: {}
                });

                store.dispatch(openImage('42'));

                assert.deepEqual(store.getActions(), []);
            });

            it('should dispatch the carousel open action if the carousel is closed', () => {
                const store = mockStore({
                    gallery: {
                        images: [{ id: '42', loaded: true }]
                    },
                    carousel: {}
                });

                store.dispatch(openImage('42'));

                const expectedActions = [
                    { type: OPEN_CAROUSEL },
                    { type: DISPLAY_IMAGE, id: '42' }
                ];

                assert.deepEqual(store.getActions(), expectedActions);
            });

            it('should not dispatch the carousel open action if the carousel is open', () => {
                const store = mockStore({
                    gallery: {
                        images: [{ id: '42', loaded: true }]
                    },
                    carousel: {
                        open: true
                    }
                });

                store.dispatch(openImage('42'));

                const expectedActions = [
                    { type: DISPLAY_IMAGE, id: '42' }
                ];

                assert.deepEqual(store.getActions(), expectedActions);
            });
        });
    });
});
