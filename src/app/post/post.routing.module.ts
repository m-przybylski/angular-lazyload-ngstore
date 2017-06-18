import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { PostComponent } from "./post.component";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "app/post/effects/post";

export const routes: Routes = [
    { path: '', component: PostComponent }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      EffectsModule.run(PostEffects),
      ],
  exports: [RouterModule]
})
export class PostRoutingModule {}