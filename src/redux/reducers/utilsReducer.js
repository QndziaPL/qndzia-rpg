import { playerBaseObject } from "../../player/playerBaseObject";

// const loadData = JSON.parse(localStorage.getItem("player")) ?? playerBaseObject;

//TODO: możliwe, że trza dodać tutaj potem jakiś base object utilsów

const utilsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_UTILS":
      return action.payload;
    default:
      return state;
  }
};

export default utilsReducer;
