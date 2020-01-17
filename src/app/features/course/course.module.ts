import { NgModule, Component } from '@angular/core';
import { CourseRoutingModule } from "./course.route";
import { AddCourseComponent } from './add-course/add-course.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CoursesComponent } from './courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';

@NgModule({
  declarations: [AddCourseComponent, ListCourseComponent, EditCourseComponent, CoursesComponent, CoursedetailComponent],
  imports: [
    ReactiveFormsModule,
    CourseRoutingModule,
    RouterModule,
    BrowserModule,
    HttpClientModule
  ]
})

export class CourseModule { }
