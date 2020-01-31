import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from '../subject.model';
import { SubjectserviceService } from '../subjectservice.service';
import { Course } from '../../course/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subjectForm : FormGroup;
   subject = new Subject;
  errorMessage: string;
  courselist: Course[];
  course = new Course;

   constructor(private fb : FormBuilder , private subservice : SubjectserviceService,private router: Router) { }

  ngOnInit() {
    this.GetCourses();
    this.subjectForm = this.fb. group({
      Sname : ['',Validators.required],
      SCredit : ['',Validators.required],
      Description:[''],
      CourseDetailId : ['',Validators.required]
    })
  }
  GetCourses(): void{
    //debugger;
    this.subservice.GetCourses().subscribe(mi => {
      this.courselist = mi;
      console.log(this.courselist); 
    
    });
  }
  save(){
    if(this.subjectForm.valid){
      this.subservice.createSubject(this.subjectForm.value)
      .subscribe( result =>{
        this.router.navigate(['/course/list']);
      },
      err=>{

      }
      )
   
    }
    else
    {
      this.errorMessage = 'Please Correct the Validation errors'
    }
  }

}
