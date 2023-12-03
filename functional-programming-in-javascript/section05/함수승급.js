import { Maybe } from './Maybe';

export const lift = R.curry((f, value) => Maybe.fromNullable(value).map(f));
