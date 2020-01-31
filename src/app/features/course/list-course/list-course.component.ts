import { Component, OnInit } from '@angular/core';
import { CourseapiService } from "../courseapi.service";
import { Course } from '../course.model';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
  courselist:Course[];
  p: number = 1;
  //search: FormGroup;
  constructor(private courseapiservice : CourseapiService,private router: Router) { }
  searchcourse: FormControl;

  ngOnInit() {
   
      this.GetCourses();
      this.searchcourse = new FormControl('',Validators.minLength(3)); 
        this.searchcourse.valueChanges.subscribe(result=>{
            if(result.length=='3')
          {
                 this.courseapiservice.searchcourse(result).subscribe(res => {
                 this.courselist = res;
            },
            err=>{
                  
            })
          } 
          else
          {
            this.GetCourses();
          }
        },
          err=>{

          });
    
    }
    
  GetCourses(): void{
    this.courseapiservice.GetCourses().subscribe(mi => {
      
      this.courselist = mi;
     console.log(this.courselist); 
    
    }, errorResponse => {
      
    });
  }


  changee(id:number):void{
    this.router.navigate(['/subbycid',id]);
  }
  deleteCourse(id:number):void{
    if (confirm(`Delete Course`)){
      this.courseapiservice.deleteCourse(id).subscribe();
      console.log(`course deleted`)
      this.router.navigate(['/course']);
    }
    else{
      this.router.navigate(['/course/list']);
    }
  }
 /* searchCourse(){
    if(this.search.controls.searchcourse.value!== '')
    {
      this.courseapiservice.searchcourse(this.search.controls.searchcourse.value).subscribe(
        result => {
          this.courselist=result
        },
        err =>{
  
        }
      )
    }
    else
    {
      this.GetCourses();
    }
  
  }*/
  pageChanged(ev : any): void {
    debugger;
  }

}
