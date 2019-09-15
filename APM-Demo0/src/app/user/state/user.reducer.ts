export interface UserState {
    showUserName: boolean;
}

export function reducer(state:UserState, action) : UserState {
    
    switch(action.type) {
        case 'MASK_USER_NAME':
            return {
                ...state,
                showUserName: action.payload
            }
        default:
            return state;
    }
};