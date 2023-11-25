import { log, reduce } from '../utils.js';

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5]));

log(add(add(add(add(add(0, 1), 2), 3), 4), 5));

log(reduce(add, [1, 2, 3, 4, 5]));
