import { PostExistsGuard } from './guards/post-exists';
import { PostDetailComponent } from './post-item/post-detail/post-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { PostComponent } from "./post.component";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "app/post/effects/post";

export const routes: Routes = [
    { path: '', component: PostComponent,
    children: [
        { path: ':id',    component: PostDetailComponent, canActivate: [ PostExistsGuard ], },
    ]},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ PostExistsGuard ]
})
export class PostRoutingModule {}