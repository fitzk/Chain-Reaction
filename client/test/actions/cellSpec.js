import {addCubeToCell, generateBoard, addCube} from '../../src/client/matrix/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);

describe('Cell Actions',()=> {

  it('should dispatch an action', () => {
    const initialState = {
      cells: [
        {critical_mass: 2, mass: []},
        {critical_mass: 3, mass: []},
        {critical_mass: 3, mass: []},
        {critical_mass: 2, mass: []},
      ]};
    const store = mockStore(initialState);
    let addPinkCube = {
      type: 'ADD_CELL',
      cube: {
        index: 0,
        cell_index: 0,
        color: 'pink',
      }};
    store.dispatch(addPinkCube);
    const actions = store.getActions();
    expect(actions).toEqual([addPinkCube]);
  });
});

