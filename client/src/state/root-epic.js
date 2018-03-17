import { combineEpics } from 'redux-observable';
import 'src/state/rxjs-imports';

import addCubeEpic from 'src/state/matrix/epics/add-cube';
import checkCellCriticalMassEpic from 'src/state/matrix/epics/check-cell-critical-mass';
import createMatrixEpic from 'src/state/matrix/epics/create-matrix';
import expoldeCellEpic from 'src/state/matrix/epics/explode-cell';
import resetEpic from 'src/state/matrix/epics/reset';
import takeOverCellEpic from 'src/state/matrix/epics/take-over-cell';
import validateClickEpic from 'src/state/matrix/epics/validate-click';
import updateCubeCountEpic from 'src/state/matrix/epics/update-cube-count';

import switchPlayersEpic from 'src/state/players/epics/switch-players';
import botTurnEpic from 'src/state/players/epics/bot-turn';

export const rootEpic = combineEpics(
  addCubeEpic,
  botTurnEpic,
  checkCellCriticalMassEpic,
  createMatrixEpic,
  expoldeCellEpic,
  resetEpic,
  switchPlayersEpic,
  takeOverCellEpic,
  validateClickEpic,
  updateCubeCountEpic
);
