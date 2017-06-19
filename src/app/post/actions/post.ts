import { Action } from '@ngrx/store';
import { Post } from './../post.model';

export const LOAD           = "[Post] Load";
export const LOAD_SUCCESS   = "[Post] Load Success";
export const LOAD_FAIL      = "[Post] Load Fail";

export const DELETE         = "[Post] Delete"
export const DELETE_SUCCESS = "[Post] Delete Success"
export const DELETE_FAIL    = "[Post] Delete Fail"

export const ADD            = "[Post] Add"
export const ADD_SUCCESS    = "[Post] Add Success"
export const ADD_FAIL       = "[Post] Add Fail"

export const SELECT_POST    = "[Post] Select"

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor() {}
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Post[]) {}
}

export class LoadFailedAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: any) {}
}

export class DeleteAction implements Action {
    readonly type = DELETE;

    constructor(public payload: Post) {}
}

export class DeleteSuccessAction implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload: number) {}
}

export class DeleteFailAction implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: Post[]) {}
}

export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: Post) {}
}

export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: Post[]) {}
}

export class AddFailAction implements Action {
    readonly type = ADD_FAIL;

    constructor(public payload: Post) {}
}

export class SelectPostAction implements Action {
    readonly type = SELECT_POST;

    constructor(public payload: number) {}
}

export type Actions 
    = LoadAction 
    | LoadSuccessAction 
    | LoadFailedAction
    | DeleteAction
    | DeleteSuccessAction
    | DeleteFailAction
    | AddAction
    | AddSuccessAction
    | AddFailAction
    | SelectPostAction