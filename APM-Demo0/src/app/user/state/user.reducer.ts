import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.actions";

export interface UserState {
    showUserName: boolean;
}

const initialState: UserState = { 
    showUserName: false 
};

const getUserFeatureState = createFeatureSelector<UserState>('maskUserName');

export const getShowUserName = createSelector(getUserFeatureState, state => state.showUserName);

export function reducer(state = initialState, action: UserActions) : UserState {
    
    switch(action.type) {
        case UserActionTypes.ToggleMaskUserName:
            return {
                ...state,
                showUserName: action.payload
            }
        default:
            return state;
    }
};