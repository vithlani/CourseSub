import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ValidatorFn,AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Course } from '../course.model';
import { Subscription } from 'rxjs';
import { CourseapiService } from '../courseapi.service';


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
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  pageTitle = 'Edit Course';
  errorMessage : string;
  courseForm: FormGroup
  course : Course;
  courseDetail: Course;

  get subjects(): FormArray{
    return<FormArray>this.courseForm.get('subjects');
  }


  constructor(private route : ActivatedRoute,private courseapiservice :CourseapiService, private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      duration: ['', Validators.required],
      fees: ['', Validators.required],
      description: [''],
      subjects:this.fb.array([])
    });

    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.GetCoursesbyId(id);
  }
  GetCoursesbyId(id) : void{
    this.courseapiservice.GetCoursesbyId(id).subscribe(cd => {
      this.courseDetail = cd;
      this.displayCourse(this.courseDetail);
      console.log(this.courseDetail)
    });
  }
  displayCourse(courseDetail: Course) {
    if (this.courseForm) {
      this.courseForm.reset();
    }
    this.courseDetail = courseDetail;

    if (this.courseDetail.courseDetailId === 0) {
      this.pageTitle = 'Add Course';
    }
    else 
    {
      this.pageTitle = `Edit Course: ${this.courseDetail.name}`;
  }
 

  this.courseForm.patchValue({
    name: this.courseDetail.name,
    duration: this.courseDetail.duration,
    fees: this.courseDetail.fees,
    description: this.courseDetail.description
  });
  
  this.courseDetail.subjects.forEach(subject => {
    ( this.courseForm.controls.subjects as FormArray).push(
      this.fb.group({
        sname:[subject.sname,[Validators.required,Validators.minLength(3)]],
        sCredit:[subject.sCredit,[Validators.required]],
        subjectId: [subject.subjectId]
      })
    )
  });
  // this.courseForm.setControl('subjects', this.fb.array(this.courseDetail.subjects || []));
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
      subjectName:['',[Validators.required,Validators.minLength(3)]],
      subjectCredit:['',[Validators.required,notvalidCredit(1,10)]]
    })
  }

  
  save(): void {
    if (this.courseForm.valid) {
      if (this.courseForm.dirty) {
        const c = { ...this.courseDetail, ...this.courseForm.value };

        if (c.courseDetailId === 0) {
          this.courseapiservice.createCourse(c)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } 
        else {
          this.courseapiservice.UpdateCourse(this.courseDetail.courseDetailId,c)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } 
      else {
        this.onSaveComplete();
      }
    }
     else {
      this.errorMessage = 'Please correct the validation errors.';
    }

  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate(['/course']);
  }
}
