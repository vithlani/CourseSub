import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from '../subject/subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';


const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot([
        {path:'subject/add',component : AddSubjectComponent},
        {path:'edit',component:EditSubjectComponent},
        {path:'subjectedit/:id',component:EditSubjectComponent},
        {path :'subbycid/:id',component:ListSubjectComponent}
      ]),
    ],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
