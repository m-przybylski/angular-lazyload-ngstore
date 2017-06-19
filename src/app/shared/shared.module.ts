import { NotFoundComponent } from './not-found/not-found.component';
import { SharedRoutingModule } from './shared.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

@NgModule({
  imports: [ CommonModule, SharedRoutingModule ],
  declarations: [ NotFoundComponent ],
  exports: [ FormsModule, CommonModule, HttpModule ]
})
export class SharedModule { }
