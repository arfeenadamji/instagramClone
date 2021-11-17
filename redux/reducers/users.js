import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants"

const initialState = {
    users: [],
    usersLoaded: 0
}

export default users = (state = initialState, action) => {
    console.log('state.usersLoaded', state.usersLoaded)
    console.log('action action', action)
    switch (action.type) {
        case USERS_DATA_STATE_CHANGE:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case USERS_POSTS_STATE_CHANGE:
            return {
                ...state,
                usersLoaded: state.users.length,
                users:
                    state.users.map(user => user.uid === action.uid ?
                        { ...user, posts: action.posts } :
                        user)
            }
        case CLEAR_DATA:
            return {
                //    initialState 
                users: [],
                usersLoaded: 0
            }
        default:
            return state
    }

}
