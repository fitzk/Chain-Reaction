import {Record} from 'immutable';

export const Cell = new Record({
    index: undefined,
    type: undefined,
    critical_mass: undefined,
    current_mass: undefined,
});

export const Cube = new Record({
    index: undefined,
    color: undefined,
    cell_index: undefined,
});