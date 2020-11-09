const currentEnemyReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_ENEMY":
      return action.payload;
    default:
      return state;
  }
};

export default currentEnemyReducer;
