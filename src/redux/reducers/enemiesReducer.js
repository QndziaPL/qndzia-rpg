const loadData = JSON.parse(localStorage.getItem("enemies")) ?? {};

const enemiesReducer = (state = loadData, action) => {
  switch (action.type) {
    case "SET_ENEMIES":
      return action.payload;
    default:
      return state;
  }
};

export default enemiesReducer;
