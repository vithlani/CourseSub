import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from '../subject/subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';


const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {path:'subject',component : SubjectsComponent,children:[
        { path:'add',component: AddSubjectComponent},
        {path:'list',component:ListSubjectComponent},
        {path:'edit',component:EditSubjectComponent}
      ]},
    ]),
    ],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
