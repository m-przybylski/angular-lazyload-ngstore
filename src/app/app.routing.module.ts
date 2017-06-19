import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { DummyComponent } from "app/dummy/dummy.component";

export const routes: Routes = [
    { path: '', component: DummyComponent, pathMatch: 'full' },
    { path: 'posts', loadChildren: 'app/post/post.module#PostModule' },
    { path: '404', loadChildren: 'app/shared/shared.module#SharedModule' },
    { path: '**', redirectTo: '404' },
];

@NgModule({

  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}