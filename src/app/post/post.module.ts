import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from "./post.service";
import { PostComponent } from "./post.component";
import { HttpModule } from "@angular/http";
import { StoreModule } from "@ngrx/store";

import * as post from './reducers/post'
import { PostRoutingModule } from "./post.routing.module";
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  declarations: [ PostComponent, PostItemComponent ],
  imports: [ 
    CommonModule,
    PostRoutingModule,
    HttpModule,
    StoreModule.provideStore(post.reduce)
    ],
  providers: [ PostService ]
})
export class PostModule { }
