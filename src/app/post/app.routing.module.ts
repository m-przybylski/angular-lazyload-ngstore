import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { DummyComponent } from "app/dummy/dummy.component";

export const routes: Routes = [
    { path: '', component: DummyComponent },
    { path: 'posts', loadChildren: 'app/post/post.module#PostModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}