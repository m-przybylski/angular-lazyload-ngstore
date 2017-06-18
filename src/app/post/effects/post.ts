import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PostService } from "./../post.service";

import * as post from './../actions/post'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private postService: PostService) { }

    @Effect()
    search$: Observable<Action> = this.actions$
        .ofType(post.LOAD)
        .map(toPayload)
        .switchMap(val => {
            return this.postService.getAll()
                .map(posts => new post.LoadSuccessAction(posts))
                .catch((error) => of(new post.LoadFailedAction(error)))
        })

}