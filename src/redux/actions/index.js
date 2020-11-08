export const setPlayer = (playerObject) => {
  return {
    type: "SET_PLAYER",
    payload: playerObject,
  };
};

export const setMapWithIDs = (map) => {
  return {
    type: "SET_MAP_WITH_IDS",
    payload: map,
  };
};

export const setEnemies = (enemies) => {
  return {
    type: "SET_ENEMIES",
    payload: enemies,
  };
};

export const setInteractions = (interactions) => {
  return {
    type: "SET_INTERACTIONS",
    payload: interactions,
  };
};
