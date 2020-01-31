import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CourseapiService } from '../courseapi.service';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl,FormArray } from "@angular/forms";
import { Router } from '@angular/router';

function duration(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  };
}

function notvalidCredit(min: number, max: number): ValidatorFn {
  return (d: AbstractControl): { [key: string]: boolean } | null => {
    if (d.value !== null && (isNaN(d.value) || d.value < min || d.value > max)) {
      return { 'notValidCredit': true }
    }
    return null;
  };
}   


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  course = new Course;
  errorMessage: string;

  
  get subjects(): FormArray{
    return<FormArray>this.courseForm.get('subjects');
  }


  constructor(private fb: FormBuilder,private courseapiservice :CourseapiService , private router : Router) { }

  
  ngOnInit() {

    this.courseForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      duration: ['', Validators.required],
      fees: ['', Validators.required],
      description: [''],
      subjects:this.fb.array([])
    });
  }
  addSubjects():void{
    this.subjects.push(this.buildSubjects());
  }
  removeSubjects(i: number) {
    // remove address from the list
    const control = <FormArray>this.courseForm.controls['subjects'];
    control.removeAt(i);
  }

  buildSubjects(): FormGroup{
    return this.fb.group({
      sname:['',[Validators.required,Validators.minLength(3)]],
      sCredit:['',Validators.required]
    })
  }
  save() {
  /*   console.log(this.courseForm)
    console.log('Saved: ' ,this.courseForm.value); */
    if (this.courseForm.valid) {
      this.courseapiservice.createCourse(this.courseForm.value).subscribe(
        result => {
          this.router.navigate(['/course/list']);
        },
        err=>{

        }
      )
 
    }
    else
    {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
