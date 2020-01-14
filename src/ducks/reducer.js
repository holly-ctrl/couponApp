const initialState = {
    user: {}
}

const SET_USER = 'SET_USER'

export function setUser(obj) {
    return {
        type: SET_USER,
        payload: obj
    }
} 

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case SET_USER:
            return {...state, user: payload}
        default: return state
    }
}