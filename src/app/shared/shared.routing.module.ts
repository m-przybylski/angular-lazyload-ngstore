import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

export const routes: Routes = [
    { path: '', component: NotFoundComponent, pathMatch: 'full' } 
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SharedRoutingModule {}