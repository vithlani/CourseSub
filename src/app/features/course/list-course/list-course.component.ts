import { Component, OnInit } from '@angular/core';
import { CourseapiService } from "../courseapi.service";
import { Course } from '../course.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
  courselist:Course[];
  constructor(private courseapiservice : CourseapiService,private router: Router) { }
   
  ngOnInit() {
   
      this.GetCourses();
    }
    
  GetCourses(): void{
    this.courseapiservice.GetCourses().subscribe(mi => {
      this.courselist = mi;
      console.log(this.courselist); 
    
    });
  }
  changee(id:number):void{
    this.router.navigate(['subject/subject',id]);
  }


}
