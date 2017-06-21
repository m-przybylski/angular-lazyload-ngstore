import { Post } from 'app/post/post.model';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PostService } from "./../post.service";

import * as postAction from './../actions/post'

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private postService: PostService) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(postAction.LOAD)
        .startWith(new postAction.LoadAction())
        .map(toPayload)
        .switchMap(() => {
            return this.postService.getAll()
                .map(posts => new postAction.LoadSuccessAction(posts))
                .catch((error) => of(new postAction.LoadFailedAction(error)))
        })

    @Effect()
    delete$: Observable<Action> = this.actions$
        .ofType(postAction.DELETE)
        .map(toPayload)
        .switchMap((post:Post) => {
            return this.postService.delete(post.id)
                .map(post => new postAction.DeleteSuccessAction(post.id))
                .catch((error) => of(new postAction.DeleteFailAction([post])))
        })
    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(postAction.ADD)
        .map(toPayload)
        .switchMap((post:Post) => {
            return this.postService.addNew(post)
                .map(result => new postAction.AddSuccessAction([result]))
                .do(val => console.log(val))
                .catch(error => of(new postAction.AddFailAction(post)))
        })

}