import { Component, OnInit } from '@angular/core';
import { PostService } from "./post.service";
import { Post } from "./post.model";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as postStore from './reducers/post'
import * as postAction from './actions/post'

@Component({
  selector: 'post',
  template: `
    <post-item *ngFor="let post of posts | async" [post]="post"></post-item>
    <button (click)="addNewPost()">Add new</button>
    <router-outlet></router-outlet>
  `
})
export class PostComponent {
    posts: Observable<Post[]>;
    constructor(private store: Store<postStore.State>) {
        this.posts = this.store.select(postStore.getPosts);
        //this.posts = this.store.select('entites')
    }

    addNewPost() {
        let post:Post = {
            //id:2,
            title: "nowy",
            author: "nowy"
        }
        this.store.dispatch(new postAction.AddAction(post))
    }

    
}
