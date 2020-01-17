import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectRoutingModule } from "./subject.route";
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SubjectsComponent } from './subjects.component';



@NgModule({
  declarations: [EditSubjectComponent, ListSubjectComponent, AddSubjectComponent,SubjectsComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
  ]
})
export class SubjectModule { }
