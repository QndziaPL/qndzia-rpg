const loadData = JSON.parse(localStorage.getItem("gameOn")) ?? false;

const gameOnReducer = (state = loadData, action) => {
  switch (action.type) {
    case "SET_GAME_ON":
      return action.payload;
    default:
      return state;
  }
};

export default gameOnReducer;
