import { Action } from "@ngrx/store";
import { User } from "../user";

export enum UserActionTypes {
    ToggleMaskUserName = '[User] Toggle Mask User Name'
}

export class ToggleMaskUserName implements Action {
    readonly type = UserActionTypes.ToggleMaskUserName;

    constructor(public payload: boolean) {}
}

export type UserActions = ToggleMaskUserName;
