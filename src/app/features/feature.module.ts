import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseModule } from "./course/course.module";
import { SubjectModule } from "./subject/subject.module";
//import { SubjectsComponent } from "./subject/subjects.component";
import { WelcomeComponent } from './welcome/welcome.component';
//import { CoursesComponent } from "./course/courses.component";



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    CourseModule,
    SubjectModule
  ]
})
export class FeatureModule { }
