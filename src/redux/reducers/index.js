import playerReducer from "./playerReducer";
import {combineReducers} from "redux";
import mapIdReducer from "./mapIdReducer";
import enemiesReducer from "./enemiesReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    mapIDs: mapIdReducer,
    enemies: enemiesReducer
})

export default rootReducer;