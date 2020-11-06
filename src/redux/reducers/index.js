import playerReducer from "./playerReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    player: playerReducer,
})

export default rootReducer;