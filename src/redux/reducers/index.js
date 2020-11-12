import playerReducer from "./playerReducer";
import { combineReducers } from "redux";
import mapIdReducer from "./mapIdReducer";
import enemiesReducer from "./enemiesReducer";
import interactionsReducer from "./interactionsReducer";
import currentEnemyReducer from "./currentEnemyReducer";
import gameOnReducer from "./gameOnReducer";
import utilsReducer from "./utilsReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  mapIDs: mapIdReducer,
  enemies: enemiesReducer,
  interactions: interactionsReducer,
  currentEnemy: currentEnemyReducer,
  gameOn: gameOnReducer,
  utils: utilsReducer,
});

export default rootReducer;
