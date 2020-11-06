

const loadData = JSON.parse(localStorage.getItem('mapIDs')) ?? {}

const mapIdReducer = (state = loadData, action) => {
    switch (action.type){
        case 'SET_MAP_WITH_IDS':
            return action.payload;
        default:
            return state;
    }
}

export default mapIdReducer;