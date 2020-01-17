import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CoursesComponent } from './courses.component';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';
import { ListSubjectComponent } from "../subject/list-subject/list-subject.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'course',component : CoursesComponent,children:[
    { path:'add',component: AddCourseComponent},
    {path:'list',component:ListCourseComponent},
    {path:'edit',component:EditCourseComponent},
    {path:'edit/:id',component:EditCourseComponent},
    {path:'list/:id',component:CoursedetailComponent},
    {path :'subject/:id/subbycid',component:ListSubjectComponent}
  ]},
]),
],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
