import { Component, OnInit } from '@angular/core';
import { PostService, Post } from "app/post/post.service";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as postStore from './reducers/post'
import * as postAction from './actions/post'

@Component({
  selector: 'post',
  template: `
    {{ something | async | json }}
    <div *ngFor="let post of posts | async">{{post | json}}</div>
    <button (click)="addNewPost()">Add new</button>
  `
})
export class PostComponent implements OnInit {
    posts: Observable<Post[]>;
    something: any;
    constructor(private postService: PostService, private store: Store<postStore.State>) {
        //here we are creating hook for our posts
        this.something = this.store.select(postStore.getEntities);
    }

    ngOnInit() {
        this.store.dispatch(new postAction.LoadAction());
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        //this.posts = this.postService.getAll();
    }

    addNewPost() {
        this.postService.addNew({id:2, title: "nowy", author: "nowy"})
    }
}
