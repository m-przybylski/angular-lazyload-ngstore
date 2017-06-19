import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as post from './../reducers/post';
import * as postActions from './../actions/post';
import { PostService } from 'app/post/post.service';


@Injectable()
export class PostExistsGuard implements CanActivate {    
    constructor(
        private store: Store<post.State>,
        private postService: PostService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{

        return this.waitForCollectionToLoad()
            .switchMap(() => this.hasPost(route.params['id']))
    }

    waitForCollectionToLoad(): Observable<boolean> {
        return this.store.select(post.getLoaded)
            .filter(loaded => loaded)
            .take(1);
    }

    hasPost(id:number): Observable<boolean>{
        return this.hasPostInStore(id)
            .switchMap(inStore => {
                if(inStore) {
                    this.store.dispatch(new postActions.SelectPostAction(id));
                    return of(inStore)
                }
                
                return this.hasPostInAPI(id);
            })
    }

    hasPostInStore(id:number): Observable<boolean>{
        return this.store.select(post.getEntities)
            .map(entity => !!entity[id])
            .take(1)
    }

    hasPostInAPI(id:number): Observable<boolean> {
        return this.postService.get(id)
            .map(post => new postActions.LoadSuccessAction([post]))
            .do((action : postActions.LoadSuccessAction) =>  this.store.dispatch(action))
            .do(() =>  this.store.dispatch(new postActions.SelectPostAction(id)))
            .map(post => !!post)
            .catch(() => {
                this.router.navigate(['/posts'])
                return of(false)
            })
    }

}