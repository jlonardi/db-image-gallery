import { remove, each, map } from 'lodash';

const fnQueue = [];
let count = 0;
window.onkeyup = (e) => each(
    // some of the functions might cause an ubind, copying the fns before
    // execution assures them to be called before removing them
    map(fnQueue, ({ fn }) => fn),
    fn => fn(e)
);

export function onkeyup(fn) {
    const id = ++count;
    fnQueue.push({ id, fn });
    return id;
}

export function unbind(eventKey) {
    remove(fnQueue, ({ id }) => id === eventKey);
}
