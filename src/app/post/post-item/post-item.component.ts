import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { Post } from './../post.model';

import * as postActions from './../actions/post'
import * as postStore from './../reducers/post'

@Component({
  selector: 'post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {

  @Input()post: Post;

  constructor(private store: Store<postStore.State>) { }

  deletePost(post:Post):void{
    let action:postActions.Actions = new postActions.DeleteAction(post);
    this.store.dispatch(action);
  }
}
