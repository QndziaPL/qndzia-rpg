import {playerBaseObject} from "../../player/playerBaseObject";

const playerReducer = (state = playerBaseObject, action) => {
    switch (action.type){
        case 'SET_PLAYER':
            return action.payload;
        default:
            return state;
    }
}

export default playerReducer;