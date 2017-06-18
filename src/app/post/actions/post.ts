import { Action } from '@ngrx/store';
import { Post } from './../post.service';

export const LOAD           = "[Post] Load";
export const LOAD_SUCCESS   = "[Post] Load Success";
export const LOAD_FAIL      = "[Post] Load Fail";

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

export type Actions = LoadAction | LoadSuccessAction | LoadFailedAction;