import { playerBaseObject } from "../../player/playerBaseObject";

const loadData = JSON.parse(localStorage.getItem("player")) ?? playerBaseObject;

const playerReducer = (state = loadData, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return action.payload;
    default:
      return state;
  }
};

export default playerReducer;
