



const interactionsReducer = (state = [], action) => {
    switch (action.type){
        case 'SET_INTERACTIONS':
            return action.payload;
        default:
            return state;
    }
}

export default interactionsReducer;