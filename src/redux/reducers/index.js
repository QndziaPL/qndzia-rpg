import playerReducer from "./playerReducer";
import {combineReducers} from "redux";
import mapIdReducer from "./mapIdReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    mapIDs: mapIdReducer,
})

export default rootReducer;