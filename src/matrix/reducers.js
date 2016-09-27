import { combineReducers } from 'redux';
import { RESET_BOARD, ADD_CUBE } from './actions.js';
const initialState = {
    cells:[], // array of cell objects with array of cube ids
    players:[],
    cubes:[] // cube objects, the also contain a reference to their parent cell
};


export const cubes = (state = [], action) => {

    switch(action.type) {
        case ADD_CUBE:
            return Object.assign({}, state, {
                    cubes: [...state.cubes, action.cube]
                });
        default:
            return state;
    }
};

export const cells = (state={}, action) => {
    switch(action.type) {
        case ADD_CUBE:
            return Object.assign({}, state, {
                cells: state.cells.map((cell, index)=> {
                    if (index === action.cube.cell_index) {
                        return Object.assign({}, cell, {
                            mass: [...cell.mass, action.cube]
                        });
                    }
                    return cell;
                }),
            });
        case RESET_BOARD:
            return Object.assign({}, state, {
                cells: action.cells
            });
        default:
            return state;
    }
};



const rootReducer = combineReducers({
    cells,
});

export default rootReducer;
