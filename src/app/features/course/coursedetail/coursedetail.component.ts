import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../course.model';
import {ListCourseComponent} from '../list-course/list-course.component';
import { CourseapiService } from '../courseapi.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  pageTitle: string = 'Course Detail';
  courseDetail: Course;
  constructor(private route : ActivatedRoute,private courseapiservice : CourseapiService , private router : Router) { }

 
  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.GetCoursesbyId(id);
  }
  
  GetCoursesbyId(id) : void{
    this.courseapiservice.GetCoursesbyId(id).subscribe(cd => {
      this.courseDetail = cd;
      console.log(this.courseDetail.subjects);
    });
  }
  Back() : void{
    this.router.navigate(['/list']);
  }
}
