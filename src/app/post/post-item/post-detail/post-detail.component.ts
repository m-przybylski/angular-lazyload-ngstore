import { Post } from 'app/post/post.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as postStore from './../../reducers/post'


@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post>;
  constructor(private store: Store<postStore.State>) { 
    this.post$ = this.store.select(postStore.getSelectedPost);
  }

  ngOnInit() {
  }

}
