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
  `
})
export class PostComponent implements OnInit {
    posts: Observable<Post[]>;
    constructor(private postService: PostService, private store: Store<postStore.State>) {
        this.posts = this.store.select(postStore.getPosts);
    }

    ngOnInit() {
        this.store.dispatch(new postAction.LoadAction());
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
