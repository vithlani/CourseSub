import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectserviceService } from '../subjectservice.service';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit {
  courseId : number;
  subjectlist : Subject[];
  constructor(private subjservice : SubjectserviceService ) { }

  ngOnInit() {

    this. GetSubjects()
  }
  GetSubjects(): void {

    this.subjservice.GetSubjects().subscribe(sub =>{
      this.subjectlist = sub;
      console.log(this.subjectlist);
    })
  }

}
