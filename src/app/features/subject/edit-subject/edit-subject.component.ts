import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SubjectserviceService } from '../subjectservice.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  subjectForm: FormGroup
  //subject : Subject[];
  pageTitle = 'Edit Subject';
  sub : any;
  errorMessage: any;
  constructor(private router: Router,private fb: FormBuilder,private route : ActivatedRoute,private subservices :SubjectserviceService) { }

  ngOnInit() {
    this.subjectForm = this.fb.group({
      Sname: ['', [Validators.required,Validators.minLength(3)]],
      SCredit: ['', Validators.required],
      Description: ['']
    });

    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.GetSubjectbyid(id);
  }
  GetSubjectbyid(id) : void{
    this.subservices.subjectbyid(id).subscribe(cd => {
      this.sub = cd;
      this.displaySubject(this.sub);
      console.log(this.sub)
    },
    err=>{

    }
    );
  }
  displaySubject(sub: any) {
   if(this.subjectForm){
     this.subjectForm.reset();
   }
   this.sub = sub;
   if (this.sub.subjectId === 0) {
    this.pageTitle = 'Add Course';
  }
  else 
  {
    this.pageTitle = `Edit Course: ${this.sub.sname}`;
    this.subjectForm.patchValue({
      Sname: this.sub.sname,
      SCredit: this.sub.Credit,
      Description: this.sub.description,
    });
  }
  }
  save(): void {
    if (this.subjectForm.valid) {
      if (this.subjectForm.dirty) {
        const s = { ...this.sub, ...this.subjectForm.value };

        if (s.subjectId === 0) {
          this.subservices.createSubject(s)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } 
        else {
          this.subservices.updateSubject(this.sub.subjectId,s)
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
    this.router.navigate(['/subbycid/'+ this.sub.courseDetailId])

  }
}
