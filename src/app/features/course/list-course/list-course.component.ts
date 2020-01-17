import { Component, OnInit } from '@angular/core';
import { CourseapiService } from "../courseapi.service";
import { Course } from '../course.model';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
  courselist:Course[];
  constructor(private courseapiservice : CourseapiService) { }
   
  ngOnInit() {
   
      this.GetCourses();
    }
    
  GetCourses(): void{
    this.courseapiservice.GetCourses().subscribe(mi => {
      this.courselist = mi;
      console.log(this.courselist); 
    
    });
  }


}
