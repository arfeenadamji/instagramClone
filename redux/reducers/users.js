import { USERS_DATA_STATE_CHANGE,USERS_POSTS_STATE_CHANGE } from "../constants"

const initialState={
    users:[],
    userLoaded:0
}

export default users = (state = initialState, action)=>{
   
   switch(action.type)
   {
       case USERS_DATA_STATE_CHANGE:
        return {
            ...state,
            currentUser: [...state.users, action.currentUser]
        }
        case USERS_POSTS_STATE_CHANGE:
        return {
            ...state,
            posts: action.posts
        }
        default:
            return state
   }
    
}