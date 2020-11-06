export const setPlayer = (playerObject) => {
    return{
        type: 'SET_PLAYER',
        payload: playerObject
    }
}

export const setMapWithIDs = (map) => {
    return{
        type: 'SET_MAP_WITH_IDS',
        payload: map
    }
}