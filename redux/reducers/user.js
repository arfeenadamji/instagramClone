const initialState={
    currentUser:null
}

export default user = (state = initialState, action)=>{
    return {
        ...state,
        currentUser: action.currentUser
    }
}