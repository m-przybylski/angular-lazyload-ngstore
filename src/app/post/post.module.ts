import { PostEffects } from 'app/post/effects/post';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";

import { SharedModule } from '../shared/shared.module';


import { PostService } from "./post.service";
import { PostComponent } from "./post.component";

import * as post from './reducers/post'

import { PostRoutingModule } from "./post.routing.module";
import { PostItemComponent } from './post-item/post-item.component';
import { PostDetailComponent } from './post-item/post-detail/post-detail.component';

@NgModule({
  declarations: [ PostComponent, PostItemComponent, PostDetailComponent ],
  imports: [ 
    PostRoutingModule,
    SharedModule,
    StoreModule.provideStore(post.reduce),
    EffectsModule.run(PostEffects),
    ],
  providers: [ PostService ]
})
export class PostModule { }
