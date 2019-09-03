export interface UserState {
    showUserName: boolean;
}

export function reducer(state, action) {
    switch(state) {
        case 'MASK_USER_NAME':
            return {
                ...state,
                showUserName: action.payload
            }
    }
};