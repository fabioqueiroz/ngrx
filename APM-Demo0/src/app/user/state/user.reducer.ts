import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
    showUserName: boolean;
}

const initialState: UserState = { 
    showUserName: false 
};

const getUserFeatureState = createFeatureSelector<UserState>('maskUserName');

export const getShowUserName = createSelector(getUserFeatureState, state => state.showUserName);

export function reducer(state = initialState, action) : UserState {
    
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