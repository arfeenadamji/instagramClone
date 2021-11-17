import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE,CLEAR_DATA } from "../constants"

const initialState = {
    users: [],
    fee:[],
    usersFollowingLoaded: 0
}

export default users = (state = initialState, action) => {
    console.log('state.usersFollowingLoaded', state.usersFollowingLoaded)
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
                // usersFollowingLoaded: state.usersFollowingLoaded + 1,
                usersFollowingLoaded: state.users.length,
               feed:[...state.feed, ...action.posts]
            }
        case USERS_LIKES_STATE_CHANGE:
            return {
                ...state,
                // usersFollowingLoaded: state.usersFollowingLoaded + 1,
                usersFollowingLoaded: state.users.length,
               feed: state.feed.map(post =>post.id == action.postId) ?
                {...post, currentUserLike:action.currentUserLike}: post
            }
            case CLEAR_DATA:
                return {
                    users: [],
                    usersFollowingLoaded: 0
                }
        default:
            return state
    }

}
