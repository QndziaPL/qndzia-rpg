import playerReducer from "./playerReducer";
import { combineReducers } from "redux";
import mapIdReducer from "./mapIdReducer";
import enemiesReducer from "./enemiesReducer";
import interactionsReducer from "./interactionsReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  mapIDs: mapIdReducer,
  enemies: enemiesReducer,
  interactions: interactionsReducer,
});

export default rootReducer;
